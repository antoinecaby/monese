import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const port = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "public")));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

const mots = JSON.parse(
    fs.readFileSync(path.join(__dirname, "public", "mots.json"), "utf-8")
);

app.get("/mot/:mot.html", (req, res) => {
  const motParam = req.params.mot.toLowerCase();
  const motData = mots.find((m) => m.Mot.toLowerCase() === motParam);

  if (!motData) {
    return res.status(404).send("<h1>Mot non trouvé</h1>");
  }

  res.render("mot", { mot: motData });
});

app.listen(port, () => {
  console.log(`🚀 Serveur démarré sur http://localhost:3000/html/listeMots.html`);
});

app.get("/mot/aleatoire", (req, res) => {
  const randomMot = mots[Math.floor(Math.random() * mots.length)];
  res.redirect(`/mot/${randomMot.Mot.toLowerCase()}.html`);
});