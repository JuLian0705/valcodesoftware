   document.addEventListener("DOMContentLoaded", () => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate");
        } else {
          entry.target.classList.remove("animate");
        }
      });
    }, { threshold: 0.03 });

    const targets = document.querySelectorAll(".container-description");
    targets.forEach(target => observer.observe(target));
  });