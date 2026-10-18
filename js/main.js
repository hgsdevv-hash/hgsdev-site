// HGS Dev — interações da página
const WHATSAPP = '5519989003251';
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
const finePointer = matchMedia('(hover: hover) and (pointer: fine)').matches;

/* ---------- menu do celular ---------- */
const menuBtn = document.querySelector('.menu-btn');
menuBtn.addEventListener('click', () => {
  const open = document.body.classList.toggle('menu-open');
  menuBtn.setAttribute('aria-expanded', open);
});
document.querySelectorAll('.nav a').forEach(a => a.addEventListener('click', () => {
  document.body.classList.remove('menu-open');
  menuBtn.setAttribute('aria-expanded', false);
}));

/* ---------- cursor de mãozinha ---------- */
if (finePointer && !reduced) {
  const hand = document.createElement('div');
  hand.className = 'hand';
  hand.setAttribute('aria-hidden', 'true');
  hand.innerHTML = `
    <svg viewBox="0 0 64 64">
      <defs>
        <linearGradient id="hg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="#ffffff"/><stop offset="1" stop-color="#dcd8d0"/>
        </linearGradient>
      </defs>
      <path class="hand-shape" d="M22 4c3 0 5 2 5 5v17c1-1 2.5-1.6 4-1.6 2.6 0 4.6 1.6 5 4 1-.8 2.3-1.2 3.6-1.2 2.6 0 4.6 1.8 4.9 4.3 1-.6 2-.9 3.1-.9 3 0 5.4 2.4 5.4 5.4v9c0 10-7 18-17 18h-4c-6 0-10.6-2.7-13.6-7.6L8.3 41c-1.3-2.2-.7-5 1.4-6.4 2-1.3 4.6-.9 6.2.9L17 37V9c0-3 2-5 5-5Z" fill="url(#hg)" stroke="#161616" stroke-width="2.6" stroke-linejoin="round"/>
      <path d="M31 31v9M39.6 32v8M47.6 35v6" stroke="#161616" stroke-width="2.2" stroke-linecap="round" opacity=".55"/>
      <path d="M20.5 9.5v12" stroke="#fff" stroke-width="2.4" stroke-linecap="round" opacity=".7"/>
    </svg>`;
  document.body.appendChild(hand);
  document.body.classList.add('has-hand');
  let x = -100, y = -100, cx = -100, cy = -100, tilt = 0;
  addEventListener('pointermove', e => { x = e.clientX; y = e.clientY; hand.classList.remove('gone'); });
  document.addEventListener('pointerleave', () => hand.classList.add('gone'));
  addEventListener('pointerdown', () => hand.classList.add('press'));
  addEventListener('pointerup', () => hand.classList.remove('press'));
  document.addEventListener('pointerover', e => {
    hand.classList.toggle('point', !!e.target.closest('a, button, label, summary, .project, .sign-board, input'));
  });
  (function loop() {
    const dx = x - cx;
    cx += dx * .35; cy += (y - cy) * .35;
    tilt += (Math.max(-18, Math.min(18, dx * .6)) - tilt) * .15; // balança ao mover
    hand.style.transform = `translate(${cx}px, ${cy}px) rotate(${tilt}deg)`;
    requestAnimationFrame(loop);
  })();
}

/* ---------- tema claro / escuro ---------- */
const root = document.documentElement;
const themeBtn = document.getElementById('theme-toggle');
const themeTip = document.getElementById('theme-tip');
const themeMeta = document.querySelector('meta[name="theme-color"]');
const store = {
  get: k => { try { return localStorage.getItem(k); } catch (e) { return null; } },
  set: (k, v) => { try { localStorage.setItem(k, v); } catch (e) { /* sem armazenamento */ } },
};
function paintTheme() {
  const dark = root.dataset.theme !== 'light';
  themeBtn.querySelector('.tt-label').textContent = dark ? 'Tema claro' : 'Tema escuro';
  themeBtn.setAttribute('aria-label', dark ? 'Mudar para o tema claro' : 'Mudar para o tema escuro');
  themeMeta.setAttribute('content', dark ? '#0f0f11' : '#e9e6e0');
}
themeBtn.addEventListener('click', () => {
  root.dataset.theme = root.dataset.theme === 'light' ? 'dark' : 'light';
  store.set('hgs-tip', '1');
  themeTip.hidden = true;
  paintTheme();
});
paintTheme();
// na primeira visita, um balão aponta para o botão de tema
if (!store.get('hgs-tip')) {
  setTimeout(() => { themeTip.hidden = false; }, 1600);
  setTimeout(() => { themeTip.hidden = true; store.set('hgs-tip', '1'); }, 9000);
}

