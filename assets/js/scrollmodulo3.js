document.addEventListener('DOMContentLoaded', () => {
  const feed = document.getElementById('feed');
  const modulos = Array.from(document.querySelectorAll('.modulo'));
  const formulario = document.getElementById('formulario-contacto');

  if (!feed || modulos.length === 0) {
    console.warn('[feed-scroller] falta #feed o no hay .modulo');
    return;
  }

  // configurable
  const AUTO_INTERVAL = 7000;         // tiempo entre módulos (ms)
  const RESTART_AFTER_FORM = 5000;    // reanudar tras salir del formulario (ms)
  const RESTART_AFTER_MANUAL = 9000;  // reanudar tras interacción manual (ms)
  const SCROLL_END_DEBOUNCE = 150;    // detección fin de scroll (ms)

  let index = 0;
  let autoScrollTimer = null;
  let restartTimer = null;
  let scrollEndTimer = null;
  let isUserInteracting = false;

  // calcula la posición top relativa al contenedor 'feed' de forma robusta
  function getModuleTop(i) {
    const rect = modulos[i].getBoundingClientRect();
    const feedRect = feed.getBoundingClientRect();
    return rect.top - feedRect.top + feed.scrollTop;
  }

  function scrollToModule(i, smooth = true) {
    i = Math.max(0, Math.min(i, modulos.length - 1));
    index = i;
    const top = getModuleTop(i);
    feed.scrollTo({ top, behavior: smooth ? 'smooth' : 'auto' });
  }

  function startAutoScroll(interval = AUTO_INTERVAL) {
    if (autoScrollTimer || modulos.length <= 1) return;
    autoScrollTimer = setInterval(() => {
      index = (index + 1) % modulos.length;
      scrollToModule(index, true);
    }, interval);
  }

  function stopAutoScroll() {
    if (!autoScrollTimer) return;
    clearInterval(autoScrollTimer);
    autoScrollTimer = null;
  }

  function scheduleRestart(delay = RESTART_AFTER_MANUAL) {
    clearTimeout(restartTimer);
    if (isUserInteracting) return; // no reanudar si el usuario sigue interactuando
    restartTimer = setTimeout(() => {
      if (!isUserInteracting) startAutoScroll();
    }, delay);
  }

  // IntersectionObserver: mantiene 'index' sincronizado con el módulo visible
  const io = new IntersectionObserver((entries) => {
    // elegir el entry con mayor intersectionRatio
    let best = null;
    for (const e of entries) {
      if (!best || e.intersectionRatio > best.intersectionRatio) best = e;
    }
    if (best && best.isIntersecting) {
      const newIndex = modulos.indexOf(best.target);
      if (newIndex !== -1) index = newIndex;
    }
  }, { root: feed, threshold: [0.25, 0.5, 0.75, 1] });

  modulos.forEach(m => io.observe(m));

  // Manejo de scroll dentro del feed (detecta inicio/fin de interacción)
  feed.addEventListener('scroll', () => {
    if (!isUserInteracting) {
      isUserInteracting = true;
      stopAutoScroll();
      clearTimeout(restartTimer);
    }

    clearTimeout(scrollEndTimer);
    scrollEndTimer = setTimeout(() => {
      isUserInteracting = false;
      scheduleRestart(RESTART_AFTER_MANUAL);
    }, SCROLL_END_DEBOUNCE);
  }, { passive: true });

  // Si el usuario toca/agarra con el ratón, pausamos y programamos reanudación
  ['pointerdown', 'touchstart', 'wheel'].forEach(evt =>
    feed.addEventListener(evt, () => {
      isUserInteracting = true;
      stopAutoScroll();
      clearTimeout(restartTimer);
      scheduleRestart(RESTART_AFTER_MANUAL);
    }, { passive: true })
  );

  // Interacciones globales (teclas, clicks fuera del feed) — evitamos false positives
  window.addEventListener('keydown', (e) => {
    // si el foco está dentro del formulario, ya lo cubrimos con focusin
    if (formulario && formulario.contains(document.activeElement)) return;
    isUserInteracting = true;
    stopAutoScroll();
    clearTimeout(restartTimer);
    scheduleRestart(RESTART_AFTER_MANUAL);
  }, { passive: true });

  // Pausar mientras el usuario escribe en el formulario
  if (formulario) {
    formulario.addEventListener('focusin', () => {
      isUserInteracting = true;
      stopAutoScroll();
      clearTimeout(restartTimer);
    }, true);

    formulario.addEventListener('focusout', () => {
      isUserInteracting = false;
      scheduleRestart(RESTART_AFTER_FORM);
    }, true);
  }

  // Detener autoplay si la pestaña se oculta (mejora rendimiento)
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) stopAutoScroll();
    else scheduleRestart(2000);
  });

  // inicio
  startAutoScroll();

  // útil para debug desde consola: window._feedScroller.start(), .stop(), .goTo(n)
  window._feedScroller = {
    start: startAutoScroll,
    stop: stopAutoScroll,
    goTo: (n) => scrollToModule(n, true)
  };
});
