// ============================================================
//  DAWALAL - Base de données SQLite
//  Création du schéma et insertion des données initiales
// ============================================================

import Database from "better-sqlite3";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const db = new Database(join(__dirname, "dawalal.db"));
db.pragma("journal_mode = WAL");

// ---- Création des tables ----------------------------------

db.exec(`
CREATE TABLE IF NOT EXISTS centres (
  id INTEGER PRIMARY KEY,
  nom TEXT NOT NULL,
  region TEXT NOT NULL,
  capacite INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS creneaux (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  date TEXT NOT NULL,
  heure TEXT NOT NULL,
  centre_id INTEGER NOT NULL,
  disponible INTEGER NOT NULL DEFAULT 1,
  FOREIGN KEY (centre_id) REFERENCES centres(id)
);

CREATE TABLE IF NOT EXISTS candidats (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nom TEXT NOT NULL,
  region TEXT NOT NULL,
  type TEXT NOT NULL,
  heure TEXT,
  verifie INTEGER NOT NULL DEFAULT 0,
  resultat TEXT,
  score TEXT
);

CREATE TABLE IF NOT EXISTS dossiers (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  candidat TEXT NOT NULL,
  region TEXT NOT NULL,
  type TEXT NOT NULL,
  statut TEXT NOT NULL DEFAULT 'En attente',
  date TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS inscriptions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  candidat_id INTEGER,
  dossier_id INTEGER,
  nom TEXT NOT NULL,
  region TEXT NOT NULL,
  type TEXT NOT NULL,
  heure TEXT,
  centre TEXT,
  mode TEXT,
  resultat TEXT,
  score TEXT,
  FOREIGN KEY (candidat_id) REFERENCES candidats(id),
  FOREIGN KEY (dossier_id) REFERENCES dossiers(id)
);
`);

// ---- Insertion des données initiales (une seule fois) -----

const nbCentres = db.prepare("SELECT COUNT(*) AS n FROM centres").get().n;
if (nbCentres === 0) {
  const insertCentre = db.prepare("INSERT INTO centres (id, nom, region, capacite) VALUES (?, ?, ?, ?)");
  [
    [4001, "Centre d'examen de Dakar", "Dakar", 50],
    [4002, "Centre d'examen de Thiès", "Thiès", 35],
    [4003, "Centre d'examen de Saint-Louis", "Saint-Louis", 30],
    [4004, "Centre d'examen de Kaolack", "Kaolack", 25],
  ].forEach((c) => insertCentre.run(...c));

  const insertCreneau = db.prepare("INSERT INTO creneaux (date, heure, centre_id, disponible) VALUES (?, ?, ?, ?)");
  [
    ["2026-07-10", "08h00", 4001, 1],
    ["2026-07-10", "10h00", 4001, 1],
    ["2026-07-11", "08h00", 4001, 0],
    ["2026-07-12", "09h00", 4002, 1],
  ].forEach((c) => insertCreneau.run(...c));

  const insertCandidat = db.prepare("INSERT INTO candidats (id, nom, region, type, heure, verifie, resultat, score) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
  [
    [1001, "Mamadou Ndiaye", "Dakar", "Code de la route", "08h00", 0, null, null],
    [1002, "Fatou Sarr", "Dakar", "Code de la route", "08h00", 0, null, null],
    [1003, "Ousmane Baldé", "Dakar", "Conduite", "10h00", 0, null, null],
    [1004, "Awa Diop", "Dakar", "Conduite", "10h00", 0, null, null],
  ].forEach((c) => insertCandidat.run(...c));

  const insertDossier = db.prepare("INSERT INTO dossiers (id, candidat, region, type, statut, date) VALUES (?, ?, ?, ?, ?, ?)");
  [
    [2001, "Mamadou Ndiaye", "Dakar", "Code de la route", "En attente", "2026-06-15"],
    [2002, "Fatou Sarr", "Dakar", "Code de la route", "En attente", "2026-06-16"],
    [2003, "Ousmane Baldé", "Kolda", "Conduite", "Validé", "2026-06-14"],
    [2004, "Awa Diop", "Thiès", "Conduite", "Validé", "2026-06-13"],
    [2005, "Cheikh Fall", "Saint-Louis", "Code de la route", "Rejeté", "2026-06-12"],
  ].forEach((d) => insertDossier.run(...d));

  console.log("Base de données initialisée avec les données de départ.");
}

export default db;