/* ---------- letreiro com holofote ---------- */
const hero = document.getElementById('hero');
const hint = document.getElementById('sign-hint');
const chars = [];
hero.querySelectorAll('.sign-line').forEach(line => {
  const text = line.textContent;
  line.textContent = '';
  for (const c of text) {
    const s = document.createElement('span');
    s.className = c === ' ' ? 'ch sp' : 'ch';
    s.textContent = c;
    s.dataset.ch = c;
    s.setAttribute('aria-hidden', 'true');
    line.appendChild(s);
    if (c !== ' ') chars.push({ el: s, lit: 0, cx: 0, cy: 0, broken: false });
  }
});
// duas letras "com defeito" que tremem mais quando o letreiro está piscando sozinho
for (let i = 0; i < 2; i++) chars[Math.floor(Math.random() * chars.length)].broken = true;

let heroBox = hero.getBoundingClientRect();
function measure() {
  heroBox = hero.getBoundingClientRect();
  chars.forEach(c => {
    const r = c.el.getBoundingClientRect();
    c.cx = r.left + r.width / 2; c.cy = r.top + r.height / 2;
  });
}
addEventListener('resize', measure);
addEventListener('scroll', measure, { passive: true });
addEventListener('load', measure);
document.fonts && document.fonts.ready.then(measure);

if (!finePointer) hint.lastChild.textContent = 'arraste o dedo: ele é o holofote';
let inside = false, tx = 0, ty = 0, sx = 0, sy = 0, lastMove = -9999, spotR = 0;
const aim = (x, y) => {
  if (!inside) { sx = x; sy = y; }
  inside = true; tx = x; ty = y; lastMove = performance.now();
  hero.classList.add('lit');
};
hero.addEventListener('pointermove', e => aim(e.clientX, e.clientY));
hero.addEventListener('pointerdown', e => { measure(); aim(e.clientX, e.clientY); });
hero.addEventListener('pointerenter', measure);
hero.addEventListener('pointerleave', () => { inside = false; });

// padrão de "pisca-pisca" de letreiro tentando ligar
const BLINK = [1, 1, 1, 1, 0, 1, 0, .3, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, .2, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, .5, 1, 1, 1, 1];
let idle = 1;
function stageLoop(now) {
  const active = inside || now - lastMove < 900;
  if (!active) hero.classList.remove('lit');
  idle += ((active ? 0 : 1) - idle) * .04;

  // o holofote tem "peso": segue o mouse com atraso
  sx += (tx - sx) * .12; sy += (ty - sy) * .12;
  const radius = Math.max(140, Math.min(300, innerWidth * .18));
  spotR += ((active ? radius : 0) - spotR) * .1;
  hero.style.setProperty('--mx', (sx - heroBox.left) + 'px');
  hero.style.setProperty('--my', (sy - heroBox.top) + 'px');
  hero.style.setProperty('--spot-r', spotR.toFixed(1) + 'px');

  const step = BLINK[Math.floor(now / 110) % BLINK.length];
  for (const c of chars) {
    const d = Math.hypot(c.cx - sx, c.cy - sy);
    const beam = spotR > 1 ? Math.max(0, 1 - d / (spotR * 1.15)) : 0;
    c.lit += (Math.min(1, beam * 1.6) - c.lit) * .25;
    let blink = step;
    if (c.broken) blink *= Math.random() > .25 ? 1 : .1;
    c.el.style.setProperty('--on', Math.max(c.lit, idle * blink).toFixed(3));
  }
  requestAnimationFrame(stageLoop);
}
if (reduced) chars.forEach(c => c.el.style.setProperty('--on', 1));
else { measure(); requestAnimationFrame(stageLoop); }

