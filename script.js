const NOTA_APROVACAO = 6; // aprovado se nota >= 6

const prova = [
  {
    enunciado: "1. Um estudante precisa desenvolver um programa que receba a idade de uma pessoa e informe se ela é maior ou menor de idade. Considerando os fundamentos de programação estruturada, a estrutura mais adequada para implementar essa situação é:",
    alternativas: [
      "Uma estrutura de repetição, pois a idade deverá ser processada continuamente até que o usuário encerre o programa.",
      "Uma estrutura de decisão, utilizando uma condição que permita escolher entre dois resultados possíveis.",
      "Uma estrutura exclusivamente sequencial, pois qualquer programa deve executar todas as instruções independentemente dos valores recebidos.",
      "Uma estrutura de repetição do tipo FOR, pois toda entrada de dados precisa ser processada por um número determinado de vezes.",
      "Uma estrutura baseada exclusivamente em operadores matemáticos, sem necessidade de utilizar condições lógicas."
    ],
    correta: 1
  },
  {
    enunciado: "2. Um estudante deseja desenvolver um pequeno programa para calcular a média de três notas. Considerando o modelo IPO (Input → Processing → Output), a sequência correta das etapas é:",
    alternativas: [
      "Processamento → Entrada → Saída.",
      "Saída → Entrada → Processamento.",
      "Entrada → Saída → Processamento.",
      "Entrada → Processamento → Saída.",
      "Saída → Processamento → Entrada"
    ],
    correta: 3
  },
  {
    enunciado: "3. Uma estudante deseja realizar uma pesquisa bibliográfica sobre a utilização de Inteligência Artificial na educação. Ela também deseja considerar trabalhos que utilizem o termo Machine Learning, mas não pretende encontrar estudos relacionados à robótica. Para construir uma busca mais adequada, a expressão mais apropriada é:",
    alternativas: [
      "\"Inteligência Artificial\" AND \"Machine Learning\" AND \"Educação\" AND \"Robótica\"",
      "\"Inteligência Artificial\" OR \"Machine Learning\" OR \"Educação\" OR \"Robótica\"",
      "(\"Inteligência Artificial\" OR \"Machine Learning\") AND \"Educação\" NOT \"Robótica\"",
      "\"Inteligência Artificial\" NOT \"Machine Learning\" OR \"Educação\" AND \"Robótica\"",
      "\"Inteligência Artificial\" NOT \"Educação\" AND \"Machine Learning\" OR \"Robótica\""
    ],
    correta: 2
  },
  {
    enunciado: "4. Durante uma pesquisa em uma base de dados científica, um estudante utiliza o termo: Educ*. O objetivo é recuperar diferentes palavras que possuam a mesma raiz, aumentando a abrangência da pesquisa. Considerando o funcionamento do truncamento apresentado na aula, é correto afirmar que:",
    alternativas: [
      "O asterisco determina que somente a palavra exatamente igual a \"Educ\" seja localizada.",
      "O asterisco exclui automaticamente todos os termos relacionados à palavra pesquisada.",
      "O truncamento permite recuperar diferentes variações que compartilham a raiz utilizada na pesquisa.",
      "O truncamento deve ser utilizado exclusivamente para pesquisar autores de artigos científicos.",
      "O asterisco substitui os operadores booleanos AND, OR e NOT nas bases científicas."
    ],
    correta: 2
  },
  {
    enunciado: "5. Um estudante universitário precisa analisar diversos artigos científicos para elaborar um trabalho acadêmico. Como possui pouco tempo disponível, ele decide não realizar inicialmente uma leitura completa de todos os textos. De acordo com a estratégia apresentada na aula, qual procedimento é mais adequado?",
    alternativas: [
      "Ler integralmente todos os artigos, começando pela metodologia, independentemente da relevância do trabalho.",
      "Ler inicialmente o resumo para realizar um filtro, verificar a conclusão e posteriormente consultar a introdução e a metodologia conforme a necessidade.",
      "Começar exclusivamente pela metodologia, pois ela apresenta todas as informações necessárias para determinar a relevância do artigo.",
      "Ler somente o título dos artigos e utilizar essa informação como suficiente para elaborar a revisão bibliográfica.",
      "Iniciar diretamente pelos resultados, ignorando o resumo, a introdução e a conclusão."
    ],
    correta: 1
  },
  {
    enunciado: "6. Um aluno precisa realizar uma pesquisa científica sobre determinado tema. Inicialmente, pretende obter uma visão geral do assunto e, posteriormente, localizar trabalhos acadêmicos brasileiros, artigos de maior impacto internacional e estudos específicos da área da saúde. Considerando os repositórios apresentados na aula, a estratégia mais adequada seria:",
    alternativas: [
      "Utilizar exclusivamente o Google Acadêmico, pois ele substitui todas as demais bases científicas.",
      "Utilizar SciELO para artigos internacionais de maior impacto, BDTD para artigos biomédicos e PubMed para teses brasileiras.",
      "Utilizar Google Acadêmico para uma visão inicial, SciELO/BDTD para produção brasileira e latino-americana, Scopus/Web of Science para literatura internacional e PubMed para saúde e biomedicina.",
      "Utilizar exclusivamente ResearchGate e Academia.edu, pois todas as publicações científicas estão disponíveis gratuitamente nessas plataformas.",
      "Utilizar somente o Portal de Periódicos CAPES, independentemente do assunto ou do objetivo da pesquisa."
    ],
    correta: 2
  }
];

