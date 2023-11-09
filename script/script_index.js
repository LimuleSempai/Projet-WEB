document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.getElementById("hamburger");
    const nav_ul = document.getElementById("nav_ul");
    const progressBar = document.getElementById("progressBar");

    // Toggle hamburger et nav_ul
    hamburger.onclick = () => {
        hamburger.classList.toggle("open");
        nav_ul.classList.toggle("slide");
    };

    // Gérer la barre de progression
    window.onscroll = () => {
        const page = document.documentElement;
        let totalHeight = page.scrollHeight;
        let visibleHeight = page.clientHeight;
        let scrolling = page.scrollTop;
        let max = page.scrollHeight - page.clientHeight;
        progressBar.style.width = Math.floor(scrolling / max * 100) + "%";

        if (progressBar.style.width === "100%") {
        progressBar.style.backgroundColor = "gray";
        } else {
        progressBar.style.backgroundColor = "rgb(255, 255, 255)";
        }
    };
});

document.addEventListener('DOMContentLoaded', function() {
    const bouton = document.getElementById('changerCouleur');

    bouton.addEventListener('click', function() {
        const header = document.getElementById('header');
        const body = document.getElementById('body');
        header.style.backgroundColor = '#28a745';
        body.style.backgroundColor = '#28a745';
    });
});
