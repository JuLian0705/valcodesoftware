//animacion del menu movil
  const checkbox = document.getElementById("checkbox");
  const panel = document.querySelector(".mobile-menu-panel");

  checkbox.addEventListener("change", function () {
    if (checkbox.checked) {
      panel.classList.remove("animate__fadeOutRight");
      panel.classList.add("animate__fadeInRight");
    } else {
      panel.classList.remove("animate__fadeInRight");
      panel.classList.add("animate__fadeOutRight");
    }
  });