const LETRAS = ["A", "B", "C", "D", "E"];
let atual = 0, nota = 0, selecionada = null, confirmada = false, respostas = [], nomeAluno = "";

const $ = (id) => document.getElementById(id);

/* Figura de referência de cada questão, recortada da prova */
const FIGURAS_QUESTOES = [
  { src: "imagens/fig-1.jpg", alt: "Os 3 pilares da programação estruturada: sequência, decisão (if/else) e repetição (while/for)" },
  { src: "imagens/fig-2.jpg", alt: "O fluxo universal de qualquer programa: entrada, processamento e saída, com o exemplo da idade" },
  { src: "imagens/fig-3.jpg", alt: "Programando a sua pesquisa bibliográfica: parênteses, OR, AND e NOT em uma busca de exemplo" },
  { src: "imagens/fig-4.jpg", alt: "DeCS para buscas em português e MeSH para buscas em inglês" },
  { src: "imagens/fig-5.jpg", alt: "Fluxograma de leitura de artigo: resumo, conclusão, introdução, metodologia e resultados" },
  { src: "imagens/fig-6.jpg", alt: "Quadro de repositórios: Google Acadêmico, SciELO e BDTD, Scopus e Web of Science, PubMed e JSTOR" }
];

/* ---------- Letras da tela inicial: cada caractere vira um span que ondula com a rolagem ---------- */
const RAIZES_TEXTO = [".hero", "#tela-inicio", "#como-funciona"];
const obsTexto = new MutationObserver(() => espalharTexto());
function observarTexto() {
  RAIZES_TEXTO.forEach((sel) => {
    obsTexto.observe(document.querySelector(sel), { childList: true, subtree: true, characterData: true });
  });
}
function espalharTexto() {
  const nos = [];
  RAIZES_TEXTO.forEach((sel) => {
    const w = document.createTreeWalker(document.querySelector(sel), NodeFilter.SHOW_TEXT);
    while (w.nextNode()) {
      const n = w.currentNode;
      if (!n.nodeValue.trim()) continue;
      if (n.parentElement.closest("#marca-nome, .ch, script, style")) continue;
      nos.push(n);
    }
  });
  if (!nos.length) return;
  obsTexto.disconnect();
  nos.forEach((n) => {
    const frag = document.createDocumentFragment();
    let k = 0;
    n.nodeValue.split(/(\s+)/).forEach((p) => {
      if (!p) return;
      if (/^\s+$/.test(p)) { frag.appendChild(document.createTextNode(" ")); return; }
      const pal = document.createElement("span");
      pal.className = "pal";
      for (const ch of p) {
        const c = document.createElement("span");
        c.className = "ch";
        c.textContent = ch;
        c.style.setProperty("--i", k++);
        pal.appendChild(c);
      }
      frag.appendChild(pal);
    });
    n.replaceWith(frag);
  });
  observarTexto();
}

