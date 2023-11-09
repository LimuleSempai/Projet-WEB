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
        let scrolling = page.scrollTop;
        let max = page.scrollHeight - page.clientHeight;
        progressBar.style.width = Math.floor(scrolling / max * 100) + "%";

        if (progressBar.style.width === "100%") {
        progressBar.style.backgroundColor = "gray";
        } else {
        progressBar.style.backgroundColor = "#ffffff";
        }
    };
});

document.addEventListener('DOMContentLoaded', function() {
    const bouton = document.getElementById('changerCouleur');

    // Stocker les couleurs d'origine
    const couleursOriginales = {
        body: '#ffffff',
        header: '#d2d2d2',
        footer: '#d2d2d2'
    };

    let couleursChanger = false;

    bouton.addEventListener('click', function() {
        const body = document.getElementById('body');
        const header = document.getElementById('header');
        const footer = document.getElementById('footer');

        // Si les couleurs ont déjà été changées, rétablir les couleurs d'origine
        if (couleursChanger) {
            body.style.backgroundColor = couleursOriginales.body;
            header.style.backgroundColor = couleursOriginales.header;
            footer.style.backgroundColor = couleursOriginales.footer;
            couleursChanger = false;
        } else {
            // Changer les couleurs à de nouveaux états
            body.style.backgroundColor = '#9a9a9a'; // Nouvelle couleur pour le body
            header.style.backgroundColor = '#4e4e4e'; // Nouvelle couleur pour le header
            footer.style.backgroundColor = '#4e4e4e'; // Nouvelle couleur pour le footer
            couleursChanger = true;
        }
    });
});

