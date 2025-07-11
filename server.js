const express = require('express');
const path = require('path');
const mots = require('./mots.json');

const app = express();
const port = process.env.PORT || 3000;

// Serve static assets
app.use('/css', express.static(path.join(__dirname, 'css')));
app.use('/js', express.static(path.join(__dirname, 'js')));
app.use('/html', express.static(path.join(__dirname, 'html')));

app.get('/:mot.html', (req, res) => {
  const requested = req.params.mot.toLowerCase();
  const entry = mots.find((m) => m.Mot.toLowerCase() === requested);
  if (!entry) {
    res.status(404).send('Mot introuvable');
    return;
  }
  res.send(`<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <title>${entry.Mot}</title>
  <link rel="stylesheet" href="/css/motAleatoire.css">
</head>
<body>
  <h1>Monèse</h1>
  <div class="word-card">
    <h2>${entry.Mot.charAt(0).toUpperCase() + entry.Mot.slice(1)}</h2>
    <p><strong>Définition :</strong> ${entry["Définition"]}</p>
    <p><strong>Exemple :</strong> ${entry["Exemple"]}</p>
    <span class="tag">${entry.Type}</span>
    <span class="tag">Difficulté : ${entry["Difficulté"]}</span>
  </div>
</body>
</html>`);
});

app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});