/* ---------- Título Guriprovs: se move com a rolagem ---------- */
const nomeInner = $("nome-inner");
const letrasNome = "Guriprovs".split("").map((ch, i) => {
  const s = document.createElement("span");
  s.className = "c" + (i % 4);
  s.textContent = ch;
  nomeInner.appendChild(s);
  return s;
});
let posRolagem = 0; // posição suavizada usada na animação
let posAlvo = 0;    // posição real da rolagem
let quadroPendente = false;

const raizDoc = document.documentElement;
const semMovimento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function animarNome() {
  quadroPendente = false;
  // inércia: a animação persegue a rolagem aos poucos, o que deixa o movimento mais suave
  posRolagem += (posAlvo - posRolagem) * 0.1;
  if (Math.abs(posAlvo - posRolagem) < 0.05) posRolagem = posAlvo;
  else pedirQuadro();
  const p = posRolagem;
  raizDoc.style.setProperty("--t", (p / 110).toFixed(3));
  raizDoc.style.setProperty("--amp", semMovimento ? "0" : Math.min(2.5, p / 60).toFixed(2));
  const amp = Math.min(14, p / 12);
  letrasNome.forEach((s, i) => {
    const o = Math.sin(p / 110 + i * 0.6);
    s.style.transform = `translateY(${(o * amp).toFixed(1)}px) rotate(${(o * amp * 0.2).toFixed(1)}deg)`;
  });
  nomeInner.style.transform = `translateX(${(Math.sin(p / 360) * 14).toFixed(1)}px)`;
}
function pedirQuadro() {
  if (!quadroPendente) { quadroPendente = true; requestAnimationFrame(animarNome); }
}
window.addEventListener("scroll", () => { posAlvo = Math.max(0, window.scrollY); pedirQuadro(); }, { passive: true });
/* Se a página não rolar dentro do quadro, a roda do mouse também move as letras. */
window.addEventListener("wheel", (e) => { posAlvo = Math.max(0, posAlvo + e.deltaY * 0.5); pedirQuadro(); }, { passive: true });
animarNome();

/* ---------- Carrossel ---------- */
const slidesEl = $("slides");
const totalSlides = slidesEl.children.length;
const pontosEl = $("pontos-car");
let idxSlide = 0, timerSlide = null;

for (let i = 0; i < totalSlides; i++) {
  const b = document.createElement("button");
  b.type = "button";
  b.setAttribute("aria-label", `Ir para a imagem ${i + 1}`);
  b.addEventListener("click", () => { irSlide(i); reiniciarAuto(); });
  pontosEl.appendChild(b);
}
function irSlide(n) {
  idxSlide = (n + totalSlides) % totalSlides;
  slidesEl.style.transform = `translateX(${-idxSlide * 100}%)`;
  [...pontosEl.children].forEach((b, i) => b.setAttribute("aria-current", i === idxSlide ? "true" : "false"));
}
function iniciarAuto() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  pararAuto();
  timerSlide = setInterval(() => irSlide(idxSlide + 1), 4500);
}
function pararAuto() { if (timerSlide) { clearInterval(timerSlide); timerSlide = null; } }
function reiniciarAuto() { pararAuto(); iniciarAuto(); }
$("seta-ant").addEventListener("click", () => { irSlide(idxSlide - 1); reiniciarAuto(); });
$("seta-prox").addEventListener("click", () => { irSlide(idxSlide + 1); reiniciarAuto(); });
$("carrossel").addEventListener("mouseenter", pararAuto);
$("carrossel").addEventListener("mouseleave", iniciarAuto);
$("carrossel").addEventListener("focusin", pararAuto);
$("carrossel").addEventListener("focusout", iniciarAuto);
let toqueX = null;
$("carrossel").addEventListener("touchstart", (e) => { toqueX = e.touches[0].clientX; }, { passive: true });
$("carrossel").addEventListener("touchend", (e) => {
  if (toqueX === null) return;
  const dx = e.changedTouches[0].clientX - toqueX;
  if (Math.abs(dx) > 40) { irSlide(idxSlide + (dx < 0 ? 1 : -1)); reiniciarAuto(); }
  toqueX = null;
});
irSlide(0);
iniciarAuto();