/* ---------- revelar ao rolar ---------- */
const io = new IntersectionObserver(entries => {
  entries.forEach(en => {
    if (!en.isIntersecting) return;
    en.target.classList.add('in');
    if (en.target.classList.contains('sphere')) fill(en.target);
    io.unobserve(en.target);
  });
}, { threshold: .15 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

function fill(s) {
  const value = +s.dataset.value;
  const num = s.querySelector('b');
  // topo da onda em 100% = vazia; deixa uma folga para a onda aparecer
  s.querySelector('.water i').style.top = (100 - value + 10) + '%';
  if (reduced) { num.textContent = value; return; }
  const t0 = performance.now();
  (function tick(now) {
    const p = Math.min(1, (now - t0) / 1800);
    num.textContent = Math.round(value * (1 - Math.pow(1 - p, 3)));
    if (p < 1) requestAnimationFrame(tick);
  })(t0);
}

/* ---------- processo: barra de progresso ---------- */
const steps = [...document.querySelectorAll('.step')];
const meter = document.getElementById('meter');
function onScrollProcess() {
  const mid = innerHeight * .75;
  let active = -1;
  steps.forEach((s, i) => { if (s.getBoundingClientRect().top < mid) active = i; });
  steps.forEach((s, i) => s.classList.toggle('active', i <= active));
  meter.style.width = ((active + 1) / steps.length * 100) + '%';
}

/* ---------- barra do topo some ao descer e volta ao subir ---------- */
const bar = document.querySelector('.taskbar');
let lastY = scrollY;
function onScrollBar() {
  const y = scrollY;
  const dy = y - lastY;
  if (Math.abs(dy) < 6) return; // ignora tremidinhas do scroll
  const keep = y < 120 || document.body.classList.contains('menu-open') || !themeTip.hidden;
  bar.classList.toggle('bar-hidden', dy > 0 && !keep);
  lastY = y;
}
bar.addEventListener('focusin', () => bar.classList.remove('bar-hidden'));

/* ---------- botão flutuante do WhatsApp ---------- */
const waFloat = document.querySelector('.wa-float');
addEventListener('scroll', () => {
  waFloat.classList.toggle('show', scrollY > innerHeight * .7);
  onScrollBar();
  onScrollProcess();
}, { passive: true });
onScrollProcess();

/* ---------- testar projeto aqui (modal) ---------- */
const modal = document.getElementById('modal');
const frame = document.getElementById('modal-frame');
const stage = modal.querySelector('.modal-stage');
const openLink = document.getElementById('modal-open');
let lastFocus = null;
document.querySelectorAll('.project .try').forEach(btn => btn.addEventListener('click', () => {
  const url = btn.closest('.project').dataset.url;
  lastFocus = btn;
  frame.src = url;
  openLink.href = url;
  modal.hidden = false;
  document.body.style.overflow = 'hidden';
  modal.querySelector('.modal-close').focus();
}));
function closeModal() {
  modal.hidden = true;
  frame.src = 'about:blank';
  document.body.style.overflow = '';
  lastFocus && lastFocus.focus();
}
modal.querySelector('.modal-close').addEventListener('click', closeModal);
modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });
addEventListener('keydown', e => { if (e.key === 'Escape' && !modal.hidden) closeModal(); });
modal.querySelectorAll('.device-toggle button').forEach(b => b.addEventListener('click', () => {
  modal.querySelectorAll('.device-toggle button').forEach(x => x.classList.toggle('on', x === b));
  stage.classList.toggle('mobile', b.dataset.device === 'mobile');
}));
if (matchMedia('(max-width: 760px)').matches) modal.querySelector('.device-toggle').hidden = true;

/* ---------- monte seu site ---------- */
const form = document.getElementById('builder');
const body = document.getElementById('pv-body');
const preview = document.getElementById('preview');
const urlEl = document.getElementById('pv-url');
const nameInput = document.getElementById('negocio');
const send = document.getElementById('send');

