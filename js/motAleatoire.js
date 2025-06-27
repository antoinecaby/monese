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