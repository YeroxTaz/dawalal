# DAWALAL - Plateforme de gestion des examens de conduite

Application web full-stack de gestion des examens du permis de conduire au Sénégal.

Le projet est organisé en deux parties :

- **backend/** : serveur Node.js + Express avec une base de données SQLite (API REST)
- **frontend/** : application React + Vite (interface utilisateur)

Les données sont désormais persistantes : elles sont stockées dans une base de données et partagées entre tous les utilisateurs et toutes les machines.

## Prérequis

Node.js version 18 ou supérieure installé sur la machine.

## Lancement

Le backend et le frontend doivent tourner en même temps, dans deux terminaux séparés.

### 1. Lancer le backend

Dans un premier terminal :

```
cd backend
npm install
npm start
```

Le serveur démarre sur http://localhost:4000. Au premier lancement, la base de données SQLite est créée automatiquement (fichier dawalal.db) avec les données de départ.

### 2. Lancer le frontend

Dans un second terminal :

```
cd frontend
npm install
npm run dev
```

L'application s'ouvre sur http://localhost:5173.

## Utilisation

- **Espace candidat** : se connecter avec n'importe quel nom et mot de passe, puis remplir une inscription. L'inscription est enregistrée en base de données.
- **Espace examinateur** : se connecter pour voir la liste des candidats convoqués, vérifier leur identité et saisir les résultats.
- **Espace administrateur** : accessible en saisissant le mot de passe `root` depuis l'espace candidat. Permet de valider ou rejeter les dossiers.

Comme tout passe par la base de données, une inscription créée par un candidat apparaît immédiatement chez l'examinateur et l'administrateur, même sur une autre machine connectée au même serveur.

## Architecture de l'API

Le backend expose les routes REST suivantes :

| Méthode | Route | Rôle |
|---------|-------|------|
| GET | /api/centres | Liste des centres d'examen |
| GET | /api/creneaux | Liste des créneaux |
| GET | /api/candidats | Liste des candidats convoqués |
| PUT | /api/candidats/:id/verifier | Vérifier l'identité d'un candidat |
| PUT | /api/candidats/:id/resultat | Saisir le résultat d'un candidat |
| GET | /api/dossiers | Liste des dossiers |
| PUT | /api/dossiers/:id/statut | Valider ou rejeter un dossier |
| GET | /api/inscriptions/:nom | Inscription d'un candidat |
| POST | /api/inscriptions | Créer une inscription |

## Technologies

- **Frontend** : React, Vite, JavaScript (JSX)
- **Backend** : Node.js, Express, SQLite (better-sqlite3)
- **API** : REST (JSON)
