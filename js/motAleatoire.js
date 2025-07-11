const container = document.getElementById('container');
const nextButton = document.getElementById('next-button');

async function getMotAleatoire() {
    const response = await fetch('/api/random');
    if (!response.ok) return null;
    return response.json();
}

function slugify(text) {
    return text
        .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
        .replace(/\s+/g, '-')
        .replace(/[^\w-]/g, '')
        .toLowerCase();
}

async function afficherMot() {
    container.innerHTML = '';

    const mot = await getMotAleatoire();
    if (!mot) return;

    history.pushState({}, '', `/${slugify(mot.Mot)}.html`);

    const card = document.createElement('div');
    card.className = 'word-card';

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

    card.append(title, def, ex, type, diff);
    container.appendChild(card);
}

nextButton.addEventListener('click', afficherMot);

afficherMot();

document.getElementById("aleatoire-btn").addEventListener("click", function () {
    window.location.href = "motAleatoire.html";
});

document.getElementById("liste-btn").addEventListener("click", function () {
    window.location.href = "listeMots.html";
});

