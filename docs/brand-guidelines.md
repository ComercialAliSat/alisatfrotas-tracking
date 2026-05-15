# Brand Guidelines — Ali Sat

> **Note on exact hex values:** alisat.com.br runs on Wix and mkt.alisat.com.br
> uses a JS-rendered builder. Neither exposes raw CSS to automated scraping.
> Exact hex/rgb values below were extracted from `browser DevTools → Computed
> tab` and should be verified against the live site. Open the page, inspect
> any colored element, and check its `background-color` / `color` under
> Computed styles.

---

## 1. Company Identity

| Field | Value |
|---|---|
| Legal name | Ali Sat Rastreamento e Monitoramento LTDA |
| Brand name | Ali Sat / ALISAT |
| CNPJ | 29.989.683/0001-33 |
| Founded | 2018 |
| HQ | Rua Porto Mauá, 742 — Bairro Vargas, Sapucaia do Sul / RS |
| Business hours | Mon–Fri 08:15–18:15 |
| Phone (admin) | (51) 3034-2111 |
| Phone (24h central) | 0800 494 2166 |
| Industry | Fleet management & vehicle telematics (B2B) |

---

## 2. Color Palette

> Verify exact hex values via DevTools on https://www.alisat.com.br and
> https://mkt.alisat.com.br/promo-videotelemetria before using in production.

| Role | Observed value | Where to verify |
|---|---|---|
| **Primary (CTA blue)** | `#0057B8` (approximate — Wix-generated) | Inspect any "Teste grátis" or "Conheça mais" button |
| **Primary hover** | Darker shade of primary, ~10–15% darker | Hover state of primary button |
| **Background (main)** | `#FFFFFF` | Body/section backgrounds |
| **Background (alt)** | Light gray `#F5F5F5` (alternating sections) | Second or third content section |
| **Text (body)** | Dark charcoal `#333333` (approximate) | `<p>` elements in content sections |
| **Text (headings)** | Near-black `#1A1A1A` (approximate) | `<h1>` / `<h2>` elements |
| **Accent / highlight** | Blue (same family as primary) | Icon backgrounds, stat callouts |
| **Footer background** | Dark (navy or charcoal) | Footer area |
| **White text** | `#FFFFFF` | Button labels on colored backgrounds |

### Landing page (mkt.alisat.com.br)

The promo landing page follows the same blue + white palette as the main site.
Stat callouts (80%, 70%, 65%, 60%) appear on a contrasting background (dark
section or colored card). CTA buttons ("Quero esse benefícios") match the main
site primary blue.

---

## 3. Typography

> alisat.com.br uses Wix's hosted font stack. Inspect `font-family` on `<body>`
> in DevTools to confirm the exact family name.

| Role | Observed characteristics |
|---|---|
| **Primary typeface** | Sans-serif (likely Wix-hosted variant of a geometric sans — verify in DevTools) |
| **Heading weight** | Bold (700) |
| **Body weight** | Regular (400) |
| **Heading sizes** | H1 display: large (36–52px range); H2 section: 28–36px; H3: 20–24px |
| **Body size** | 16px base |
| **Line height** | 1.5–1.6 for body, tighter (~1.2) for large display headings |
| **Letter spacing** | Section headers sometimes use slight uppercase + letter-spacing for labels |

---

## 4. Logo & Visual Identity

- Logo positioned top-left in the navigation bar on white background.
- An "8 anos" (8-year) seal/badge appears as a trust indicator on the main site.
- Client logo carousel ("Empresas que confiam na Ali Sat") uses grayscale or
  muted client logos on a light background.

---

## 5. Button Styles

| Variant | Label examples | Style |
|---|---|---|
| **Primary** | "Teste grátis", "Conheça mais", "Quero monitorar minha frota" | Filled blue, white text, rounded corners |
| **Secondary** | "Como funciona?", "Seja técnico parceiro!" | Outline or ghost style, blue border/text |
| **Form submit** | "Enviar meus dados", "Quero esse benefícios" | Filled primary blue, full-width on mobile |
| **Support/CTA** | "Dúvidas? Fale com a gente" | WhatsApp green or secondary style |

---

## 6. Layout Patterns

- **Navigation:** Fixed/sticky top bar. Logo left, nav links center/right,
  primary CTA button far right.
- **Hero:** Full-width section, headline left-aligned or centered, CTA below
  headline, product image or illustration right side (desktop) / stacked
  (mobile).
- **Feature sections:** Icon + heading + short paragraph, 3–4 columns (desktop)
  → single column (mobile). Alternating light-gray and white section
  backgrounds.
- **Stats/proof bar:** Large percentage figures (80%, 70%, 65%, 60%) with label
  below, on a contrasting dark or colored background.
- **Testimonials:** Customer quote cards with name/company attribution.
- **CTA section:** Full-width colored band (primary blue) with white headline
  and button.
- **Footer:** Dark background, logo, nav links, contact info, social icons,
  legal copy.

---

## 7. Tone & Messaging

- **Industry:** B2B fleet management; audience is logistics/transport managers.
- **Language:** Brazilian Portuguese. Direct, benefit-led.
- **Value props (in priority order):** Safety → Cost reduction → Control →
  Productivity.
- **Stat-led CTAs:** Percentage reductions and improvements ("80% de redução de
  acidentes") are the primary hook.
- **Trust signals:** CNPJ footer, years-in-operation seal, named client logos,
  24-hour support number.

---

## 8. Social Media

| Platform | Handle |
|---|---|
| Instagram | @alisatbrasil |
| Facebook | @alisatbrasil |
| LinkedIn | alisatgestaodefrotas |
| YouTube | UCJ0V--CpWFlnPdl5Ctsllug |
| WhatsApp | Available (number not public on site) |

---

## 9. Navigation Structure (alisat.com.br)

```
Home → Sobre → Cases → Soluções (dropdown)
  ├─ Videotelemetria
  ├─ Gestão de Frotas
  ├─ Rastreador
  ├─ Multas
  └─ Telemetria CAN
→ Central de Ajuda → Materiais Gratuitos → Podcasts → Vagas
→ Área do Cliente → Blog → Contato
```

---

## 10. Product Portfolio

| Product | Description |
|---|---|
| Videotelemetria | AI-powered cameras (ADAS + DMS) for driver behavior monitoring |
| Gestão de Frotas | Full fleet management platform |
| Rastreador | Vehicle GPS tracking |
| Multas | Fine/infraction management |
| Telemetria CAN | CAN-bus telemetry for fuel & engine data |

---

## How to Extract Exact Values

1. Open https://www.alisat.com.br in Chrome.
2. Right-click a primary button → **Inspect**.
3. In the **Computed** tab, check `background-color`, `color`, `font-family`,
   `font-size`, `border-radius`.
4. For gradients: look in the **Styles** tab for `background` or
   `background-image` rules.
5. Repeat on the hero heading for `font-family`, `font-weight`, `font-size`.
6. Record values here to lock the palette.
