export async function onRequest(context) {
  const { request, next, env } = context;
  const url = new URL(request.url);

  // Only intercept HTML page requests, skip static assets, API endpoints,
  // and the operator-facing dashboard (we don't want tracking cookies set
  // when an admin checks metrics).
  const isPageRequest = !url.pathname.match(
    /\.(js|css|png|jpg|jpeg|gif|svg|ico|woff2?|ttf|eot|map|json|webp|avif|mp4|webm|pdf|xml|txt|robots)$/i
  ) && !url.pathname.startsWith('/tracker')
    && !url.pathname.startsWith('/analytics')
    && !url.pathname.startsWith('/scripts/')
    && !url.pathname.startsWith('/webhook/')
    && !url.pathname.startsWith('/checkout-session')
    && !url.pathname.startsWith('/api/')
    && !url.pathname.startsWith('/dash');

  if (!isPageRequest) {
    return next();
  }

  // --- Extract tracking parameters from URL ---
  // CRITICAL: Use raw query string extraction, NOT url.searchParams.get().
  // searchParams.get() URL-decodes the value, but Meta expects the exact
  // raw fbclid as it appears in the URL.
  const fbclid = getRawParam(url.search, 'fbclid');
  const gclid = getRawParam(url.search, 'gclid');
  const msclkid = getRawParam(url.search, 'msclkid');

  // --- Extract UTM parameters ---
  const utmSource = url.searchParams.get('utm_source') || '';
  const utmMedium = url.searchParams.get('utm_medium') || '';
  const utmCampaign = url.searchParams.get('utm_campaign') || '';
  const utmContent = url.searchParams.get('utm_content') || '';
  const utmTerm = url.searchParams.get('utm_term') || '';

  // Brevo email-click identity recovery — see "Hop 7" in docs/data-flow.md.
  // Brevo templates append ?leadid={{ contact.EXTERNAL_ID }} to every link
  // (stamped by functions/outputs/brevo.js on the Lead event). When a lead
  // clicks that link on a device/app with no _krob_eid cookie, this param
  // lets us recover their identity instead of treating them as a new lead.
  const leadId = url.searchParams.get('leadid') || '';

  // --- Read existing cookies ---
  const cookies = parseCookies(request.headers.get('Cookie') || '');
  let sessionId = cookies['_krob_sid'] || '';
  let externalId = cookies['_krob_eid'] || '';
  let existingFbc = cookies['_fbc'] || '';
  let existingFbp = cookies['_fbp'] || '';
  const liFatId = cookies['li_fat_id'] || '';

  // --- Generate identifiers if missing ---
  const isNewSession = !sessionId;
  if (!sessionId) sessionId = crypto.randomUUID();

  // Before minting a fresh external_id, try to recover one via ?leadid=
  // (only relevant when there's no _krob_eid cookie at all — a returning
  // visitor on the same device already carries their real external_id).
  if (!externalId && leadId && env.DB) {
    try {
      const recovered = await env.DB.prepare(
        'SELECT external_id FROM sessions WHERE external_id = ? LIMIT 1'
      ).bind(leadId).first();
      if (recovered?.external_id) externalId = recovered.external_id;
    } catch (e) {
      console.error('Middleware leadid recovery error:', e.message);
    }
  }
  if (!externalId) externalId = crypto.randomUUID();

  // --- Compute sub_domain_index per Meta SDK spec ---
  // Index = number of labels in the ETLD+1 minus 1.
  //   example.com     → 2 → index 1
  //   example.com.br  → 3 → index 2  (country-code second-level domain)
  // Computed from the Host header so the same code works for every recipient
  // without configuration. Falls back to 1 if the host can't be parsed.
  const SUB_DOMAIN_INDEX = computeSubDomainIndex(request.headers.get('host') || '');

  // --- Build _fbc from fbclid ---
  let fbc = existingFbc;
  if (fbclid) {
    const existingPayload = existingFbc ? extractFbcPayload(existingFbc) : '';
    if (!existingFbc || existingPayload !== fbclid) {
      fbc = `fb.${SUB_DOMAIN_INDEX}.${Date.now()}.${fbclid}`;
    }
  }

  // --- Generate _fbp if missing ---
  let fbp = existingFbp;
  if (!fbp) {
    fbp = `fb.${SUB_DOMAIN_INDEX}.${Date.now()}.${Math.floor(Math.random() * 9000000000) + 1000000000}`;
  }

  // --- Capture request metadata ---
  const clientIp = request.headers.get('cf-connecting-ip') || '';
  const userAgent = request.headers.get('user-agent') || '';
  const referrer = request.headers.get('referer') || '';
  const now = Math.floor(Date.now() / 1000);

  // --- Serve the page FIRST, then write to D1 in background ---
  const response = await next();

  // --- Set HTTP cookies ---
  const maxAge = 34560000; // 400 days
  const cookieBase = `Path=/; Max-Age=${maxAge}; SameSite=Lax; Secure`;

  const newHeaders = new Headers(response.headers);
  newHeaders.append('Set-Cookie', `_krob_sid=${sessionId}; ${cookieBase}`);
  newHeaders.append('Set-Cookie', `_krob_eid=${externalId}; ${cookieBase}`);
  newHeaders.append('Set-Cookie', `_fbp=${fbp}; ${cookieBase}`);

  if (fbc) {
    newHeaders.append('Set-Cookie', `_fbc=${fbc}; ${cookieBase}`);
  }

  let newResponse = new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: newHeaders,
  });

  // --- LGPD consent + Pixel injection ---
  // Pixels are only injected when the visitor has explicitly accepted all cookies
  // (alisat_lgpd=all cookie). On first visit or when "Só necessários" is chosen,
  // no tracking scripts are sent. The LGPD banner is injected into <body> on all
  // HTML page responses when no decision has been recorded yet.
  const isHtml = (newResponse.headers.get('content-type') || '').includes('text/html');

  if (isHtml) {
    const consent      = cookies['alisat_lgpd'] || '';          // '' | 'all' | 'necessary'
    const trackingOk   = consent === 'all';
    const hasDecided   = consent === 'all' || consent === 'necessary';

    const snippets = [];

    if (trackingOk && env.META_PIXEL_ID) {
      const pid = env.META_PIXEL_ID;
      snippets.push(
        `<script>!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?` +
        `n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;` +
        `n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;` +
        `s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script',` +
        `'https://connect.facebook.net/en_US/fbevents.js');fbq('init','${pid}');fbq('track','PageView');</script>` +
        `<noscript><img height="1" width="1" style="display:none" alt="" ` +
        `src="https://www.facebook.com/tr?id=${pid}&ev=PageView&noscript=1"/></noscript>`
      );
    }

    if (trackingOk && env.GA4_MEASUREMENT_ID) {
      const mid = env.GA4_MEASUREMENT_ID;
      snippets.push(
        `<script async src="/scripts/gtag.js?id=${mid}"></script>` +
        `<script>window.dataLayer=window.dataLayer||[];` +
        `function gtag(){dataLayer.push(arguments);}` +
        `gtag('js',new Date());gtag('config','${mid}');</script>`
      );
    }

    if (trackingOk && env.LINKEDIN_INSIGHT_TAG_ID) {
      const pid = env.LINKEDIN_INSIGHT_TAG_ID;
      snippets.push(
        `<script>_linkedin_partner_id="${pid}";window._linkedin_data_partner_ids=` +
        `window._linkedin_data_partner_ids||[];window._linkedin_data_partner_ids.push(_linkedin_partner_id);</script>` +
        `<script>(function(l){if(!l){window.lintrk=function(a,b){window.lintrk.q.push([a,b])};` +
        `window.lintrk.q=[]}var s=document.getElementsByTagName("script")[0];` +
        `var b=document.createElement("script");b.type="text/javascript";b.async=true;` +
        `b.src="https://snap.licdn.com/li.lms-analytics/insight.min.js";` +
        `s.parentNode.insertBefore(b,s)})(window.lintrk);</script>` +
        `<noscript><img height="1" width="1" style="display:none;" alt="" ` +
        `src="https://px.ads.linkedin.com/collect/?pid=${pid}&fmt=gif"/></noscript>`
      );
    }

    // LGPD banner — shown when visitor has not yet made a cookie choice.
    // Uses an HTTP cookie so the server can read it on the next request.
    // "Aceitar todos"  → cookie alisat_lgpd=all   + page reload (pixels fire on reload)
    // "Só necessários" → cookie alisat_lgpd=necessary (pixels never injected)
    const bannerHtml = hasDecided ? '' : (
      `<div id="__lgpd_b" role="dialog" aria-label="Aviso de cookies LGPD" ` +
      `style="position:fixed;bottom:0;left:0;right:0;z-index:99999;` +
      `background:#033566;color:#fff;padding:16px 24px;` +
      `box-shadow:0 -2px 20px rgba(0,0,0,.35);` +
      `font-family:Poppins,Arial,sans-serif;font-size:13px;line-height:1.5;display:none;">` +
      `<div style="max-width:1100px;margin:0 auto;display:flex;flex-wrap:wrap;` +
      `align-items:center;gap:16px;justify-content:space-between;">` +
      `<p style="margin:0;flex:1;min-width:220px;color:rgba(255,255,255,.9);">` +
      `Usamos cookies para melhorar sua experiência e realizar análises. ` +
      `Consulte nossa <a href="/politica-de-privacidade" ` +
      `style="color:#1ECB87;text-decoration:underline;">Política de Privacidade</a>.</p>` +
      `<div style="display:flex;gap:10px;flex-shrink:0;">` +
      `<button id="__lgpd_nec" ` +
      `style="background:transparent;color:rgba(255,255,255,.85);` +
      `border:1px solid rgba(255,255,255,.35);border-radius:6px;` +
      `padding:9px 18px;font-size:12px;font-family:inherit;cursor:pointer;">` +
      `Só necessários</button>` +
      `<button id="__lgpd_all" ` +
      `style="background:#1ECB87;color:#033566;border:none;border-radius:6px;` +
      `padding:9px 22px;font-size:12px;font-weight:700;font-family:inherit;cursor:pointer;">` +
      `Aceitar todos</button>` +
      `</div></div></div>` +
      `<script>(function(){` +
      `var K='alisat_lgpd';` +
      `var b=document.getElementById('__lgpd_b');` +
      `if(!document.cookie.match(K+'=')&&!localStorage.getItem(K)){` +
      `setTimeout(function(){b.style.display='block';},700);}` +
      `function choose(v){` +
      `document.cookie=K+'='+v+'; path=/; max-age='+(365*24*3600)+'; SameSite=Lax';` +
      `try{localStorage.setItem(K,v);}catch(e){}` +
      `b.style.display='none';` +
      `if(v==='all'){location.reload();}` +
      `}` +
      `var ea=document.getElementById('__lgpd_all');` +
      `var en=document.getElementById('__lgpd_nec');` +
      `if(ea)ea.addEventListener('click',function(){choose('all');});` +
      `if(en)en.addEventListener('click',function(){choose('necessary');});` +
      `})();\x3c/script>`
    );

    // Favicon injetado em todas as páginas HTML, independente de consentimento.
    const faviconTag = '<link rel="icon" type="image/x-icon" href="/assets/favicon.png">';

    const rw = new HTMLRewriter()
      .on('head', { element(el) {
        el.append(faviconTag, { html: true });
        if (snippets.length > 0) el.append(snippets.join(''), { html: true });
      }});
    if (bannerHtml) {
      rw.on('body', { element(el) { el.append(bannerHtml, { html: true }); } });
    }
    newResponse = rw.transform(newResponse);
  }

  // --- D1 UPSERT (background, non-blocking) ---
  context.waitUntil(
    (async () => {
      try {
        if (env.DB) {
          await env.DB.prepare(`
            INSERT INTO sessions (session_id, external_id, fbclid, gclid, msclkid, fbc, fbp, ip_address, user_agent, referrer, landing_url, utm_source, utm_medium, utm_campaign, utm_content, utm_term, li_fat_id, created_at, updated_at)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            ON CONFLICT(session_id) DO UPDATE SET
              fbclid = CASE WHEN excluded.fbclid != '' THEN excluded.fbclid ELSE sessions.fbclid END,
              gclid = CASE WHEN excluded.gclid != '' THEN excluded.gclid ELSE sessions.gclid END,
              msclkid = CASE WHEN excluded.msclkid != '' THEN excluded.msclkid ELSE sessions.msclkid END,
              fbc = CASE WHEN excluded.fbc != '' THEN excluded.fbc ELSE sessions.fbc END,
              utm_source = CASE WHEN excluded.utm_source != '' THEN excluded.utm_source ELSE sessions.utm_source END,
              utm_medium = CASE WHEN excluded.utm_medium != '' THEN excluded.utm_medium ELSE sessions.utm_medium END,
              utm_campaign = CASE WHEN excluded.utm_campaign != '' THEN excluded.utm_campaign ELSE sessions.utm_campaign END,
              utm_content = CASE WHEN excluded.utm_content != '' THEN excluded.utm_content ELSE sessions.utm_content END,
              utm_term = CASE WHEN excluded.utm_term != '' THEN excluded.utm_term ELSE sessions.utm_term END,
              li_fat_id = CASE WHEN excluded.li_fat_id IS NOT NULL AND excluded.li_fat_id != '' THEN excluded.li_fat_id ELSE sessions.li_fat_id END,
              updated_at = excluded.updated_at
          `).bind(sessionId, externalId, fbclid, gclid, msclkid, fbc, fbp, clientIp, userAgent, referrer, url.toString(), utmSource, utmMedium, utmCampaign, utmContent, utmTerm, liFatId || null, now, now).run();
        }
      } catch (e) {
        console.error('Middleware D1 error:', e.message);
      }
    })()
  );

  return newResponse;
}

