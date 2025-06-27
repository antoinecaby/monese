document.getElementById("aleatoire-btn").addEventListener("click", function () {
  window.location.href = "motAleatoire.html";
});

document.getElementById("liste-btn").addEventListener("click", function () {
  window.location.href = "listeMots.html";
});

import mots from '../mots.json' with { type: 'json' };

const listeMotsEl = document.getElementById("liste-mots");
const popup = document.getElementById("popup");
const closeBtn = document.getElementById("close-popup");

const titre = document.getElementById("mot-titre");
const def = document.getElementById("mot-definition");
const exemple = document.getElementById("mot-exemple");
const type = document.getElementById("mot-type");
const difficulte = document.getElementById("mot-difficulte");

// Trie les mots par ordre alphabétique
mots.sort((a, b) => a.Mot.localeCompare(b.Mot));

// Affiche tous les mots
mots.forEach((mot) => {
  const li = document.createElement('li');
  li.textContent = mot.Mot;
  li.addEventListener('click', () => showPopup(mot));
  listeMotsEl.appendChild(li);
});

function showPopup(mot) {
  titre.textContent = mot.Mot;
  def.textContent = mot.Définition;
  exemple.textContent = mot.Exemple;
  type.textContent = mot.Type;
  difficulte.textContent = mot.Difficulté;
  popup.classList.remove("hidden");
}

closeBtn.addEventListener("click", () => {
  popup.classList.add("hidden");
});

// Fermer la pop-up en cliquant dehors
window.addEventListener("click", (e) => {
  if (e.target === popup) {
    popup.classList.add("hidden");
  }
});
