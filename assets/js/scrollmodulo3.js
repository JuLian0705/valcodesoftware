const feed = document.getElementById("feed");
const modulos = document.querySelectorAll(".modulo");
let index = 0;
let autoScrollTimer;

// Función para ir a un módulo específico
function scrollToModule(i) {
  feed.scrollTo({
    top: modulos[i].offsetTop,
    behavior: "smooth"
  });
}

// Inicia autoplay
function startAutoScroll() {
  autoScrollTimer = setInterval(() => {
    index = (index + 1) % modulos.length;
    scrollToModule(index);
  }, 7000); 
}

// Detectar scroll manual y pausar autoplay
feed.addEventListener("scroll", () => {
  clearInterval(autoScrollTimer);
  // Calcular módulo visible
  let closestIndex = Math.round(feed.scrollTop / window.innerHeight);
  index = closestIndex;
  // Reanudar después de 5s
  setTimeout(startAutoScroll, 5000);
});

startAutoScroll();