// ============================================================
//  DAWALAL - Serveur Express (API REST)
//  Gère les centres, créneaux, candidats, dossiers et inscriptions
// ============================================================

import express from "express";
import cors from "cors";
import db from "./db.js";

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

// ---- CENTRES & CRÉNEAUX -----------------------------------

app.get("/api/centres", (req, res) => {
  const centres = db.prepare("SELECT * FROM centres").all();
  res.json(centres);
});

app.get("/api/creneaux", (req, res) => {
  const creneaux = db.prepare("SELECT * FROM creneaux").all();
  // convertir disponible (0/1) en booléen pour le frontend
  res.json(creneaux.map((c) => ({ ...c, dispo: !!c.disponible, centre: c.centre_id })));
});

// ---- CANDIDATS CONVOQUÉS (espace examinateur) -------------

app.get("/api/candidats", (req, res) => {
  const candidats = db.prepare("SELECT * FROM candidats").all();
  res.json(candidats.map((c) => ({ ...c, verifie: !!c.verifie })));
});

// Vérifier l'identité d'un candidat
app.put("/api/candidats/:id/verifier", (req, res) => {
  const { id } = req.params;
  db.prepare("UPDATE candidats SET verifie = 1 WHERE id = ?").run(id);
  const candidat = db.prepare("SELECT * FROM candidats WHERE id = ?").get(id);
  res.json({ ...candidat, verifie: !!candidat.verifie });
});

// Saisir le résultat d'un candidat
app.put("/api/candidats/:id/resultat", (req, res) => {
  const { id } = req.params;
  const { mention, score } = req.body;
  db.prepare("UPDATE candidats SET resultat = ?, score = ? WHERE id = ?").run(mention, score, id);
  // Répercuter le résultat sur l'inscription liée (si elle existe)
  db.prepare("UPDATE inscriptions SET resultat = ?, score = ? WHERE candidat_id = ?").run(mention, score, id);
  const candidat = db.prepare("SELECT * FROM candidats WHERE id = ?").get(id);
  res.json({ ...candidat, verifie: !!candidat.verifie });
});

// ---- DOSSIERS (espace administrateur) ---------------------

app.get("/api/dossiers", (req, res) => {
  const dossiers = db.prepare("SELECT * FROM dossiers ORDER BY id").all();
  res.json(dossiers);
});

// Valider ou rejeter un dossier
app.put("/api/dossiers/:id/statut", (req, res) => {
  const { id } = req.params;
  const { statut } = req.body;
  db.prepare("UPDATE dossiers SET statut = ? WHERE id = ?").run(statut, id);
  // Répercuter sur l'inscription liée
  db.prepare("UPDATE inscriptions SET resultat = resultat WHERE dossier_id = ?").run(id);
  const dossier = db.prepare("SELECT * FROM dossiers WHERE id = ?").get(id);
  res.json(dossier);
});

// ---- INSCRIPTIONS (espace candidat) -----------------------

// Récupérer l'inscription d'un candidat par son nom
app.get("/api/inscriptions/:nom", (req, res) => {
  const { nom } = req.params;
  const inscription = db.prepare("SELECT * FROM inscriptions WHERE nom = ? ORDER BY id DESC LIMIT 1").get(nom);
  if (!inscription) return res.json(null);
  // Joindre le statut du dossier et le résultat du candidat
  const dossier = db.prepare("SELECT statut FROM dossiers WHERE id = ?").get(inscription.dossier_id);
  const candidat = db.prepare("SELECT resultat, score FROM candidats WHERE id = ?").get(inscription.candidat_id);
  res.json({
    ...inscription,
    dossierId: inscription.dossier_id,
    convoqueId: inscription.candidat_id,
    statut: dossier ? dossier.statut : "En attente",
    resultat: candidat ? candidat.resultat : inscription.resultat,
    score: candidat ? candidat.score : inscription.score,
  });
});

// Créer une nouvelle inscription (cascade complète)
app.post("/api/inscriptions", (req, res) => {
  const { nom, region, type, heure, centre, mode } = req.body;
  const today = new Date().toISOString().slice(0, 10);

  // 1. Créer le candidat convoqué (visible par l'examinateur)
  const candResult = db.prepare(
    "INSERT INTO candidats (nom, region, type, heure, verifie) VALUES (?, ?, ?, ?, 0)"
  ).run(nom, region, type, heure);
  const candidatId = candResult.lastInsertRowid;

  // 2. Créer le dossier (visible par l'administrateur)
  const dossResult = db.prepare(
    "INSERT INTO dossiers (candidat, region, type, statut, date) VALUES (?, ?, ?, 'En attente', ?)"
  ).run(nom, region, type, today);
  const dossierId = dossResult.lastInsertRowid;

  // 3. Créer l'inscription qui relie les deux
  db.prepare(
    "INSERT INTO inscriptions (candidat_id, dossier_id, nom, region, type, heure, centre, mode) VALUES (?, ?, ?, ?, ?, ?, ?, ?)"
  ).run(candidatId, dossierId, nom, region, type, heure, centre, mode);

  res.status(201).json({
    nom, region, type, heure, centre, mode,
    dossierId: Number(dossierId),
    convoqueId: Number(candidatId),
    statut: "En attente",
  });
});

// ---- DÉMARRAGE --------------------------------------------

app.listen(PORT, () => {
  console.log(`Serveur DAWALAL démarré sur http://localhost:${PORT}`);
});
