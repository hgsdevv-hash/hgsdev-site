// HGS Dev — aviso de privacidade (todas as páginas)
// O site não usa cookies de rastreamento; o aviso só informa e some depois do "Entendi".
(() => {
  const CHAVE = 'hgs-aviso';
  try { if (localStorage.getItem(CHAVE)) return; } catch (e) { /* sem armazenamento: mostra o aviso */ }

  const aviso = document.createElement('section');
  aviso.className = 'aviso glass';
  aviso.setAttribute('aria-label', 'Aviso de privacidade');
  aviso.innerHTML = `
    <p>Este site <strong>não usa cookies de rastreamento nem de publicidade</strong>. Só guardo no seu navegador o necessário para ele funcionar. <a href="privacidade.html#cookies">Ver a política de privacidade</a>.</p>
    <button type="button" class="btn btn-aqua btn-sm">Entendi</button>`;
  aviso.querySelector('button').addEventListener('click', () => {
    try { localStorage.setItem(CHAVE, '1'); } catch (e) { /* segue sem lembrar */ }
    aviso.remove();
  });
  document.body.appendChild(aviso);
})();
