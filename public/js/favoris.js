import mots from '../mots.json' with { type: 'json' };

function getFavoris() {
    return JSON.parse(localStorage.getItem("favoris") || "[]");
}

function renderListe() {
    const favoris = getFavoris();
    const liste = document.getElementById("liste-favoris");
    liste.innerHTML = "";

    mots
        .filter(m => favoris.includes(m.Mot))
        .forEach(m => {
            const li = document.createElement("li");
            li.textContent = m.Mot;
            li.style.cursor = "pointer";
            li.addEventListener("click", () => {
                const motSlug = m.Mot.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
                window.location.href = `/mot/${motSlug}.html`;
            });
            liste.appendChild(li);
        });
}

function renderTop10() {
    const favoris = getFavoris();
    const compteur = {};

    favoris.forEach((mot) => {
        compteur[mot] = (compteur[mot] || 0) + 1;
    });

    const sorted = Object.entries(compteur)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 10);

    const ul = document.getElementById("top-favoris");
    ul.innerHTML = "";

    sorted.forEach(([mot, count]) => {
        const li = document.createElement("li");
        li.textContent = `${mot} (${count})`;
        li.style.cursor = "pointer";
        li.addEventListener("click", () => {
            const motSlug = mot.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
            window.location.href = `/mot/${motSlug}.html`;
        });
        ul.appendChild(li);
    });
}

// Navigation
document.getElementById("liste-btn").addEventListener("click", () => {
    window.location.href = "listeMots.html";
});
document.getElementById("aleatoire-btn").addEventListener("click", () => {
    window.location.href = "/mot/aleatoire";
});
document.getElementById("favoris-btn").addEventListener("click", () => {
    window.location.href = "favoris.html";
});

renderListe();
renderTop10();
