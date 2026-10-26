// HGS Dev — abertura, letreiro com holofote, cards de projetos, visualizador e monte seu site
(() => {
  const GH = 'https://hgsdevv-hash.github.io/';
  const reduz = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const mouse = matchMedia('(pointer: fine)').matches;

  // c = cor da marca do cliente (bolinha na barra da janela)
  // ordem: primeiro os sites com animação e interação próprias, depois os mais simples
  const PROJETOS = [
    { id: 'rei-das-antenas', nome: 'Rei das Antenas', tipo: 'Loja de antenas · Santa Bárbara d\'Oeste', url: 'https://oreidasantenas.com.br/', c: '#f2c230',
      txt: 'Um medidor de sinal anima a página, a nota do Google aparece logo no topo e o orçamento vai direto para o WhatsApp.',
      tags: ['Domínio próprio', 'Medidor animado', 'Orçamento no WhatsApp'] },
    { id: 'cabibras', nome: 'Cabibrás', tipo: 'Caldeiraria e cabinas · Americana', url: GH + 'cabibras/', c: '#d7262e',
      txt: 'A abertura monta uma escavadeira de Lego, o seletor troca o tipo de cabina e a fabricação vai da chapa à pintura conforme você rola.',
      tags: ['Abertura animada', 'Seletor interativo'] },
    { id: 'rodo-alves', nome: 'Rodo Alves', tipo: 'Transporte de grãos · Rondônia', url: GH + 'rodo-alves/', c: '#d98a2b',
      txt: 'Um caminhão atravessa a estrada de terra e buzina quando você clica, e a rota da lavoura ao destino avança com a página.',
      tags: ['Desenho animado', 'Cotação no WhatsApp'] },
    { id: 'limp-brilhe', nome: 'Limp Brilhe', tipo: 'Limpeza e pós-obra', url: GH + 'limp-brilhe/', c: '#7fc8e8',
      txt: 'A página abre com um rodinho limpando a tela, a janela do topo desembaça com o dedo e os trabalhos aparecem em vídeo.',
      tags: ['Abertura animada', 'Vídeos dos trabalhos'] },
    { id: 'debora', nome: 'Débora Baldin', tipo: 'Tricologista · Americana', url: GH + 'debora-baldin/', c: '#7d2e4f',
      txt: 'Uma borboleta se desenha na abertura. Os tratamentos são explicados sem complicação e a avaliação é marcada pelo WhatsApp.',
      tags: ['Abertura animada', 'Agendamento'] },
    { id: 'veneza', nome: 'Veneza Estética Car', tipo: 'Estética automotiva · Sumaré', url: GH + 'veneza-estetica-car/', c: '#c9a227',
      txt: 'O título sai do fosco ao espelho quando você passa o mouse. Antes e depois dos carros e agendamento pelo WhatsApp.',
      tags: ['Efeito de polimento', 'Antes e depois'] },
    { id: 'meu-mundo-cristao', nome: 'Meu Mundo Cristão', tipo: 'Gravatas e camisas · Todo o Brasil', url: GH + 'meu-mundo-cristao/', c: '#1f3c88',
      txt: 'Vitrine das gravatas com os detalhes do tecido e o pedido feito pelo WhatsApp, com envio para todo o Brasil.',
      tags: ['Vitrine', 'Pedido no WhatsApp'] },
    { id: 'matheus', nome: 'Matheus Silva', tipo: 'Personal trainer · Americana', url: GH + 'matheus-silva/', c: '#e8452c',
      txt: 'Letras fortes, vídeos dos treinos e o contato indo direto para o Instagram dele.',
      tags: ['Vídeos de treino', 'Instagram'] },
    { id: 'fagner', nome: 'Fagner Orlandini', tipo: 'Personal atípico', url: GH + 'fagner-orlandini/', c: '#2b6fd6',
      txt: 'Educação física para autismo, síndrome de Down e TDAH, explicada com carinho para as famílias.',
      tags: ['Público especial', 'WhatsApp'] },
    { id: 'barbaros', nome: 'Barbaros', tipo: 'Barbearia · Americana', url: GH + 'barbaros/', c: '#c9a24a',
      txt: '"Corte de respeito" em letras enormes, galeria dos cortes e horário marcado pelo WhatsApp.',
      tags: ['Galeria de cortes', 'Agendamento'] },
    { id: 'blanco', nome: 'Blanco & Co.', tipo: 'Barbearia · Jardim Mollon', url: GH + 'blanco-co/', c: '#e9e4da',
      txt: 'Uma barbearia como pausa para cuidar de si: clima sóbrio, serviços com preço e agendamento pelo AppBarber.',
      tags: ['Tabela de serviços', 'Agendamento'] },
    { id: 'at-doceria', nome: 'AT Doceria', tipo: 'Doceria · Santa Bárbara d\'Oeste', url: GH + 'at-doceria/', c: '#e0337a',
      txt: 'Tortas, bolos e docinhos feitos à mão, com cardápio para rolar e a encomenda saindo pronta no WhatsApp.',
      tags: ['Cardápio', 'Encomendas'] },
    { id: 'stefany', nome: 'Stefany Alves', tipo: 'Blog pessoal', url: GH + 'stefany-alves/', c: '#b2724f',
      txt: 'Um diário de fé, rotina e lugares para comer, com textos organizados por tema e cara de revista.',
      tags: ['Blog', 'Textos por tema'] }
  ];

  const lista = document.getElementById('lista');
  lista.innerHTML = PROJETOS.map((p, i) => `
    <li class="card reveal">
      <div class="card-bar"><i style="background:${p.c}"></i><span>${p.nome}</span><a href="${p.url}" target="_blank" rel="noopener">${p.url.replace('https://', '').replace(/\/$/, '')}</a></div>
      <div class="card-shot"><img src="img/proj/${p.id}-full.jpg" alt="Página do site ${p.nome}" loading="lazy"></div>
      <div class="card-body">
        <div>
          <p class="card-kind">${p.tipo}</p>
          <h3>${p.nome}</h3>
          <p>${p.txt}</p>
        </div>
        <div>
          <ul class="card-tags">${p.tags.map(t => `<li>${t}</li>`).join('')}</ul>
          <div class="card-links">
            <button type="button" class="btn btn-money btn-sm" data-testar="${i}">Testar aqui</button>
            <a class="btn btn-ghost btn-sm" href="${p.url}" target="_blank" rel="noopener">Ver ao vivo ↗</a>
          </div>
        </div>
      </div>
    </li>`).join('');

  // visualizador
  const viewer = document.getElementById('viewer');
  const frame = document.getElementById('viewer-iframe');
  lista.addEventListener('click', e => {
    const b = e.target.closest('[data-testar]');
    if (!b) return;
    const p = PROJETOS[b.dataset.testar];
    document.getElementById('viewer-title').textContent = p.nome;
    document.getElementById('viewer-open').href = p.url;
    frame.src = p.url;
    viewer.showModal();
  });
  viewer.querySelector('.viewer-close').addEventListener('click', () => viewer.close());
  viewer.addEventListener('close', () => { frame.src = 'about:blank'; });
  viewer.addEventListener('click', e => { if (e.target === viewer) viewer.close(); });
  viewer.querySelectorAll('[data-mode]').forEach(b => b.addEventListener('click', () => {
    viewer.querySelectorAll('[data-mode]').forEach(x => x.classList.toggle('is-on', x === b));
    viewer.classList.toggle('is-cel', b.dataset.mode === 'cel');
  }));

  // revelar na rolagem
  const io = new IntersectionObserver(es => es.forEach(en => {
    if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); }
  }), { threshold: .12 });
  document.querySelectorAll('.reveal, .news li, .steps li').forEach(el => { el.classList.add('reveal'); io.observe(el); });

  /* ---------- letreiro com holofote ---------- */
  const hero = document.getElementById('topo');
  const hint = document.getElementById('sign-hint');
  const letras = [];
  hero.querySelectorAll('.sign-line').forEach(linha => {
    const texto = linha.textContent;
    linha.textContent = '';
    for (const c of texto) {
      const s = document.createElement('span');
      s.className = c === ' ' ? 'ch sp' : 'ch';
      s.textContent = c;
      s.dataset.ch = c;
      s.setAttribute('aria-hidden', 'true');
      linha.appendChild(s);
      if (c !== ' ') letras.push({ el: s, lit: 0, cx: 0, cy: 0, falha: false });
    }
  });
  // duas letras "com defeito" que tremem mais quando o letreiro pisca sozinho
  for (let i = 0; i < 2; i++) letras[Math.floor(Math.random() * letras.length)].falha = true;

  let caixa = hero.getBoundingClientRect();
  const medir = () => {
    caixa = hero.getBoundingClientRect();
    letras.forEach(l => { const r = l.el.getBoundingClientRect(); l.cx = r.left + r.width / 2; l.cy = r.top + r.height / 2; });
  };
  addEventListener('resize', medir);
  addEventListener('scroll', medir, { passive: true });
  addEventListener('load', medir);
  document.fonts && document.fonts.ready.then(medir);

  if (!mouse) hint.lastChild.textContent = 'arraste o dedo: ele é o holofote';
  let dentro = false, tx = 0, ty = 0, sx = 0, sy = 0, ultimo = -9999, raio = 0;
  const mirar = (x, y) => {
    if (!dentro) { sx = x; sy = y; }
    dentro = true; tx = x; ty = y; ultimo = performance.now();
    hero.classList.add('lit');
  };
  hero.addEventListener('pointermove', e => mirar(e.clientX, e.clientY));
  hero.addEventListener('pointerdown', e => { medir(); mirar(e.clientX, e.clientY); });
  hero.addEventListener('pointerenter', medir);
  hero.addEventListener('pointerleave', () => { dentro = false; });

  // padrão de pisca-pisca de letreiro tentando ligar
  const PISCA = [1, 1, 1, 1, 0, 1, 0, .3, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, .2, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, .5, 1, 1, 1, 1];
  let parado = 1;
  const quadro = (agora) => {
    const ativo = dentro || agora - ultimo < 900;
    if (!ativo) hero.classList.remove('lit');
    parado += ((ativo ? 0 : 1) - parado) * .04;
    // o holofote tem "peso": segue o mouse com atraso
    sx += (tx - sx) * .12; sy += (ty - sy) * .12;
    raio += ((ativo ? Math.max(140, Math.min(300, innerWidth * .18)) : 0) - raio) * .1;
    hero.style.setProperty('--mx', (sx - caixa.left) + 'px');
    hero.style.setProperty('--my', (sy - caixa.top) + 'px');
    hero.style.setProperty('--spot-r', raio.toFixed(1) + 'px');
    const passo = PISCA[Math.floor(agora / 110) % PISCA.length];
    for (const l of letras) {
      const d = Math.hypot(l.cx - sx, l.cy - sy);
      const luz = raio > 1 ? Math.max(0, 1 - d / (raio * 1.15)) : 0;
      l.lit += (Math.min(1, luz * 1.6) - l.lit) * .25;
      let p = passo;
      if (l.falha) p *= Math.random() > .25 ? 1 : .1;
      l.el.style.setProperty('--on', Math.max(l.lit, parado * p).toFixed(3));
    }
    requestAnimationFrame(quadro);
  };
  if (reduz) letras.forEach(l => l.el.style.setProperty('--on', 1));
  else { medir(); requestAnimationFrame(quadro); }

  /* ---------- faixa de números: contam de 0 até o valor quando aparecem ---------- */
  const numeros = document.querySelectorAll('.numbers dd');
  const contar = (el) => {
    const alvo = +el.dataset.to, t0 = performance.now();
    const passo = (t) => {
      const k = Math.min(1, (t - t0) / 1400);
      el.textContent = Math.round(alvo * (1 - Math.pow(1 - k, 3)));
      if (k < 1) requestAnimationFrame(passo);
    };
    requestAnimationFrame(passo);
  };
  if (!reduz) {
    numeros.forEach(el => { el.textContent = '0'; });
    const ioN = new IntersectionObserver(es => es.forEach(en => {
      if (en.isIntersecting) { contar(en.target); ioN.unobserve(en.target); }
    }), { threshold: .6 });
    numeros.forEach(el => ioN.observe(el));
  }

  /* ---------- pickup de dinheiro: clicou, aparece +67$ e o maço volta ---------- */
  const pickup = document.querySelector('.pickup');
  pickup.addEventListener('click', () => {
    if (pickup.classList.contains('is-taken')) return;
    const r = pickup.getBoundingClientRect();
    const plus = document.createElement('span');
    plus.className = 'plus';
    plus.textContent = '+67$';
    plus.style.left = `${r.left - 22}px`;
    plus.style.top = `${r.top - 18}px`;
    document.body.appendChild(plus);
    setTimeout(() => plus.remove(), 1100);
    pickup.classList.add('is-taken');
    setTimeout(() => pickup.classList.remove('is-taken'), 1500);
  });

  /* ---------- monte seu site: rascunho ao vivo que vai pronto para o WhatsApp ---------- */
  const form = document.getElementById('builder');
  const pvBody = document.getElementById('pv-body');
  const preview = document.getElementById('preview');
  const pvUrl = document.getElementById('pv-url');
  const nomeInput = document.getElementById('negocio');
  const enviar = document.getElementById('send');
  const TIPOS = {
    landing: { label: 'Landing page', secoes: ['Serviços', 'Depoimentos', 'Perguntas'], titulo: ['Seu cliente', 'chega aqui'] },
    institucional: { label: 'Site institucional', secoes: ['Sobre', 'Serviços', 'Depoimentos', 'Mapa'], titulo: ['Conheça a', 'nossa história'] },
    portfolio: { label: 'Portfólio', secoes: ['Sobre', 'Galeria', 'Agendamento'], titulo: ['Meu trabalho', 'fala por mim'] }
  };
  const ESTILOS = { escuro: 'Escuro e marcante', claro: 'Claro e elegante', vivo: 'Colorido e divertido' };
  const BLOCOS = {
    'Sobre': () => `<p class="pv-h">Sobre</p><div class="pv-lines"><span></span><span></span><span></span></div>`,
    'Serviços': () => `<p class="pv-h">Serviços</p><div class="pv-row"><span></span><span></span><span></span></div>`,
    'Galeria': () => `<p class="pv-h">Galeria</p><div class="pv-row tall"><span></span><span></span><span></span></div>`,
    'Depoimentos': () => `<p class="pv-h">Depoimentos</p><p class="pv-quote">"Atendimento rápido e o resultado ficou lindo."</p>`,
    'Perguntas': () => `<p class="pv-h">Perguntas</p><div class="pv-lines"><span></span><span></span></div>`,
    'Mapa': () => `<p class="pv-h">Onde estamos</p><div class="pv-map"></div>`,
    'Agendamento': () => `<p class="pv-h">Agende um horário</p><div class="pv-cal">${Array.from({ length: 14 }, (_, i) => `<span class="${[3, 9, 11].includes(i) ? 'on' : ''}"></span>`).join('')}</div>`
  };
  const esc = t => t.replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);
  const slug = t => t.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '').slice(0, 24);
  const estado = () => {
    const fd = new FormData(form);
    return { tipo: fd.get('tipo'), estilo: fd.get('estilo'), secoes: fd.getAll('secoes'), nome: nomeInput.value.trim() };
  };
  let antes = [];
  const montar = (tudo) => {
    const e = estado();
    const t = TIPOS[e.tipo];
    const nome = e.nome || 'Seu negócio';
    preview.dataset.estilo = e.estilo;
    pvUrl.textContent = (slug(e.nome) || 'seunegocio') + '.com.br';
    const ordem = Object.keys(BLOCOS).filter(k => e.secoes.includes(k));
    let html = `<div class="pv-nav">${esc(nome)}<i><b></b><b></b><b></b></i><em>CONTATO</em></div>
      <div class="pv-block pv-hero"${tudo ? '' : ' style="animation:none"'}><strong>${t.titulo[0]} <span>${t.titulo[1]}</span></strong><p>${t.label} de ${esc(nome)}, feito sob medida.</p><span class="pv-btn">FALAR NO WHATSAPP</span></div>`;
    ordem.forEach((k, i) => {
      const novo = tudo || !antes.includes(k);
      html += `<div class="pv-block" style="${novo ? `animation-delay:${tudo ? i * 70 : 0}ms` : 'animation:none'}">${BLOCOS[k]()}</div>`;
    });
    html += `<span class="pv-wa">WHATSAPP</span>`;
    pvBody.innerHTML = html;
    antes = ordem;
    const msg = [
      'Olá! Montei um rascunho no site da HGS Dev:',
      '',
      `Negócio: ${e.nome || '(ainda sem nome)'}`,
      `Tipo: ${t.label}`,
      `Seções: ${ordem.length ? ordem.join(', ') : 'quero ajuda para escolher'}`,
      `Estilo: ${ESTILOS[e.estilo]}`,
      '',
      'Pode me passar um orçamento?'
    ].join('\n');
    enviar.href = `https://wa.me/5519989003251?text=${encodeURIComponent(msg)}`;
  };
  const padroes = () => {
    const def = TIPOS[estado().tipo].secoes;
    form.querySelectorAll('input[name="secoes"]').forEach(cb => { cb.checked = def.includes(cb.value); });
  };
  form.addEventListener('change', e => {
    if (e.target.name === 'tipo') { padroes(); montar(true); }
    else montar(e.target.name === 'estilo');
  });
  nomeInput.addEventListener('input', () => montar(false));
  padroes();
  montar(true);

  // abertura: só na primeira visita, curta, e pulada por quem prefere menos movimento
  const jaViu = document.documentElement.classList.contains('no-intro');
  try { localStorage.setItem('hgs-intro', '1'); } catch (e) { /* segue sem lembrar */ }
  setTimeout(() => { document.body.classList.replace('is-loading', 'is-ready'); medir(); }, reduz || jaViu ? 0 : 1200);
})();
