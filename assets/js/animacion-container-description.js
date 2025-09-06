const box = document.querySelectorAll('.box');

window.addEventListener('scroll', () => {
    const triggerBottom = window.innerHeight  * 0.8;

    boxes.forEach(element => {
        const boxTop = element.getBoundingClientRect().top;

        if (boxTop < triggerBottom) {
            box.classList.add('animate__fadeInLeft');
            box.style.setProperty('--animate-delay', `${index * 0.2}s`); // efecto escalonado
        }
    });
});
