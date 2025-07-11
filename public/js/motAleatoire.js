import mots from '../mots.json' with { type: 'json' };

const container = document.getElementById('container');
const nextButton = document.getElementById('next-button');

function getMotAleatoire() {
    const randomIndex = Math.floor(Math.random() * mots.length);
    return mots[randomIndex];
}

function afficherMot() {
    container.innerHTML = '';

    const mot = getMotAleatoire();
    if (!mot) return;

    const favoris = JSON.parse(localStorage.getItem("favoris") || "[]");
    const stats = JSON.parse(localStorage.getItem("favoris_stats") || "{}");

    const card = document.createElement('div');
    card.className = 'word-card';

    const coeur = document.createElement('button');
    coeur.textContent = favoris.includes(mot.Mot) ? '❤️' : '🤍';
    coeur.style.fontSize = '1.5rem';
    coeur.style.border = 'none';
    coeur.style.background = 'none';
    coeur.style.cursor = 'pointer';
    coeur.style.float = 'right';

    coeur.addEventListener('click', () => {
        const isFavori = favoris.includes(mot.Mot);
        if (isFavori) {
            favoris.splice(favoris.indexOf(mot.Mot), 1);
        } else {
            favoris.push(mot.Mot);
            stats[mot.Mot] = (stats[mot.Mot] || 0) + 1;
        }
        localStorage.setItem("favoris", JSON.stringify(favoris));
        localStorage.setItem("favoris_stats", JSON.stringify(stats));
        coeur.textContent = isFavori ? '🤍' : '❤️';
    });

    const title = document.createElement('h2');
    title.textContent = mot.Mot.charAt(0).toUpperCase() + mot.Mot.slice(1);

    const def = document.createElement('p');
    def.innerHTML = `<strong>Définition :</strong> ${mot.Définition}`;

    const ex = document.createElement('p');
    ex.innerHTML = `<strong>Exemple :</strong> ${mot.Exemple}`;

    const type = document.createElement('span');
    type.className = 'tag';
    type.textContent = mot.Type;

    const diff = document.createElement('span');
    diff.className = 'tag';
    diff.textContent = `Difficulté : ${mot.Difficulté}`;

    card.append(coeur, title, def, ex, type, diff);
    container.appendChild(card);
}

nextButton.addEventListener('click', () => {
    window.location.href = "/mot/aleatoire";
});

document.getElementById("aleatoire-btn").addEventListener("click", function () {
    window.location.href = "/mot/aleatoire";
});

document.getElementById("liste-btn").addEventListener("click", function () {
    window.location.href = "listeMots.html";
});

document.getElementById("favoris-btn").addEventListener("click", function () {
    window.location.href = "favoris.html";
});

afficherMot();
