/* Site Cinematográfico · © 2026 Labrego IA · LBG-SC-2026-v1
   Motor da rolagem cinematográfica, WhatsApp e formulário de contato. */
(() => {
  const S = window.SITE || {};
  const reduzir = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const celular = matchMedia("(max-width: 760px)").matches;

  console.log("%cSite Cinematográfico · Labrego IA", "font:600 12px sans-serif;color:#0088e0",
    `\nlabregoia.com.br · ${S.assinatura || ""}`);

  /* ── Rolagem que toca o vídeo ─────────────────────────────────────────── */
  const cine = document.querySelector(".cine");
  const canvas = cine && cine.querySelector(".cine-canvas");
  if (cine && canvas && S.frames && S.frames.total) {
    const ctx = canvas.getContext("2d");
    const total = S.frames.total;
    const padrao = celular ? S.frames.mobile : S.frames.desktop;
    const src = (i) => padrao.replace("{n}", String(i + 1).padStart(4, "0"));
    const quadros = new Array(total);
    const momentos = [...cine.querySelectorAll(".momento")];
    let alvo = 0, atual = 0, desenhado = -1;

    const carregar = (i) => {
      if (quadros[i]) return quadros[i];
      const img = new Image();
      img.decoding = "async";
      img.src = src(i);
      img.onload = () => { if (Math.round(atual) === i || desenhado === -1) desenhar(i, true); };
      return (quadros[i] = img);
    };

    // Carrega em passadas (1 a cada 8, depois 1 a cada 4…) para cobrir o filme inteiro cedo
    carregar(0);
    if (!reduzir) {
      const fila = [];
      for (const passo of [8, 4, 2, 1]) for (let i = 0; i < total; i += passo) if (!fila.includes(i)) fila.push(i);
      let k = 0;
      const lote = () => { for (let n = 0; n < 6 && k < fila.length; n++) carregar(fila[k++]); if (k < fila.length) setTimeout(lote, 40); };
      lote();
    }

    const pronto = (i) => quadros[i] && quadros[i].complete && quadros[i].naturalWidth;
    const maisProximo = (i) => {
      for (let d = 0; d < total; d++) {
        if (pronto(i - d)) return i - d;
        if (pronto(i + d)) return i + d;
      }
      return -1;
    };

    const ajustar = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(canvas.clientWidth * dpr);
      canvas.height = Math.round(canvas.clientHeight * dpr);
      desenhado = -1;
      desenhar(Math.round(atual), true);
    };

    function desenhar(i, forcar) {
      const j = maisProximo(i);
      if (j < 0 || (j === desenhado && !forcar)) return;
      const img = quadros[j];
      const cw = canvas.width, ch = canvas.height;
      const escala = Math.max(cw / img.naturalWidth, ch / img.naturalHeight); // "cover"
      const w = img.naturalWidth * escala, h = img.naturalHeight * escala;
      ctx.drawImage(img, (cw - w) / 2, (ch - h) / 2, w, h);
      desenhado = j;
    }

    const progresso = () => {
      const r = cine.getBoundingClientRect();
      const curso = cine.offsetHeight - innerHeight;
      return Math.min(1, Math.max(0, -r.top / (curso || 1)));
    };

    const atualizarMomentos = (p) => {
      for (const m of momentos) {
        const de = parseFloat(m.dataset.de || 0), ate = parseFloat(m.dataset.ate || 1);
        m.classList.toggle("ativo", p >= de && (p < ate || (ate >= 1 && p >= 1)));
      }
      cine.classList.toggle("andou", p > 0.02);
    };

    const quadro = () => {
      alvo = progresso() * (total - 1);
      atual += (alvo - atual) * 0.18; // suaviza: sensação de filme, não de slide
      if (Math.abs(alvo - atual) < 0.05) atual = alvo;
      desenhar(Math.round(atual));
      atualizarMomentos(atual / (total - 1));
      requestAnimationFrame(quadro);
    };

    addEventListener("resize", ajustar);
    ajustar();
    if (reduzir) atualizarMomentos(0);
    else requestAnimationFrame(quadro);
  }

  /* ── Parallax leve nas artes ──────────────────────────────────────────── */
  const artes = reduzir ? [] : [...document.querySelectorAll(".arte:not(.cena-arte)")];
  if (artes.length) {
    const mover = () => {
      for (const a of artes) {
        const r = a.parentElement.getBoundingClientRect();
        if (r.bottom < 0 || r.top > innerHeight) continue;
        const c = (r.top + r.height / 2 - innerHeight / 2) / innerHeight;
        a.style.transform = `translate3d(0, ${(c * -60).toFixed(1)}px, 0) scale(1.08)`;
      }
    };
    addEventListener("scroll", () => requestAnimationFrame(mover), { passive: true });
    mover();
  }

  /* ── Barra de progresso ────────────────────────────────────────────────── */
  const raiz = document.documentElement;
  const progresso = () => raiz.style.setProperty("--progresso", (scrollY / ((raiz.scrollHeight - innerHeight) || 1)).toFixed(4));
  addEventListener("scroll", progresso, { passive: true });
  progresso();

  /* ── Menu marca a seção atual ──────────────────────────────────────────── */
  const links = [...document.querySelectorAll(".menu a")];
  const alvos = links.map((a) => document.querySelector(a.getAttribute("href"))).filter(Boolean);
  const marcar = () => {
    let atual = null;
    for (const s of alvos) if (s.getBoundingClientRect().top < innerHeight * 0.5) atual = s;
    links.forEach((a) => a.classList.toggle("aqui", !!atual && a.getAttribute("href") === `#${atual.id}`));
  };
  addEventListener("scroll", marcar, { passive: true });

  /* ── Topo, revelar e ano ──────────────────────────────────────────────── */
  const topo = document.querySelector(".topo");
  const whats = document.querySelector(".whats");
  let formNaTela = false; // o botão flutuante se recolhe para não cobrir o "Enviar"
  const aoRolar = () => {
    topo && topo.classList.toggle("rolou", scrollY > 40);
    whats && whats.classList.toggle("visivel", scrollY > innerHeight * 0.6 && !formNaTela);
  };
  const formEl = document.querySelector(".form");
  if (formEl) new IntersectionObserver(([e]) => { formNaTela = e.isIntersecting; aoRolar(); }).observe(formEl);
  addEventListener("scroll", aoRolar, { passive: true });
  aoRolar();

  const io = new IntersectionObserver((es) => es.forEach((e) => {
    if (e.isIntersecting) { e.target.classList.add("visto"); io.unobserve(e.target); }
  }), { threshold: 0.18 });
  document.querySelectorAll(".revelar").forEach((el) => io.observe(el));
  document.querySelectorAll("[data-ano]").forEach((el) => (el.textContent = new Date().getFullYear()));

  /* ── Vídeos do YouTube: só carregam e tocam no clique ─────────────────── */
  document.querySelectorAll(".video[data-video]").forEach((v) => {
    v.querySelector(".play").addEventListener("click", () => {
      const f = document.createElement("iframe");
      f.src = `https://www.youtube-nocookie.com/embed/${v.dataset.video}?autoplay=1&rel=0`;
      f.title = v.dataset.titulo;
      f.allow = "autoplay; encrypted-media; picture-in-picture";
      f.referrerPolicy = "strict-origin-when-cross-origin";
      f.allowFullscreen = true;
      v.replaceChildren(f);
      v.classList.add("tocando");
    });
  });

  /* ── WhatsApp ─────────────────────────────────────────────────────────── */
  if (whats && S.whatsapp) {
    const num = String(S.whatsapp.numero || "").replace(/\D/g, "");
    whats.href = `https://wa.me/${num}?text=${encodeURIComponent(S.whatsapp.mensagem || "")}`;
  }

  /* ── Formulário → /tracker da pilha (banco próprio e CRM) ─────────────── */
  const form = document.querySelector(".form");
  if (form) {
    const status = form.querySelector(".form-status");
    const botao = form.querySelector("button[type=submit]");
    const avisar = (txt, tipo) => { status.textContent = txt; status.className = `form-status campo--inteiro ${tipo || ""}`; };
    const param = (k) => new URLSearchParams(location.search).get(k) || "";
    const cookie = (n) => (document.cookie.match(new RegExp(`(?:^|; )${n}=([^;]*)`)) || [])[1] || "";
    const digitos = (v) => v.replace(/\D/g, "");
    const cnpjOk = (v) => {
      const d = digitos(v);
      if (d.length !== 14 || /^(\d)\1+$/.test(d)) return false;
      const dv = (n) => {
        let soma = 0, peso = n - 7;
        for (let i = 0; i < n; i++) { soma += +d[i] * peso--; if (peso < 2) peso = 9; }
        const r = soma % 11;
        return r < 2 ? 0 : 11 - r;
      };
      return dv(12) === +d[12] && dv(13) === +d[13];
    };
    form.elements.cnpj.addEventListener("input", (e) => {
      const d = digitos(e.target.value).slice(0, 14);
      e.target.value = d.replace(/^(\d{2})(\d)/, "$1.$2").replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3").replace(/\.(\d{3})(\d)/, ".$1/$2").replace(/(\d{4})(\d)/, "$1-$2");
    });
    form.elements.veiculos.addEventListener("input", (e) => { e.target.value = digitos(e.target.value); });

    form.addEventListener("submit", async (ev) => {
      ev.preventDefault();
      if (form.elements._honey.value) return; // robô
      const regras = {
        nome: (v) => v.trim().length > 1,
        telefone: (v) => digitos(v).length >= 10,
        email: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
        cnpj: cnpjOk,
        veiculos: (v) => +v > 0,
      };
      let valido = true;
      for (const [n, ok] of Object.entries(regras)) {
        const c = form.elements[n], bom = ok(c.value);
        c.closest(".campo").classList.toggle("erro", !bom);
        if (!bom) valido = false;
      }
      const aceite = form.elements.lgpd;
      aceite.closest(".aceite").classList.toggle("erro", !aceite.checked);
      if (!valido) return avisar("Confira os campos destacados.", "falha");
      if (!aceite.checked) return avisar("Aceite a Política de Privacidade e Cookies para enviar.", "falha");

      const d = Object.fromEntries(new FormData(form));
      const partes = d.nome.trim().split(/\s+/);
      const eventId = crypto.randomUUID();
      const consentimento = cookie("alisat_lgpd") || "unknown";
      botao.disabled = true;
      avisar("Enviando…");
      try {
        const r = await fetch("/tracker", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            event_name: "Lead", event_id: eventId, event_time: Math.floor(Date.now() / 1000),
            event_source_url: location.href, product: "alifleet", consent_status: consentimento,
            user_data: { em: d.email, fn: partes[0] || "", ln: partes.slice(1).join(" "), ph: digitos(d.telefone) },
            cnpj: digitos(d.cnpj), quantidade_veiculos: Number(d.veiculos), aceite_politica: "sim",
            utm_source: param("utm_source"), utm_medium: param("utm_medium"), utm_campaign: param("utm_campaign"),
            utm_content: param("utm_content"), utm_term: param("utm_term"), fbclid: param("fbclid"), gclid: param("gclid"),
            fbp: cookie("_fbp"), fbc: cookie("_fbc"),
          }),
        });
        if (!r.ok) throw new Error(r.status);
        if (window.fbq) fbq("track", "Lead", {}, { eventID: eventId });
        form.reset();
        avisar("Recebemos seu contato. Em breve falamos com você.", "ok");
      } catch (e) {
        console.warn("Falha no envio do formulário:", e);
        avisar("Não foi possível enviar agora. Chame a gente no WhatsApp.", "falha");
      } finally {
        botao.disabled = false;
      }
    });
  }
})();