/* ---------- Paletas de cores (harmonias no estilo do Adobe Color) ---------- */
const PALETAS = [
  { id: "neon", nome: "Neon", longo: "Neon, harmonia quadrada", c: {
    "bg": "#0b0a24", "panel": "#14123b", "panel-2": "#1c1952", "line": "#322d78", "ink": "#f2f0ff", "ink-soft": "#aaa6dc",
    "kw": "#ff4fa3", "fn": "#3fd9ff", "str": "#ffc15a", "num": "#a98bff",
    "ok": "#5ef2a6", "ok-bg": "#0f3a2c", "bad": "#ff7a86", "bad-bg": "#4a1827", "warn": "#ff9d4d", "deep": "#07061a", "muted": "#7b78b8" } },
  { id: "analoga", nome: "Análoga", longo: "Análoga, azuis e verdes vizinhos", c: {
    "bg": "#06151e", "panel": "#0c2430", "panel-2": "#123344", "line": "#1d4a63", "ink": "#e6f6ff", "ink-soft": "#8dbad0",
    "kw": "#2ec4ff", "fn": "#34f0c8", "str": "#8fd3ff", "num": "#7a95ff",
    "ok": "#4be3a0", "ok-bg": "#0c3a33", "bad": "#ff8c8c", "bad-bg": "#3d1a24", "warn": "#ffd166", "deep": "#040f16", "muted": "#5f90a8" } },
  { id: "complementar", nome: "Complementar", longo: "Complementar, laranja e azul", c: {
    "bg": "#0b1020", "panel": "#121a33", "panel-2": "#1a2548", "line": "#2b3b6b", "ink": "#f3f5ff", "ink-soft": "#a2aed6",
    "kw": "#ff8a3d", "fn": "#3d9bff", "str": "#ffd08a", "num": "#86b6ff",
    "ok": "#5fe0a0", "ok-bg": "#0f3a2c", "bad": "#ff6b7a", "bad-bg": "#4a1827", "warn": "#ffb347", "deep": "#070b18", "muted": "#6f7db0" } },
  { id: "triade", nome: "Tríade", longo: "Tríade, roxo, verde e laranja", c: {
    "bg": "#110c1d", "panel": "#1b1430", "panel-2": "#261c44", "line": "#3b2d66", "ink": "#f6f0ff", "ink-soft": "#b3a6d6",
    "kw": "#b56bff", "fn": "#6bf08a", "str": "#ffa94d", "num": "#d9aaff",
    "ok": "#6bf08a", "ok-bg": "#123a22", "bad": "#ff6b8a", "bad-bg": "#4a1830", "warn": "#ffa94d", "deep": "#0a0713", "muted": "#8573b8" } },
  { id: "mono", nome: "Mono", longo: "Monocromática, tons de esmeralda", c: {
    "bg": "#05130e", "panel": "#0b2118", "panel-2": "#123227", "line": "#1d5240", "ink": "#e8fff4", "ink-soft": "#8cc6ab",
    "kw": "#2fe08f", "fn": "#8af3c3", "str": "#cdfbe5", "num": "#55c995",
    "ok": "#7af5c4", "ok-bg": "#0f3a2a", "bad": "#ff7f7f", "bad-bg": "#3d1a1a", "warn": "#e6e27a", "deep": "#030d09", "muted": "#5aa085" } }
];
const paletasEl = $("paletas");
const botoesPaleta = PALETAS.map((p) => {
  const b = document.createElement("button");
  b.type = "button";
  b.className = "paleta-btn";
  b.setAttribute("aria-label", "Paleta " + p.longo);
  b.title = p.longo;
  const pts = document.createElement("span");
  pts.className = "pts";
  ["kw", "fn", "str", "num"].forEach((k) => {
    const d = document.createElement("span");
    d.className = "pt";
    d.style.background = p.c[k];
    pts.appendChild(d);
  });
  const t = document.createElement("span");
  t.textContent = p.nome;
  b.append(pts, t);
  b.addEventListener("click", () => aplicarPaleta(p.id, true));
  paletasEl.appendChild(b);
  return b;
});
function aplicarPaleta(id, salvar) {
  const idx = Math.max(0, PALETAS.findIndex((p) => p.id === id));
  const p = PALETAS[idx];
  const estilo = document.documentElement.style;
  Object.entries(p.c).forEach(([k, v]) => estilo.setProperty("--" + k, v));
  botoesPaleta.forEach((b, i) => b.setAttribute("aria-pressed", String(i === idx)));
  if (salvar) { try { localStorage.setItem("guriprovs-paleta", p.id); } catch (e) {} }
}
let paletaSalva = null;
try { paletaSalva = localStorage.getItem("guriprovs-paleta"); } catch (e) {}
aplicarPaleta(paletaSalva || "neon", false);

