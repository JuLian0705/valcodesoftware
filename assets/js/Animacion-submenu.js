//animacion del submenu
document.querySelectorAll('.has-submenu > a').forEach(toggle => {
  toggle.addEventListener('click', function (e) {
    e.preventDefault();
    const submenu = this.nextElementSibling;

    if (submenu.style.display === 'block') {
      submenu.classList.remove('animate__animated', 'animate__fadeInDown');
      submenu.style.display = 'none';
    } else {
      submenu.style.display = 'block';
      submenu.classList.add('animate__animated', 'animate__fadeInDown');
    }
  });
});