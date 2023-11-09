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

    bouton.addEventListener('click', function() {
        const body = document.getElementById('body');
        const header = document.getElementById('header');
        const footer = document.getElementById('footer');

        body.style.backgroundColor = '#9a9a9a';
        header.style.backgroundColor = '#4e4e4e';
        footer.style.backgroundColor = '#4e4e4e';
        
    });
});