/* ---------- Sons (gerados no navegador, sem arquivos) ---------- */
let audioCtx = null;
let somLigado = true;
function ctxAudio() {
  if (!audioCtx) {
    const C = window.AudioContext || window.webkitAudioContext;
    if (!C) return null;
    audioCtx = new C();
  }
  if (audioCtx.state === "suspended") audioCtx.resume();
  return audioCtx;
}
function tom(freq, ini, dur, tipo, vol, fim) {
  const c = ctxAudio();
  if (!c) return;
  const t = c.currentTime + ini;
  const o = c.createOscillator();
  const g = c.createGain();
  o.type = tipo;
  o.frequency.setValueAtTime(freq, t);
  if (fim) o.frequency.exponentialRampToValueAtTime(fim, t + dur);
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(vol, t + 0.02);
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  o.connect(g);
  g.connect(c.destination);
  o.start(t);
  o.stop(t + dur + 0.05);
}
const SONS = {
  // acerto: três notas subindo, curtas e alegres
  acerto() { tom(659, 0, 0.12, "triangle", 0.2); tom(880, 0.1, 0.12, "triangle", 0.2); tom(1175, 0.2, 0.25, "triangle", 0.22); },
  // erro: buzina grave descendo
  erro() { tom(220, 0, 0.2, "sawtooth", 0.13, 160); tom(150, 0.17, 0.32, "sawtooth", 0.13, 90); },
  // aprovado: fanfarra em arpejo com acorde final
  aprovado() {
    [523, 659, 784, 1047].forEach((f, i) => tom(f, i * 0.14, 0.25, "triangle", 0.2));
    tom(1047, 0.6, 0.8, "triangle", 0.2);
    tom(784, 0.6, 0.8, "sine", 0.12);
    tom(1319, 0.6, 0.8, "sine", 0.1);
  },
  // reprovado: notas descendo, como um trombone triste
  reprovado() {
    tom(392, 0, 0.36, "sawtooth", 0.11, 370);
    tom(370, 0.4, 0.36, "sawtooth", 0.11, 349);
    tom(349, 0.8, 0.36, "sawtooth", 0.11, 330);
    tom(294, 1.2, 0.95, "sawtooth", 0.11, 215);
  }
};
function tocar(nome) {
  if (!somLigado) return;
  try { SONS[nome](); } catch (e) {}
}
$("btn-som").addEventListener("click", () => {
  somLigado = !somLigado;
  const b = $("btn-som");
  b.textContent = somLigado ? "Som ligado" : "Som desligado";
  b.setAttribute("aria-pressed", String(somLigado));
  if (somLigado) tom(880, 0, 0.1, "triangle", 0.15);
});

