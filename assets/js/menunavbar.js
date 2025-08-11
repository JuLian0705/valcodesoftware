document.addEventListener('DOMContentLoaded', function () {
    const navbar = document.querySelector('.navbar');
    const logo = document.getElementById('mainLogo');

    window.addEventListener('scroll', function () {
      if (window.scrollY > 20) {
        navbar.classList.add('scrolled');
        logo.src = 'assets/img/valcode_logo_all_white.png'; // logo blanco al hacer scroll
      } else {
        navbar.classList.remove('scrolled');
        logo.src = 'assets/img/77C07D01-793E-4B81-A4EB-FD4199FDB35E-removebg-preview.png'; // logo original
      }
    });
  });