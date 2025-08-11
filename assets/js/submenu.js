
  document.addEventListener("DOMContentLoaded", function () {
    const submenuToggles = document.querySelectorAll(".has-submenu > a");

    submenuToggles.forEach(toggle => {
      toggle.addEventListener("click", function (e) {
        e.preventDefault();
        const parent = this.parentElement;
        parent.classList.toggle("active");
      });
    });
  });