/* ---------- Reações: acerto, erro, resultado, estrelas, contato ---------- */
function explodir(alvo, cores, n, queda) {
  if (semMovimento) return;
  for (let i = 0; i < n; i++) {
    const p = document.createElement("span");
    p.className = "particula";
    const ang = Math.random() * Math.PI * 2;
    const dist = 30 + Math.random() * 60;
    const dx = queda ? (Math.random() - 0.5) * 70 : Math.cos(ang) * dist * 1.6;
    const dy = queda ? 30 + Math.random() * 60 : Math.sin(ang) * dist;
    p.style.setProperty("--dx", dx.toFixed(0) + "px");
    p.style.setProperty("--dy", dy.toFixed(0) + "px");
    p.style.setProperty("--r", (Math.random() * 540 - 270).toFixed(0) + "deg");
    p.style.background = cores[i % cores.length];
    alvo.appendChild(p);
    setTimeout(() => p.remove(), 1000);
  }
}

function efeitoResposta(acertou) {
  const opcoes = document.querySelectorAll(".alt");
  const marcada = opcoes[selecionada];
  const certa = opcoes[prova[atual].correta];
  const pts = $("pontos");
  tocar(acertou ? "acerto" : "erro");
  if (acertou) {
    marcada.classList.add("anim-certa");
    explodir(marcada, ["var(--kw)", "var(--fn)", "var(--str)", "var(--ok)", "var(--num)"], 18, false);
    pts.classList.remove("bump");
    void pts.offsetWidth;
    pts.classList.add("bump");
  } else {
    marcada.classList.add("anim-errada");
    explodir(marcada, ["var(--bad)", "var(--muted)"], 10, true);
    certa.classList.add("revela");
    const card = $("tela-prova");
    card.classList.remove("balanca");
    void card.offsetWidth;
    card.classList.add("balanca");
  }
}

const SEQ_CONCEITO = ["F", "D", "C", "B", "A"];
function conceito(n, total) {
  const p = n / total;
  if (p >= 0.9) return 4;  // A
  if (p >= 0.8) return 3;  // B
  if (p >= 0.65) return 2; // C
  if (p >= 0.5) return 1;  // D
  return 0;                // F
}
let tokenLetra = 0;
function animarLetra(alvo) {
  const el = $("letra-valor"), box = $("nota-letra");
  const meu = ++tokenLetra;
  let i = semMovimento ? alvo : 0;
  const passo = () => {
    if (meu !== tokenLetra) return;
    const l = SEQ_CONCEITO[i];
    el.textContent = l;
    box.className = "nota-letra g-" + l;
    box.setAttribute("aria-label", "Conceito " + l);
    el.classList.remove("troca");
    void el.offsetWidth;
    el.classList.add("troca");
    if (i < alvo) { i++; setTimeout(passo, 300); }
  };
  passo();
}

function chuvaConfete(aprovado) {
  const box = $("confete");
  box.innerHTML = "";
  if (semMovimento) return;
  const h = $("tela-resultado").clientHeight + 40;
  const cores = aprovado ? ["var(--kw)", "var(--fn)", "var(--str)", "var(--num)", "var(--ok)"] : ["var(--bad)", "var(--muted)"];
  const n = aprovado ? 70 : 24;
  for (let i = 0; i < n; i++) {
    const p = document.createElement("span");
    p.className = "pc" + (aprovado ? "" : " gota");
    p.style.left = (Math.random() * 100).toFixed(1) + "%";
    p.style.background = cores[i % cores.length];
    p.style.setProperty("--h", h + "px");
    p.style.setProperty("--rot", (Math.random() * 720 - 360).toFixed(0) + "deg");
    p.style.setProperty("--dx", ((Math.random() - 0.5) * 160).toFixed(0) + "px");
    p.style.animationDuration = ((aprovado ? 2 : 2.6) + Math.random() * 1.8).toFixed(2) + "s";
    p.style.animationDelay = (Math.random() * 0.9).toFixed(2) + "s";
    box.appendChild(p);
  }
  setTimeout(() => { box.innerHTML = ""; }, 6500);
}

