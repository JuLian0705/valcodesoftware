window.addEventListener("load", () =>{
    const loader = document.getElementById("loader");
    document.body.classList.remove("hidden");


    setTimeout(() => {
        loader.style.opacity = "0";
        loader.style.transition = "opacity 0.5s ease";
        setTimeout(() => loader.style.display = "none", 500);
    }, 3000);
})