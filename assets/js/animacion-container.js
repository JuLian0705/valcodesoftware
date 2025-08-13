   document.addEventListener("DOMContentLoaded", () => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate");
        } else {
          entry.target.classList.remove("animate");
        }
      });
    },{ threshold: 0.05 }); 

    const targets = document.querySelectorAll(".container");
    targets.forEach(target => observer.observe(target));
  });