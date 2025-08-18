 document.addEventListener('DOMContentLoaded', ()=> {
    const cards = document.querySelectorAll('.card-informacion');
    const modal = document.getElementById('modal');
    const modalText = document.getElementById('modal-text');
    const closeBtn = modal.querySelector('.close');

    // Asegurarnos de que el modal sea hijo directo de <body>
    if (modal.parentElement !== document.body) {
      document.body.appendChild(modal);
    }

    let savedScrollY = 0;

    function openModal(text) {
      modalText.textContent = text ?? '';
      modal.classList.add('open');
      modal.setAttribute('aria-hidden', 'false');

      // Bloquear scroll sin que la página "salte":
      savedScrollY = window.scrollY || window.pageYOffset;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${savedScrollY}px`;
      document.body.style.left = '0';
      document.body.style.right = '0';

      // Llevar foco al botón cerrar (accesibilidad)
      closeBtn.focus();
    }

    function closeModal() {
      modal.classList.remove('open');
      modal.setAttribute('aria-hidden', 'true');

      // Restaurar scroll y posición original
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.left = '';
      document.body.style.right = '';
      window.scrollTo(0, savedScrollY);
    }

    // Abrir modal desde cada card (usa data-info)
    cards.forEach(card => {
      card.addEventListener('click', () => {
        const info = card.dataset.info || card.getAttribute('data-info') || '';
        openModal(info);
      });
    });

    // Cerrar con botón, clic fuera y Esc
    closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('open')) closeModal();
    });
  });