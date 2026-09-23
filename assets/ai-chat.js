(() => {
  const root = document.querySelector('.ai-chat-teaser');
  if (!root) return;
  const launch = root.querySelector('.ai-chat-launch');
  const panel = root.querySelector('.ai-chat-panel');
  const close = root.querySelector('.ai-chat-close');
  const form = root.querySelector('.ai-chat-composer');
  const input = root.querySelector('textarea');
  const send = root.querySelector('.ai-chat-send');
  const messages = root.querySelector('.ai-chat-messages');
  function setOpen(open, restoreFocus = false) {
    panel.hidden = !open;
    launch.setAttribute('aria-expanded', String(open));
    launch.setAttribute('aria-label', open ? 'Close AI chat' : 'Open AI chat');
    if (open) {
      (matchMedia('(pointer: fine)').matches ? input : close).focus({preventScroll:true});
      messages.scrollTop = messages.scrollHeight;
    }
    else if (restoreFocus) launch.focus({preventScroll:true});
    else if (panel.contains(document.activeElement)) document.activeElement.blur();
  }
  function resizeInput() {
    send.disabled = !input.value.trim();
    input.style.height = '44px';
    input.style.height = Math.min(96, input.scrollHeight + 2) + 'px';
  }
  function addMessage(text, author) {
    const message = document.createElement('div');
    message.className = 'ai-chat-message ai-chat-message--' + author;
    const label = document.createElement('span');
    label.className = 'ai-chat-author';
    label.textContent = author === 'user' ? 'You' : 'AI';
    const content = document.createElement('p');
    content.textContent = text;
    message.append(label, content);
    messages.append(message);
    messages.scrollTop = messages.scrollHeight;
  }
  input.addEventListener('input', resizeInput);
  input.addEventListener('keydown', event => {
    if (event.key === 'Enter' && !event.shiftKey && !event.isComposing) {
      event.preventDefault();
      form.requestSubmit();
    }
  });
  form.addEventListener('submit', event => {
    event.preventDefault();
    const text = input.value.trim();
    if (!text) return;
    addMessage(text, 'user');
    input.value = '';
    resizeInput();
    addMessage('Coming soon — AI replies aren’t available yet.', 'assistant');
    input.focus({preventScroll:true});
  });
  // Keep chat scrolling and text editing independent of the opening film.
  ['wheel', 'touchstart', 'touchmove', 'touchend'].forEach(type => {
    root.addEventListener(type, event => event.stopPropagation(), {passive:true});
  });
  root.addEventListener('keydown', event => {
    if (event.key !== 'Escape') event.stopPropagation();
  });
  if (window.visualViewport) {
    function fitViewport() {
      const viewport = window.visualViewport;
      const offset = Math.max(0, innerHeight - viewport.height - viewport.offsetTop);
      root.style.setProperty('--ai-viewport-height', viewport.height + 'px');
      root.style.setProperty('--ai-keyboard-offset', offset + 'px');
      root.classList.toggle('is-keyboard', offset > 100);
    }
    visualViewport.addEventListener('resize', fitViewport);
    visualViewport.addEventListener('scroll', fitViewport);
    fitViewport();
  }
  launch.addEventListener('click', () => setOpen(panel.hidden));
  close.addEventListener('click', () => setOpen(false, true));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && !panel.hidden) {
      event.preventDefault();
      setOpen(false, true);
    }
  });
  document.addEventListener('pointerdown', event => {
    if (!panel.hidden && !root.contains(event.target)) setOpen(false);
  });
  new MutationObserver(() => {
    if (document.documentElement.matches('.menu-open,.f3-modal-open,.intro-full,.intro-short')) setOpen(false);
  }).observe(document.documentElement, {attributes:true, attributeFilter:['class']});
})();
