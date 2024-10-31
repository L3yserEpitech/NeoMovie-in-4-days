# 🎬 MyNeoMovie

Bienvenue sur **MyNeoMovie** ! Ce projet est une plateforme de streaming où vous pouvez parcourir vos films et séries préférés. Ce site est développé avec **Next.js**, offrant une expérience utilisateur fluide et performante.

Note : Ce projet a été réalisé dans le cadre d'un défi de 4 jours, ajoutant un niveau de challenge pour le développement et l'intégration des fonctionnalités.


## 📽️ Fonctionnalités principales

- 🎥 **Films** : Parcourez une grande sélection de films.
- 📺 **Séries** : Suivez vos séries favorites.


## 🚀 Lancer le projet en local

Suivez les étapes ci-dessous pour exécuter le projet **MyNeoMovie** sur votre machine locale.


### Prérequis

Assurez-vous d'avoir les éléments suivants installés sur votre machine :

- [Node.js](https://nodejs.org/) (version 14.x ou supérieure)
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/) comme gestionnaire de paquets


### Étapes d'installation

  1. **Clonez le repo :**

```bash
git clone git@github.com:juniorconseiltaker-technicaltest/LORDET_Jules.git
```
  3. **Installez les dépendances :**

Si vous utilisez npm :

```bash
npm install
```
Ou si vous préférez yarn :

```bash
yarn install
```

  4. **Lancez le serveur de développement :**

Avec npm :

```bash
npm run dev
```

Ou avec yarn :

```bash
yarn dev
```
Accédez à l'application :

  5. **Ouvrez votre navigateur et accédez à l'adresse suivante :**

```bash
http://localhost:3000
```
Vous devriez voir le site MyNeoMovie fonctionner en local !



## 📦 Structure du projet
```python
├── .next               # Fichiers générés par Next.js
├── node_modules        # Dépendances du projet
├── public              # Fichiers statiques (favicon, images, etc.)
├── src                 # Code source principal
│   ├── app             # Pages principales de l'application
│   │   ├── abonnement  # Page d'abonnement
│   │   ├── api         # API interne
│   │   ├── films       # Page des films
│   │   ├── login       # Page de connexion
│   │   ├── profil      # Page de profil utilisateur
│   │   ├── series      # Page des séries
│   │   ├── signup      # Page d'inscription
│   │   ├── favicon.ico # Icône du site
│   │   ├── globals.css # Styles globaux
│   │   ├── layout.tsx  # Layout global de l'application
│   │   └── page.tsx    # Page principale
│   ├── components      # Composants réutilisables
│   ├── context         # Contexte global pour le state management
│   └── lib             # Fonctions utilitaires
├── .env.local          # Fichier d'environnement
├── .eslintrc.json      # Configuration ESLint
├── .gitignore          # Fichiers et dossiers à ignorer par Git
├── next.config.mjs     # Configuration de Next.js
├── package.json        # Informations et dépendances du projet
├── postcss.config.mjs  # Configuration PostCSS
├── tailwind.config.js  # Configuration Tailwind CSS
├── README.md           # Documentation du projet
└── tsconfig.json       # Configuration TypeScript
```