function parseCookies(cookieHeader) {
  const cookies = {};
  cookieHeader.split(';').forEach(cookie => {
    const [name, ...rest] = cookie.trim().split('=');
    if (name) cookies[name.trim()] = rest.join('=');
  });
  return cookies;
}

function getRawParam(search, name) {
  const match = (search || '').match(new RegExp('[?&]' + name + '=([^&]*)'));
  return match ? match[1] : '';
}

function extractFbcPayload(fbc) {
  if (!fbc) return '';
  const parts = fbc.split('.');
  return parts.length >= 4 ? parts[3] : '';
}

// Country-code second-level domains where the ETLD+1 has three labels.
// A full public-suffix list is too heavy for an edge worker; this covers
// the common cases. Anything not listed defaults to the 2-label assumption
// (example.com → index 1), which is correct for .com / .net / .org / etc.
const CC_TLDS = new Set([
  'com.br', 'com.ar', 'com.mx', 'com.co', 'com.pe', 'com.ve', 'com.ec',
  'com.au', 'com.pt', 'com.pl', 'com.tr', 'com.ua', 'com.ru',
  'com.cn', 'com.tw', 'com.hk', 'com.sg', 'com.my', 'com.ph', 'com.vn',
  'co.uk', 'co.jp', 'co.kr', 'co.nz', 'co.za', 'co.in', 'co.id',
]);

function computeSubDomainIndex(host) {
  if (!host) return 1;
  const hostname = host.split(':')[0].toLowerCase();
  const parts = hostname.split('.');
  if (parts.length < 2) return 0;
  const lastTwo = parts.slice(-2).join('.');
  // Known country-code 2-label TLD → ETLD+1 has 3 labels → index 2
  if (CC_TLDS.has(lastTwo)) return 2;
  // Standard case: example.com → ETLD+1 has 2 labels → index 1
  return 1;
}