const TIPOS = {
  landing: { label: 'Landing page', secoes: ['Serviços', 'Depoimentos', 'Perguntas'], headline: ['Seu cliente', 'chega aqui'] },
  institucional: { label: 'Site institucional', secoes: ['Sobre', 'Serviços', 'Depoimentos', 'Mapa'], headline: ['Conheça a', 'nossa história'] },
  portfolio: { label: 'Portfólio', secoes: ['Sobre', 'Galeria', 'Agendamento'], headline: ['Meu trabalho', 'fala por mim'] },
};
const ESTILOS = { escuro: 'Escuro e marcante', claro: 'Claro e elegante', vivo: 'Colorido e divertido' };

const BLOCOS = {
  'Sobre': () => `<h4>Sobre</h4><div class="pv-lines"><span></span><span></span><span></span></div>`,
  'Serviços': () => `<h4>Serviços</h4><div class="pv-row"><span></span><span></span><span></span></div>`,
  'Galeria': () => `<h4>Galeria</h4><div class="pv-row tall"><span></span><span></span><span></span></div>`,
  'Depoimentos': () => `<h4>Depoimentos</h4><p class="pv-quote">"Atendimento rápido e o resultado ficou lindo."</p>`,
  'Perguntas': () => `<h4>Perguntas</h4><div class="pv-lines"><span></span><span></span></div>`,
  'Mapa': () => `<h4>Onde estamos</h4><div class="pv-map"></div>`,
  'Agendamento': () => `<h4>Agende um horário</h4><div class="pv-cal">${Array.from({ length: 14 }, (_, i) => `<span class="${[3, 9, 11].includes(i) ? 'on' : ''}"></span>`).join('')}</div>`,
};

const esc = s => s.replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);
const slug = s => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '').slice(0, 24);

function state() {
  const fd = new FormData(form);
  return { tipo: fd.get('tipo'), estilo: fd.get('estilo'), secoes: fd.getAll('secoes'), nome: nameInput.value.trim() };
}

let prev = [];
function render(animateAll) {
  const s = state();
  const t = TIPOS[s.tipo];
  const nome = s.nome || 'Seu negócio';
  preview.dataset.estilo = s.estilo;
  urlEl.textContent = (slug(s.nome) || 'seunegocio') + '.com.br';

  const order = Object.keys(BLOCOS).filter(k => s.secoes.includes(k));
  let html = `<div class="pv-nav">${esc(nome)}<i><b></b><b></b><b></b></i><em>CONTATO</em></div>
    <div class="pv-block pv-hero"${animateAll ? '' : ' style="animation:none"'}><strong>${t.headline[0]} <span>${t.headline[1]}</span></strong><p>${t.label} de ${esc(nome)}, feito sob medida.</p><span class="pv-btn">FALAR NO WHATSAPP</span></div>`;
  order.forEach((k, i) => {
    const isNew = animateAll || !prev.includes(k);
    html += `<div class="pv-block" style="${isNew ? `animation-delay:${animateAll ? i * 70 : 0}ms` : 'animation:none'}">${BLOCOS[k]()}</div>`;
  });
  html += `<span class="pv-wa">WHATSAPP</span>`;
  body.innerHTML = html;
  prev = order;

  const msg = [
    'Olá, Higor! Montei um rascunho no site da HGS Dev:',
    '',
    `Negócio: ${s.nome || '(ainda sem nome)'}`,
    `Tipo: ${t.label}`,
    `Seções: ${order.length ? order.join(', ') : 'quero ajuda para escolher'}`,
    `Estilo: ${ESTILOS[s.estilo]}`,
    '',
    'Pode me passar um orçamento?',
  ].join('\n');
  send.href = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`;
}

function applyTipoDefaults() {
  const def = TIPOS[state().tipo].secoes;
  form.querySelectorAll('input[name="secoes"]').forEach(cb => { cb.checked = def.includes(cb.value); });
}

form.addEventListener('change', e => {
  if (e.target.name === 'tipo') { applyTipoDefaults(); render(true); }
  else render(e.target.name === 'estilo');
});
nameInput.addEventListener('input', () => render(false));
applyTipoDefaults();
render(true);