/* Estrelas de feedback (a escolha fica só nesta página) */
const estrelasEls = [...document.querySelectorAll(".estrela")];
let avaliacao = 0;
function pintarEstrelas(n) { estrelasEls.forEach((b, i) => b.classList.toggle("cheia", i < n)); }
function escolherEstrelas(n) {
  avaliacao = n;
  pintarEstrelas(n);
  estrelasEls.forEach((b, i) => {
    b.setAttribute("aria-checked", String(i + 1 === n));
    b.classList.remove("pulo-estrela");
    if (i < n) {
      void b.offsetWidth;
      b.style.animationDelay = (i * 0.07).toFixed(2) + "s";
      b.classList.add("pulo-estrela");
    }
  });
  $("av-msg").textContent = n === 1 ? "Obrigado! Você deu 1 estrela." : `Obrigado! Você deu ${n} estrelas.`;
}
function zerarEstrelas() {
  avaliacao = 0;
  pintarEstrelas(0);
  estrelasEls.forEach((b) => { b.setAttribute("aria-checked", "false"); b.classList.remove("pulo-estrela"); });
  $("av-msg").textContent = "";
}
estrelasEls.forEach((b, i) => {
  b.addEventListener("mouseenter", () => pintarEstrelas(i + 1));
  b.addEventListener("focus", () => pintarEstrelas(i + 1));
  b.addEventListener("blur", () => pintarEstrelas(avaliacao));
  b.addEventListener("click", () => escolherEstrelas(i + 1));
});
$("estrelas").addEventListener("mouseleave", () => pintarEstrelas(avaliacao));

/* Copiar o e-mail de contato */
$("btn-copiar").addEventListener("click", async () => {
  const msg = $("copiar-msg");
  try {
    await navigator.clipboard.writeText("guriprovs@outlook.com");
    msg.textContent = "E-mail copiado.";
  } catch (e) {
    const r = document.createRange();
    r.selectNodeContents($("email-txt"));
    const sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(r);
    msg.textContent = "Selecionei o e-mail. Copie com Ctrl+C ou toque e segure.";
  }
});

/* ---------- Prova ---------- */
function mostrarTela(id) {
  document.querySelectorAll(".tela").forEach((t) => { t.hidden = t.id !== id; });
  $("como-funciona").hidden = id !== "tela-inicio";
  if (id === "tela-inicio") window.scrollTo({ top: 0 });
  else $(id).scrollIntoView({ block: "start" });
}

function iniciar() {
  ctxAudio(); // libera o áudio com o clique do aluno
  const campo = $("nome");
  nomeAluno = campo.value.trim();
  if (!nomeAluno) {
    campo.classList.add("invalido");
    campo.focus();
    setTimeout(() => campo.classList.remove("invalido"), 400);
    return;
  }
  atual = 0; nota = 0; respostas = [];
  mostrarTela("tela-prova");
  mostrarQuestao();
}

