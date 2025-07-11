const express = require('express');
const path = require('path');
const mots = require('./mots.json');

const app = express();
const port = process.env.PORT || 3000;

app.use('/css', express.static(path.join(__dirname, 'css')));
app.use('/js', express.static(path.join(__dirname, 'js')));
app.use('/html', express.static(path.join(__dirname, 'html')));

app.get('/', (req, res) => {
  res.redirect('/html/motAleatoire.html');
});

app.get('/api/random', (req, res) => {
  const index = Math.floor(Math.random() * mots.length);
  res.json(mots[index]);
});

app.get('/api/mots', (req, res) => {
  res.json(mots);
});

function slugify(text) {
  return text
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, '-')
    .replace(/[^\w-]/g, '')
    .toLowerCase();
}

app.get('/:slug.html', (req, res, next) => {
  const { slug } = req.params;
  const mot = mots.find(m => slugify(m.Mot) === slug);
  if (!mot) return next();
  res.send(`<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>${mot.Mot}</title>
  <link rel="stylesheet" href="/css/motAleatoire.css">
</head>
<body>
  <nav class="navbar">
    <div class="navbar-title">Monèse</div>
    <div class="navbar-buttons">
        <button id="liste-btn">Liste</button>
        <button id="aleatoire-btn">Aléatoire</button>
    </div>
  </nav>
  <div id="container">
    <div class="word-card">
      <h2>${mot.Mot.charAt(0).toUpperCase() + mot.Mot.slice(1)}</h2>
      <p><strong>Définition :</strong> ${mot.Définition}</p>
      <p><strong>Exemple :</strong> ${mot.Exemple}</p>
      <span class="tag">${mot.Type}</span>
      <span class="tag">Difficulté : ${mot.Difficulté}</span>
    </div>
  </div>
  <script>
    document.getElementById('aleatoire-btn').addEventListener('click', function() { window.location.href = '/html/motAleatoire.html'; });
    document.getElementById('liste-btn').addEventListener('click', function() { window.location.href = '/html/listeMots.html'; });
  </script>
</body>
</html>`);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
