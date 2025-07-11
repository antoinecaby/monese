import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const port = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

const mots = JSON.parse(
    fs.readFileSync(path.join(__dirname, "public", "mots.json"), "utf-8")
);

app.get("/mot/:mot.html", (req, res) => {
  const motParam = decodeURIComponent(req.params.mot.toLowerCase());
  const motData = mots.find((m) => m.Mot.toLowerCase() === motParam);
  if (!motData) {
    return res.status(404).send("<h1>Mot non trouvé</h1>");
  }
  res.render("mot", { mot: motData });
});

app.get("/mot/aleatoire", (req, res) => {
  const randomMot = mots[Math.floor(Math.random() * mots.length)];
  res.redirect(`/mot/${encodeURIComponent(randomMot.Mot.toLowerCase())}.html`);
});

const FAVORIS_PATH = path.join(__dirname, "data", "favoris_global.json");

app.post("/api/favoris", (req, res) => {
  const { mot, action } = req.body;
  if (!mot || !["add", "remove"].includes(action)) {
    return res.status(400).json({ error: "Paramètres invalides" });
  }
  const data = fs.existsSync(FAVORIS_PATH)
      ? JSON.parse(fs.readFileSync(FAVORIS_PATH, "utf-8"))
      : {};
  data[mot] = data[mot] || 0;
  if (action === "add") data[mot]++;
  else if (action === "remove" && data[mot] > 0) data[mot]--;
  fs.writeFileSync(FAVORIS_PATH, JSON.stringify(data, null, 2));
  res.status(200).json({ success: true });
});

app.get("/api/favoris/top10", (req, res) => {
  const data = fs.existsSync(FAVORIS_PATH)
      ? JSON.parse(fs.readFileSync(FAVORIS_PATH, "utf-8"))
      : {};
  const top10 = Object.entries(data)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 10)
      .map(([mot, count]) => ({ mot, count }));
  res.json(top10);
});

app.listen(port, () => {
  console.log(`🚀 Serveur démarré sur http://localhost:${port}/html/listeMots.html`);
});