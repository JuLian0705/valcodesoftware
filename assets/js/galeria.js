  let currentSlide = 0;
  const slides = document.querySelector(".carousel-slides");
  const totalSlides = document.querySelectorAll(".slide").length;

  function moverDeslizar(direccion) {
    currentSlide = (currentSlide + direccion + totalSlides) % totalSlides;
    slides.style.transform = `translateX(-${currentSlide * 100}vw)`;
  }
  setInterval(() => {
    moverDeslizar(1);
  }, 5000);