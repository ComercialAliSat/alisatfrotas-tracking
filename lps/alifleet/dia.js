/* Site Cinematográfico · © 2026 Labrego IA · LBG-SC-2026-v1
   Um dia da frota: cada cena é uma função do progresso (0 a 1), então anda
   com a rolagem nos dois sentidos, toca sozinha no celular e fica parada no
   quadro final para quem desativa animações. */
(() => {
  const reduzir = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const fixar = () => !reduzir && matchMedia("(min-width: 981px)").matches;
  const faixa = (p, de, ate) => Math.min(1, Math.max(0, (p - de) / (ate - de)));
  const suave = (x) => 1 - Math.pow(1 - x, 3);
  const num = (n) => Math.round(n).toLocaleString("pt-BR");
  const mostrar = (el, v) => {
    el.style.opacity = v;
    el.style.transform = `translateY(${(1 - v) * 14}px)`;
  };

  const cenas = {
    tanque(c) {
      const q = (s) => c.querySelector(s);
      const nivel = q("[data-nivel]"), barra = q("[data-barra]"), curva = q("[data-curva]");
      const aviso = q("[data-aviso]"), litros = q("[data-litros]");
      const total = curva.getTotalLength();
      curva.style.strokeDasharray = total;
      return (p) => {
        const queda = suave(faixa(p, 0.3, 0.7));
        nivel.textContent = Math.round(62 - 9 * queda);
        barra.style.width = `${62 - 9 * queda}%`;
        curva.style.strokeDashoffset = total * (1 - faixa(p, 0, 0.72));
        const v = suave(faixa(p, 0.5, 0.64));
        mostrar(aviso, v);
        litros.textContent = Math.round(81 * suave(faixa(p, 0.5, 0.82)));
      };
    },

    checklist(c) {
      const baloes = [...c.querySelectorAll("[data-passo]")];
      const os = c.querySelector("[data-os]");
      return (p) => {
        for (const b of baloes) mostrar(b, suave(faixa(p, +b.dataset.passo, +b.dataset.passo + 0.1)));
        const v = suave(faixa(p, 0.6, 0.86));
        os.style.opacity = Math.min(1, v * 2);
        os.style.setProperty("--os", v);
      };
    },

    mapa(c) {
      const foto = c.querySelector("[data-foto]");
      const rotas = [...c.querySelectorAll("[data-rota]")];
      const marcas = [...c.querySelectorAll("[data-marca]")];
      const cartao = c.querySelector("[data-cartao]");
      const mov = c.querySelector("[data-mov]"), par = c.querySelector("[data-par]");
      const kmh = c.querySelector("[data-kmh]");
      const inicio = [0.12, 0.3, 0.05];
      const trecho = [0.5, 0.45, 0.6];
      return (p) => {
        foto.style.opacity = 1 - faixa(p, 0.08, 0.34);
        foto.style.transform = `scale(${1 + 0.5 * faixa(p, 0, 0.34)})`;
        marcas.forEach((m, i) => {
          const r = rotas[i], t = inicio[i] + trecho[i] * p;
          const pt = r.getPointAtLength(r.getTotalLength() * t);
          m.setAttribute("transform", `translate(${pt.x} ${pt.y})`);
        });
        // O terceiro caminhão para no meio da cena: o estado muda no mapa e na lista
        const parou = p > 0.56;
        const m = marcas[2], r = rotas[2];
        if (parou) {
          const pt = r.getPointAtLength(r.getTotalLength() * (inicio[2] + trecho[2] * 0.56));
          m.setAttribute("transform", `translate(${pt.x} ${pt.y})`);
        }
        m.querySelector("circle:last-child").setAttribute("fill", parou ? "#3e3e50" : "#56d6f9");
        mov.textContent = parou ? 2 : 3;
        par.textContent = parou ? 2 : 1;
        mostrar(cartao, suave(faixa(p, 0.62, 0.76)));
        kmh.textContent = `${Math.round(74 + 8 * Math.sin(p * 12))} km/h`;
      };
    },

    colisao(c) {
      const alerta = c.querySelector("[data-alerta]");
      const etapas = [...c.querySelectorAll("[data-etapa]")];
      const video = c.querySelector("[data-videocaso]");
      return (p) => {
        mostrar(alerta, suave(faixa(p, 0.08, 0.2)));
        for (const e of etapas) e.classList.toggle("feita", p >= +e.dataset.etapa);
        const v = suave(faixa(p, 0.42, 0.6));
        video.style.opacity = 0.25 + 0.75 * v;
        video.style.pointerEvents = p > 0.7 ? "auto" : "none";
      };
    },

    ranking(c) {
      const dados = [
        ["José", 88, 91, "B"], ["Ana", 81, 94, "A"], ["Pedro", 79, 83, "B"],
        ["João", 76, 74, "C"], ["Carlos", 70, 68, "C"],
      ];
      const lista = c.querySelector("[data-ranking]");
      const apoio = c.querySelector("[data-apoio]");
      lista.innerHTML = dados.map(([n]) =>
        `<li><i>${n.slice(0, 2)}</i><strong>${n}</strong><span class="barra"><b></b></span><em></em><u></u></li>`).join("");
      const itens = [...lista.children];
      const altura = 58;
      return (p) => {
        const conta = suave(faixa(p, 0.1, 0.62));
        const pontos = dados.map((d) => d[1] + (d[2] - d[1]) * conta);
        const de = [...dados.keys()].sort((a, b) => dados[b][1] - dados[a][1]);
        const ate = [...dados.keys()].sort((a, b) => dados[b][2] - dados[a][2]);
        const troca = suave(faixa(p, 0.5, 0.74));
        itens.forEach((li, i) => {
          const y = de.indexOf(i) + (ate.indexOf(i) - de.indexOf(i)) * troca;
          li.style.transform = `translateY(${y * altura}px)`;
          li.querySelector("em").textContent = pontos[i].toFixed(1).replace(".", ",");
          li.querySelector(".barra b").style.width = `${pontos[i]}%`;
          li.querySelector("u").textContent = dados[i][3];
          li.classList.toggle("subiu", i === 1 && troca > 0.5);
        });
        mostrar(apoio, suave(faixa(p, 0.76, 0.88)));
      };
    },

    dono(c) {
      const frase = "Como foi a semana da frota?";
      const digita = c.querySelector("[data-digita]");
      const resposta = c.querySelector("[data-resposta]");
      const km = c.querySelector("[data-km]"), oc = c.querySelector("[data-oc]"), lt = c.querySelector("[data-lt]");
      const caixa = c.querySelector("[data-barras]");
      const dias = [2100, 1900, 1550, 2300, 200, 1400, 396];
      caixa.innerHTML = dias.map((_, i) => `<div><i></i><small>${"STQQSSD"[i]}</small></div>`).join("");
      const barras = [...caixa.querySelectorAll("i")];
      return (p) => {
        digita.textContent = frase.slice(0, Math.round(frase.length * faixa(p, 0.04, 0.34)));
        const v = suave(faixa(p, 0.4, 0.5));
        mostrar(resposta, v);
        const n = suave(faixa(p, 0.42, 0.72));
        km.textContent = num(10346 * n);
        oc.textContent = num(257 * n);
        lt.textContent = num(3796 * n);
        barras.forEach((b, i) => {
          const h = suave(faixa(p, 0.5 + i * 0.03, 0.66 + i * 0.03));
          b.style.height = `${(dias[i] / 2300) * 100 * h}%`;
        });
      };
    },
  };

  /* ── Liga cada cena ao seu condutor ───────────────────────────────────── */
  const lista = [...document.querySelectorAll(".cena")].map((el) => {
    const pintar = cenas[el.dataset.cena](el);
    return { el, pintar, tocou: false };
  });

  const relogio = document.querySelector(".relogio");
  const hora = relogio.querySelector(".relogio-hora"), dia = relogio.querySelector(".relogio-dia");
  const marcas = [...relogio.querySelectorAll("b")];
  const minutos = lista.map((c) => {
    const [h, m] = c.el.dataset.hora.split(":").map(Number);
    return h * 60 + m;
  });
  const dois = (n) => String(n).padStart(2, "0");

  const mover = () => {
    if (!fixar()) { relogio.classList.remove("ligado"); return; }
    let visivel = -1, progresso = 0;
    lista.forEach((c, i) => {
      const r = c.el.getBoundingClientRect();
      const p = Math.min(1, Math.max(0, -r.top / (c.el.offsetHeight - innerHeight || 1)));
      if (r.bottom > 0 && r.top < innerHeight) {
        // A cena só começa a contar quando encosta no topo; antes disso, entra pronta para rodar
        c.pintar(faixa(p, 0.04, 0.9));
        c.el.classList.toggle("ativa", r.top < innerHeight * 0.4);
      }
      if (r.top <= innerHeight * 0.5 && r.bottom > innerHeight * 0.5) { visivel = i; progresso = p; }
    });
    relogio.classList.toggle("ligado", visivel >= 0);
    if (visivel >= 0) {
      const atual = minutos[visivel], antes = visivel ? minutos[visivel - 1] : atual;
      const fim = lista[visivel].el.dataset.dia !== "Terça";
      const min = fim ? atual : Math.round(antes + (atual - antes) * suave(faixa(progresso, 0, 0.14)));
      hora.textContent = `${dois(Math.floor(min / 60))}:${dois(min % 60)}`;
      dia.textContent = lista[visivel].el.dataset.dia;
      marcas.forEach((b, i) => b.classList.toggle("feita", i <= visivel));
    }
  };

  let pedido = 0;
  const pedir = () => { if (!pedido) pedido = requestAnimationFrame(() => { pedido = 0; mover(); }); };
  addEventListener("scroll", pedir, { passive: true });
  addEventListener("resize", pedir);

  // Celular: a cena toca uma vez quando chega na tela. Sem animação: quadro final.
  const tocar = (c) => {
    if (c.tocou) return;
    c.tocou = true;
    const t0 = performance.now(), dura = 6000;
    const passo = (t) => {
      const p = Math.min(1, (t - t0) / dura);
      c.pintar(p);
      if (p < 1 && !fixar()) requestAnimationFrame(passo);
    };
    requestAnimationFrame(passo);
  };
  if (reduzir) lista.forEach((c) => { c.pintar(1); c.el.classList.add("ativa"); });
  else {
    lista.forEach((c) => c.pintar(0));
    const io = new IntersectionObserver((es) => es.forEach((e) => {
      const c = lista.find((x) => x.el === e.target);
      if (e.isIntersecting && !fixar()) { c.el.classList.add("ativa"); tocar(c); }
    }), { threshold: 0.25 });
    lista.forEach((c) => io.observe(c.el));
  }
  mover();

  /* ── Calculadora de perda ─────────────────────────────────────────────── */
  const calc = document.querySelector("[data-calc]");
  if (calc) {
    const ler = (n) => parseFloat(String(calc.elements[n].value).replace(/\./g, "").replace(",", ".")) || 0;
    const reais = (v) => v.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });
    const contar = () => {
      const litros = ler("kml") ? (ler("veiculos") * ler("km")) / ler("kml") : 0;
      const mes = litros * 0.01 * ler("preco");
      document.querySelector("[data-calc-mes]").textContent = reais(mes);
      document.querySelector("[data-calc-ano]").textContent = reais(mes * 12);
      document.querySelector("[data-calc-litros]").textContent = num(litros * 0.12);
    };
    calc.addEventListener("input", contar);
    calc.addEventListener("submit", (e) => e.preventDefault());
    contar();
  }

  /* ── Banner de cookies: a pilha injeta o oficial. Este só existe fora dela. ─ */
  addEventListener("load", () => {
    const K = "alisat_lgpd";
    let visto = document.cookie.includes(`${K}=`);
    try { visto = visto || !!localStorage.getItem(K); } catch (e) { /* navegação privada */ }
    if (visto || document.getElementById("__lgpd_b")) return;
    const b = document.createElement("div");
    b.id = "__lgpd_b";
    b.className = "cookies";
    b.setAttribute("role", "dialog");
    b.setAttribute("aria-label", "Aviso de cookies LGPD");
    b.innerHTML = '<p>Usamos cookies para melhorar sua experiência e realizar análises. Consulte nossa <a href="/politica-de-privacidade" target="_blank" rel="noopener">Política de Privacidade</a>.</p><div><button type="button" data-v="necessary">Só necessários</button><button type="button" data-v="all">Aceitar todos</button></div>';
    b.addEventListener("click", (e) => {
      const v = e.target.dataset && e.target.dataset.v;
      if (!v) return;
      document.cookie = `${K}=${v}; path=/; max-age=${365 * 24 * 3600}; SameSite=Lax`;
      try { localStorage.setItem(K, v); } catch (err) { /* navegação privada */ }
      b.remove();
    });
    document.body.append(b);
  });
})();
