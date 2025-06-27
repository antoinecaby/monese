import mots from '../mots.json' with { type: 'json' };

// Navigation
const urlOrigine = window.location.pathname;
document.getElementById("aleatoire-btn").addEventListener("click", () => {
  window.location.href = "motAleatoire.html";
});
document.getElementById("liste-btn").addEventListener("click", () => {
  window.location.href = "listeMots.html";
});

// DOM principal
const liste = document.getElementById("liste-mots");
const popup = document.getElementById("popup");
const closeBtn = document.getElementById("close-popup");

// Contenu de la pop-up
const titre = document.getElementById("mot-titre");
const definition = document.getElementById("mot-definition");
const exemple = document.getElementById("mot-exemple");
const type = document.getElementById("mot-type");
const difficulte = document.getElementById("mot-difficulte");

// Utilitaires
function slugify(texte) {
  return texte
      .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
      .replace(/\s+/g, "-")
      .replace(/[^\w-]/g, "")
      .toLowerCase();
}

// Actions
function ouvrirPopup(mot) {
  titre.textContent = mot.Mot;
  definition.textContent = mot.Définition;
  exemple.textContent = mot.Exemple;
  type.textContent = mot.Type;
  difficulte.textContent = mot.Difficulté;
  popup.classList.remove("hidden");

  const newUrl = `/${slugify(mot.Mot)}.html`;
  history.pushState({ mot: mot.Mot }, "", newUrl);
}

function fermerPopup() {
  popup.classList.add("hidden");
  history.pushState(null, "", urlOrigine);
}

// Événements
closeBtn.addEventListener("click", fermerPopup);

window.addEventListener("click", (e) => {
  if (e.target === popup) {
    fermerPopup();
  }
});

window.addEventListener("popstate", (e) => {
  if (!e.state || !e.state.mot) {
    fermerPopup();
  }
});

// Initialisation
mots
    .sort((a, b) => a.Mot.localeCompare(b.Mot))
    .forEach(mot => {
      const item = document.createElement("li");
      item.textContent = mot.Mot;
      item.addEventListener("click", () => ouvrirPopup(mot));
      liste.appendChild(item);
    });
