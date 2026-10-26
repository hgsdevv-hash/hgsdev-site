// HGS Dev v2 — abertura, letreiro com holofote, pickup de dinheiro, cards de projetos e visualizador
(() => {
  const GH = 'https://hgsdevv-hash.github.io/';
  const reduz = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const mouse = matchMedia('(pointer: fine)').matches;

  // c = cor da marca do cliente (bolinha na barra da janela)
  const PROJETOS = [
    { id: 'rei-das-antenas', nome: 'Rei das Antenas', tipo: 'Loja de antenas · Santa Bárbara d\'Oeste', url: 'https://oreidasantenas.com.br/', c: '#f2c230',
      txt: 'Um medidor de sinal anima a página, a nota do Google aparece logo no topo e o orçamento vai direto para o WhatsApp.',
      tags: ['Domínio próprio', 'Avaliações do Google', 'Orçamento no WhatsApp'] },
    { id: 'veneza', nome: 'Veneza Estética Car', tipo: 'Estética automotiva · Sumaré', url: GH + 'veneza-estetica-car/', c: '#c9a227',
      txt: 'Polimento e vitrificação na casa do cliente, com antes e depois dos carros e o agendamento pelo WhatsApp.',
      tags: ['Antes e depois', 'Agendamento'] },
    { id: 'debora', nome: 'Débora Baldin', tipo: 'Tricologista · Americana', url: GH + 'debora-baldin/', c: '#7d2e4f',
      txt: 'Uma borboleta se desenha na abertura. Os tratamentos são explicados sem complicação e a avaliação é marcada pelo WhatsApp.',
      tags: ['Abertura animada', 'Agendamento'] },
    { id: 'barbaros', nome: 'Barbaros', tipo: 'Barbearia · Americana', url: GH + 'barbaros/', c: '#c9a24a',
      txt: '"Corte de respeito" em letras enormes, galeria dos cortes e horário marcado pelo WhatsApp.',
      tags: ['Galeria de cortes', 'Agendamento'] },
    { id: 'blanco', nome: 'Blanco & Co.', tipo: 'Barbearia · Jardim Mollon', url: GH + 'blanco-co/', c: '#e9e4da',
      txt: 'Uma barbearia como pausa para cuidar de si: clima sóbrio, serviços com preço e agendamento pelo AppBarber.',
      tags: ['Tabela de serviços', 'Agendamento'] },
    { id: 'meu-mundo-cristao', nome: 'Meu Mundo Cristão', tipo: 'Gravatas e camisas · Todo o Brasil', url: GH + 'meu-mundo-cristao/', c: '#1f3c88',
      txt: 'Vitrine das gravatas com os detalhes do tecido e o pedido feito pelo WhatsApp, com envio para todo o Brasil.',
      tags: ['Vitrine', 'Pedido no WhatsApp'] },
    { id: 'limp-brilhe', nome: 'Limp Brilhe', tipo: 'Limpeza e pós-obra', url: GH + 'limp-brilhe/', c: '#7fc8e8',
      txt: 'A página abre com um rodinho limpando a tela, a janela do topo desembaça com o dedo e os trabalhos aparecem em vídeo.',
      tags: ['Abertura animada', 'Vídeos dos trabalhos'] },
    { id: 'rodo-alves', nome: 'Rodo Alves', tipo: 'Transporte de grãos · Rondônia', url: GH + 'rodo-alves/', c: '#d98a2b',
      txt: 'Um caminhão atravessa a estrada de terra e buzina quando você clica, e a rota da lavoura ao destino avança com a página.',
      tags: ['Desenho animado', 'Cotação no WhatsApp'] }
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

  /* ---------- pistola 3D: cada peça é um bloco com 6 faces sombreadas ---------- */
  // [largura, altura, profundidade, x, y, giro em graus, cor, classe extra] — x/y são o centro da peça, cano para a direita
  const PECAS = [
    [50, 9, 8, 2, -8, 0, '#40454d', 'slide'],   // ferrolho
    [6, 4, 3, 24, -8, 0, '#16181b', 'muzzle'],  // boca do cano
    [3, 2.5, 3, 23, -13.5, 0, '#2a2d32'],       // massa de mira
    [4, 2.5, 5, -19, -13.5, 0, '#2a2d32'],      // alça de mira
    [32, 6, 7, -5, -0.5, 0, '#2b2e33'],         // armação
    [12, 21, 8, -15, 11, 14, '#26282c', 'grip'],// empunhadura
    [11, 2, 4, -1.5, 9, 0, '#1d1f22'],          // guarda-mato (fundo)
    [2, 6, 4, 4.5, 5.5, 0, '#1d1f22'],          // guarda-mato (frente)
    [2, 5, 2, -2.5, 4.5, 10, '#55595f']         // gatilho
  ];
  const gun = document.querySelector('.gun3d');
  PECAS.forEach(([w, h, d, x, y, rot, cor, extra]) => {
    const bloco = document.createElement('span');
    bloco.className = 'gun-part' + (extra ? ' ' + extra : '');
    bloco.style.cssText = `width:${w}px;height:${h}px;margin:${-h / 2}px 0 0 ${-w / 2}px;transform:translate3d(${x}px,${y}px,0) rotateZ(${rot}deg);--c:${cor}`;
    const faces = [
      ['fr', w, h, `translateZ(${d / 2}px)`],
      ['bk', w, h, `rotateY(180deg) translateZ(${d / 2}px)`],
      ['rt', d, h, `rotateY(90deg) translateZ(${w / 2}px)`],
      ['lt', d, h, `rotateY(-90deg) translateZ(${w / 2}px)`],
      ['tp', w, d, `rotateX(90deg) translateZ(${h / 2}px)`],
      ['bt', w, d, `rotateX(-90deg) translateZ(${h / 2}px)`]
    ];
    bloco.innerHTML = faces.map(([f, fw, fh, t]) =>
      `<i class="f ${f}" style="width:${fw}px;height:${fh}px;margin:${-fh / 2}px 0 0 ${-fw / 2}px;transform:${t}"></i>`).join('');
    gun.appendChild(bloco);
  });

  /* ---------- pickup de dinheiro: pega, soma no HUD e reaparece ---------- */
  const pickup = document.querySelector('.pickup');
  const hud = document.querySelector('.hud');
  const cash = document.getElementById('cash');
  let total = 0;
  const somar = (alvo) => {
    const ini = total, t0 = performance.now();
    const passo = (t) => {
      const k = Math.min(1, (t - t0) / 600);
      cash.textContent = String(Math.round(ini + (alvo - ini) * k)).padStart(8, '0');
      if (k < 1) requestAnimationFrame(passo);
    };
    requestAnimationFrame(passo);
    total = alvo;
  };
  pickup.addEventListener('click', () => {
    if (pickup.classList.contains('is-taken')) return;
    const valor = [500, 1000, 2500, 5000][Math.floor(Math.random() * 4)];
    const plus = document.createElement('span');
    plus.className = 'plus';
    plus.textContent = `+R$${valor}`;
    const r = pickup.getBoundingClientRect();
    plus.style.left = `${r.left - 30}px`;
    plus.style.top = `${r.top - 10}px`;
    document.body.appendChild(plus);
    setTimeout(() => plus.remove(), 1000);
    pickup.classList.add('is-taken');
    hud.classList.add('is-on', 'is-bump');
    somar(total + valor);
    setTimeout(() => hud.classList.remove('is-bump'), 300);
    // depois do dinheiro, aparece uma arminha girando no lugar, e então o dinheiro volta
    setTimeout(() => pickup.classList.add('is-gun'), 450);
    setTimeout(() => pickup.classList.remove('is-gun'), 2600);
    setTimeout(() => pickup.classList.remove('is-taken'), 2900);
  });

  // abertura: só na primeira visita, curta, e pulada por quem prefere menos movimento
  const jaViu = document.documentElement.classList.contains('no-intro');
  try { localStorage.setItem('hgs-intro', '1'); } catch (e) { /* segue sem lembrar */ }
  setTimeout(() => { document.body.classList.replace('is-loading', 'is-ready'); medir(); }, reduz || jaViu ? 0 : 1200);
})();
