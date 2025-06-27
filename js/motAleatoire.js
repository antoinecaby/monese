import mots from '../mots.json' with { type: 'json' };

const container = document.getElementById('container');
const nextButton = document.getElementById('next-button');
const listeButton = document.getElementById('liste-btn');
const aleatoireButton = document.getElementById('aleatoire-btn');

function getMotAleatoire() {
    const randomIndex = Math.floor(Math.random() * mots.length);
    return mots[randomIndex];
}

function afficherMot() {
    document.body.classList.remove('liste-mode');
    container.innerHTML = '';
    nextButton.style.display = 'block';

    const mot = getMotAleatoire();
    if (!mot) return;

    container.appendChild(createMotCard(mot));
}

function afficherListeMots() {
    document.body.classList.add('liste-mode');
    container.innerHTML = '';
    nextButton.style.display = 'none';

    mots.forEach(mot => {
        const cardListMot = document.createElement('div');
        cardListMot.className = 'word-card-list';

        const title = document.createElement('h2');
        title.textContent = mot.Mot.charAt(0).toUpperCase() + mot.Mot.slice(1);
        title.style.margin = '0';

        cardListMot.appendChild(title);

        cardListMot.addEventListener('click', () => afficherPopupMot(mot));

        container.appendChild(cardListMot);
    });
}

function createMotCard(mot) {
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
    return card;
}

function afficherPopupMot(mot) {
    const overlay = document.createElement('div');
    overlay.className = 'popup-overlay';

    const popup = createMotCard(mot);
    popup.classList.add('popup-card');

    const closeBtn = document.createElement('button');
    closeBtn.textContent = '×';
    closeBtn.className = 'close-button';
    closeBtn.addEventListener('click', () => {
        document.body.removeChild(overlay);
    });

    popup.appendChild(closeBtn);
    overlay.appendChild(popup);
    document.body.appendChild(overlay);
}

nextButton.addEventListener('click', afficherMot);
listeButton.addEventListener('click', afficherListeMots);
aleatoireButton.addEventListener('click', afficherMot);

afficherMot();