function mostrarQuestao() {
  const q = prova[atual];
  selecionada = null;
  confirmada = false;
  $("contador").textContent = `Questão ${atual + 1} de ${prova.length}`;
  $("pontos").textContent = `Pontos: ${nota}`;
  $("barra-preenchida").style.width = `${(atual / prova.length) * 100}%`;
  $("enunciado").textContent = q.enunciado;
  const fig = FIGURAS_QUESTOES[atual];
  $("fig-img").src = fig.src;
  $("fig-img").alt = fig.alt;
  $("feedback").textContent = "";
  $("feedback").className = "feedback";
  const btn = $("btn-proxima");
  btn.disabled = true;
  btn.textContent = "Confirmar resposta";

  const area = $("alternativas");
  area.innerHTML = "";
  q.alternativas.forEach((texto, i) => {
    const b = document.createElement("button");
    b.type = "button";
    b.className = "alt";
    const l = document.createElement("span");
    l.className = "letra";
    l.textContent = LETRAS[i];
    const t = document.createElement("span");
    t.className = "txt";
    t.textContent = texto;
    b.append(l, t);
    b.addEventListener("click", () => selecionar(i));
    area.appendChild(b);
  });
}

function selecionar(i) {
  if (confirmada) return;
  selecionada = i;
  document.querySelectorAll(".alt").forEach((b, idx) => b.classList.toggle("selecionada", idx === i));
  $("btn-proxima").disabled = false;
}

function avancar() {
  if (!confirmada) {
    confirmada = true;
    const q = prova[atual];
    const acertou = selecionada === q.correta;
    respostas.push(selecionada);
    if (acertou) nota++;
    document.querySelectorAll(".alt").forEach((b, idx) => {
      b.disabled = true;
      b.classList.remove("selecionada");
      if (idx === q.correta) b.classList.add("certa");
      else if (idx === selecionada) b.classList.add("errada");
    });
    const fb = $("feedback");
    fb.textContent = acertou ? "Acertou! +1 ponto" : `Errou. Resposta correta: ${LETRAS[q.correta]}`;
    fb.className = "feedback " + (acertou ? "ok" : "erro") + " pop";
    $("pontos").textContent = `Pontos: ${nota}`;
    efeitoResposta(acertou);
    $("btn-proxima").textContent = atual === prova.length - 1 ? "Ver resultado" : "Próxima questão";
  } else if (atual < prova.length - 1) {
    atual++;
    mostrarQuestao();
  } else {
    mostrarResultado();
  }
}

function mostrarResultado() {
  $("barra-preenchida").style.width = "100%";
  const aprovado = nota >= NOTA_APROVACAO;
  $("res-nome").textContent = nomeAluno;
  const selo = $("selo");
  selo.textContent = aprovado ? "APROVADO" : "REPROVADO";
  selo.className = "selo " + (aprovado ? "aprovado" : "reprovado");
  $("res-nota").textContent = `Nota final: ${nota} de ${prova.length}`;
  $("res-msg").textContent = aprovado
    ? "Parabéns! Você atingiu a nota mínima."
    : `Você precisava de ${NOTA_APROVACAO} pontos. Tente novamente.`;

  const rev = $("revisao");
  rev.innerHTML = "";
  prova.forEach((q, i) => {
    const acertou = respostas[i] === q.correta;
    const div = document.createElement("div");
    div.className = "item-revisao " + (acertou ? "certa" : "errada");
    const t = document.createElement("strong");
    t.textContent = `Questão ${i + 1}: ${acertou ? "acertou (+1)" : "errou (0)"}`;
    const s = document.createElement("small");
    s.textContent = `Você marcou ${LETRAS[respostas[i]]} · gabarito ${LETRAS[q.correta]}`;
    div.append(t, document.createElement("br"), s);
    rev.appendChild(div);
  });
  zerarEstrelas();
  $("copiar-msg").textContent = "";
  mostrarTela("tela-resultado");
  animarLetra(conceito(nota, prova.length));
  chuvaConfete(aprovado);
  tocar(aprovado ? "aprovado" : "reprovado");
}

function refazer() {
  $("nome").value = nomeAluno;
  mostrarTela("tela-inicio");
}

$("btn-iniciar").addEventListener("click", iniciar);
$("nome").addEventListener("keydown", (e) => { if (e.key === "Enter") iniciar(); });
$("btn-proxima").addEventListener("click", avancar);
$("btn-refazer").addEventListener("click", refazer);

espalharTexto();
