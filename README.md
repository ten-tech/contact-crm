# Contact CRM - Application de Gestion de Contacts

> Projet réalisé dans le cadre du module IDV-ANGU pendant la phase Code to Work à l'ETNA

[![Angular](https://img.shields.io/badge/Angular-20.3-red.svg)](https://angular.io/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue.svg)](https://www.typescriptlang.org/)
[![Live Demo](https://img.shields.io/badge/Demo-Live-success.svg)](https://contact-7u3yfxh5l-tenenans-projects.vercel.app)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

## Démo en ligne

**Accédez à l'application :** [https://contact-7u3yfxh5l-tenenans-projects.vercel.app](https://contact-7u3yfxh5l-tenenans-projects.vercel.app)

## Contexte du projet

Ce projet a été développé dans le cadre du module **IDV-ANGU** (Développement d'Interfaces Visuelles avec Angular) durant la phase **Code to Work** à l'[ETNA](https://etna.io). L'objectif principal était d'apprendre et de maîtriser le framework **Angular** en créant une application complète de gestion de contacts (CRM).

### Objectifs pédagogiques

- Comprendre l'architecture et les concepts fondamentaux d'Angular
- Maîtriser les composants standalone (nouveauté Angular 14+)
- Implémenter une gestion d'état réactive avec Angular Signals
- Créer une application SPA (Single Page Application) complète
- Gérer la persistence des données sans base de données (localStorage)
- Découvrir les bonnes pratiques de développement Angular
- Apprendre le routing et la navigation dans une application Angular
- Implémenter des formulaires réactifs avec validation

### Spécificités techniques

L'application utilise **exclusivement localStorage** pour la persistence des données, démontrant ainsi :
- La gestion d'état côté client
- La sérialisation/désérialisation JSON
- La manipulation de données sans backend
- La création d'une architecture scalable malgré l'absence de base de données

## Table des matières

- [Aperçu](#aperçu)
- [Fonctionnalités](#fonctionnalités)
- [Technologies utilisées](#technologies-utilisées)
- [Installation](#installation)
- [Utilisation](#utilisation)
- [Architecture du projet](#architecture-du-projet)
- [Apprentissages clés](#apprentissages-clés)
- [Déploiement](#déploiement)
- [Screenshots](#screenshots)

## Aperçu

**Contact CRM** est une application de gestion de contacts professionnels et personnels. Elle permet de créer, organiser, catégoriser et rechercher des contacts facilement. L'application est entièrement responsive et fonctionne en mode offline grâce à localStorage.

### Points forts

- **100% Angular 20** : Utilise les dernières fonctionnalités du framework
- **Sans backend** : Toutes les données sont stockées localement
- **Responsive** : Interface adaptée mobile, tablette et desktop
- **Multilingue** : Support complet Français/Anglais
- **Mode sombre** : Thème clair et sombre
- **Production ready** : Déployé sur Vercel avec CI/CD

## Fonctionnalités

### Gestion des contacts

- **CRUD complet** : Créer, lire, modifier et supprimer des contacts
- **Recherche avancée** : Recherche multi-critères (nom, email, entreprise, poste)
- **Filtrage intelligent** : Filtrer par catégorie ou favoris
- **Tri personnalisable** : Tri par nom (A-Z, Z-A) ou date de création
- **Informations détaillées** :
  - Prénom et nom
  - Email et téléphone
  - Entreprise et poste
  - Catégorie avec code couleur
  - Notes personnalisées
  - Statut favori

### Gestion des catégories

- **Catégories personnalisées** : Créer des catégories illimitées
- **Palette de couleurs** : 12 couleurs prédéfinies pour l'organisation visuelle
- **Protection intelligente** : Impossible de supprimer une catégorie avec des contacts associés
- **Compteur en temps réel** : Affichage du nombre de contacts par catégorie
- **Catégories par défaut** : Étudiant, Entreprise, Partenaire, Client

### Système de favoris

- **Marquage rapide** : Ajouter/retirer des favoris en un clic
- **Vue dédiée** : Page spéciale pour les contacts favoris
- **Persistance** : Les favoris sont sauvegardés entre les sessions

### Tableau de bord

- **Statistiques visuelles** : Cartes affichant le total des contacts, favoris et catégories
- **Contacts récents** : Liste des 5 derniers contacts ajoutés
- **Actions rapides** : Accès direct à la création de contacts et catégories
- **Navigation intelligente** : Liens cliquables vers les vues détaillées

### Internationalisation (i18n)

- **Bilingue** : Français et Anglais
- **Détection automatique** : Détecte la langue du navigateur
- **Changement dynamique** : Basculer entre les langues sans rechargement
- **Traduction complète** : Interface, messages, validations

### Système de thème

- **Mode clair/sombre** : Deux thèmes modernes
- **Détection système** : S'adapte aux préférences du système d'exploitation
- **Transitions fluides** : Animation lors du changement de thème
- **Sauvegarde** : Mémorise le choix de l'utilisateur
- **Design néomorphique** : Effets d'ombre modernes et élégants

### Validation des formulaires

- **Validation en temps réel** : Retour immédiat sur les champs
- **Règles complètes** :
  - Champs requis
  - Format email valide (RFC)
  - Format téléphone valide
  - Longueur minimale
- **Messages clairs** : Messages d'erreur explicites en français et anglais
- **Indicateurs visuels** : Mise en évidence des champs invalides

## Technologies utilisées

### Framework & Core

- **Angular 20.3** - Framework frontend moderne
- **TypeScript 5.9** - Typage statique et fonctionnalités ES6+
- **RxJS 7.8** - Programmation réactive
- **Angular Signals** - Gestion d'état réactive (nouvelle API)

### UI & Design

- **Angular Material 20** - Composants UI professionnels
- **SCSS** - Préprocesseur CSS avancé
- **Néomorphisme** - Design moderne avec ombres douces
- **Responsive Design** - Approche mobile-first

### Outils de développement

- **Angular CLI 20.3** - Outil de génération et build
- **ESLint** - Qualité et cohérence du code
- **Prettier** - Formatage automatique du code
- **Karma & Jasmine** - Tests unitaires

### Déploiement

- **Vercel** - Hébergement et CI/CD
- **Docker** - Containerisation (optionnel)
- **Nginx** - Serveur web haute performance
- **Make** - Automatisation des commandes

## Installation

### Prérequis

- Node.js v20 ou supérieur
- npm v10 ou supérieur
- Git

Vérifiez vos installations :

```bash
node --version
npm --version
git --version
```

### Étapes d'installation

1. **Cloner le repository**

```bash
git clone https://github.com/votre-username/contact-crm.git
cd contact-crm
```

2. **Installer les dépendances**

```bash
npm install
```

3. **Lancer le serveur de développement**

```bash
npm start
```

4. **Ouvrir l'application**

Naviguez vers [http://localhost:4200](http://localhost:4200)

### Installation avec Makefile

```bash
# Installer les dépendances
make install

# Démarrer le serveur
make dev

# Voir toutes les commandes disponibles
make help
```

## Utilisation

### Commandes npm

```bash
npm start              # Démarre le serveur de développement (port 4200)
npm run build          # Build pour la production
npm test               # Lance les tests unitaires
npm run watch          # Build en mode watch
```

### Commandes Make

```bash
make dev               # Serveur de développement
make build             # Build production
make test              # Tests unitaires
make lint              # Vérification du code
make format            # Formatage du code
make docker-build      # Build image Docker
make docker-run        # Lancer le container
make deploy            # Pipeline de déploiement complet
```

## Architecture du projet

```
contact-crm/
├── src/
│   ├── app/
│   │   ├── core/                      # Fonctionnalités centrales
│   │   │   ├── models/                # Interfaces TypeScript
│   │   │   │   ├── category.model.ts  # Modèle Catégorie
│   │   │   │   └── contact.model.ts   # Modèle Contact
│   │   │   ├── services/              # Services Angular
│   │   │   │   ├── category.service.ts    # Gestion des catégories
│   │   │   │   ├── contact.service.ts     # Gestion des contacts
│   │   │   │   ├── storage.service.ts     # Abstraction localStorage
│   │   │   │   ├── theme.service.ts       # Gestion des thèmes
│   │   │   │   └── translation.service.ts # Gestion i18n
│   │   │   └── guards/                # Guards de routing
│   │   ├── features/                  # Modules métier
│   │   │   ├── categories/            # Gestion des catégories
│   │   │   │   ├── category-form/     # Formulaire catégorie
│   │   │   │   └── category-list/     # Liste des catégories
│   │   │   ├── contacts/              # Gestion des contacts
│   │   │   │   ├── contact-detail/    # Détail d'un contact
│   │   │   │   ├── contact-form/      # Formulaire contact
│   │   │   │   └── contact-list/      # Liste des contacts
│   │   │   ├── dashboard/             # Tableau de bord
│   │   │   └── favorites/             # Vue des favoris
│   │   ├── shared/                    # Composants partagés
│   │   │   ├── components/
│   │   │   │   ├── header/            # En-tête de l'app
│   │   │   │   ├── footer/            # Pied de page
│   │   │   │   └── confirmation-dialog/  # Dialog de confirmation
│   │   │   └── pipes/
│   │   │       └── translate.pipe.ts  # Pipe de traduction
│   │   ├── app.config.ts              # Configuration de l'app
│   │   ├── app.routes.ts              # Définition des routes
│   │   └── app.ts                     # Composant racine
│   ├── index.html                     # HTML principal
│   ├── main.ts                        # Point d'entrée
│   └── styles.scss                    # Styles globaux
├── public/                            # Assets statiques
├── Dockerfile                         # Configuration Docker
├── docker-compose.yml                 # Orchestration Docker
├── Makefile                           # Automatisation
├── vercel.json                        # Configuration Vercel
├── angular.json                       # Configuration Angular CLI
├── package.json                       # Dépendances npm
└── tsconfig.json                      # Configuration TypeScript
```

## Apprentissages clés

### Angular Fundamentals

- **Composants Standalone** : Nouvelle approche modulaire d'Angular
- **Dependency Injection** : Injection de services et gestion des dépendances
- **Lifecycle Hooks** : ngOnInit, ngOnDestroy, etc.
- **Template Syntax** : Interpolation, directives, event binding
- **Two-way Binding** : Communication bidirectionnelle avec [(ngModel)]

### Gestion d'état avec Signals

```typescript
// Exemple de Signal dans ContactService
private contactsSignal = signal<Contact[]>([]);
readonly contacts = this.contactsSignal.asReadonly();

// Signal calculé
readonly totalContacts = computed(() => this.contacts().length);
readonly favoriteContacts = computed(() =>
  this.contacts().filter(c => c.favorite)
);
```

**Avantages des Signals :**
- Réactivité fine-grained
- Performance optimisée
- Détection de changement automatique
- État read-only exposé

### Routing & Navigation

```typescript
// Configuration des routes
const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'contacts', component: ContactListComponent },
  { path: 'contacts/new', component: ContactFormComponent },
  { path: 'contacts/:id', component: ContactDetailComponent },
  { path: 'contacts/:id/edit', component: ContactFormComponent },
  // ...
];
```

**Concepts maîtrisés :**
- Routes paramétrées
- Navigation programmatique
- Guards de navigation
- Lazy loading des modules

### Formulaires réactifs

```typescript
// Création d'un formulaire avec validation
this.contactForm = this.fb.group({
  firstName: ['', [Validators.required, Validators.minLength(2)]],
  lastName: ['', [Validators.required, Validators.minLength(2)]],
  email: ['', [Validators.required, Validators.email]],
  phone: ['', [Validators.required, Validators.pattern(/^\+?[\d\s\-\(\)]+$/)]],
  // ...
});
```

### LocalStorage & Persistence

```typescript
// Service d'abstraction localStorage
export class StorageService {
  setItem<T>(key: string, value: T): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  getItem<T>(key: string): T | null {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  }
}
```

**Architecture sans base de données :**
- Sérialisation/Désérialisation JSON
- Gestion des erreurs de stockage
- Initialisation des données par défaut
- Clés de stockage typées

### Patterns & Best Practices

- **Service Layer** : Logique métier séparée des composants
- **Smart/Dumb Components** : Composants intelligents vs présentationnels
- **Immutabilité** : Manipulation des données sans mutation
- **Type Safety** : Utilisation stricte de TypeScript
- **Separation of Concerns** : Séparation claire des responsabilités

## Déploiement

### Déploiement sur Vercel (actuel)

L'application est déployée sur Vercel avec déploiement continu :

1. **Configuration** : `vercel.json` définit le build et les rewrites
2. **Build automatique** : Chaque push déclenche un build
3. **Preview Deployments** : Chaque branche a sa propre URL de preview
4. **Production** : La branche main est automatiquement déployée

```bash
# Déploiement manuel
npx vercel --prod
```

### Déploiement Docker (optionnel)

```bash
# Build de l'image
docker build -t contact-crm .

# Lancer le container
docker-compose up -d

# Accès : http://localhost:8080
```

## Screenshots

### Tableau de bord
![Dashboard](./screenshots/dashboard.png)
*Vue d'ensemble avec statistiques et contacts récents*

### Liste des contacts
![Contact List](./screenshots/contact-list.png)
*Recherche, filtrage et tri des contacts*

### Formulaire de contact
![Contact Form](./screenshots/contact-form.png)
*Création/édition avec validation en temps réel*

### Mode sombre
![Dark Mode](./screenshots/dark-mode.png)
*Thème sombre pour un confort visuel*

## Ce que j'ai appris

### Compétences techniques acquises

1. **Architecture Angular moderne**
   - Comprendre la structure d'une application Angular
   - Organiser le code en modules, composants et services
   - Implémenter les bonnes pratiques de l'écosystème

2. **Gestion d'état réactive**
   - Maîtriser les Signals (nouvelle API Angular)
   - Créer des computed values
   - Gérer la réactivité sans RxJS complexe

3. **Développement frontend complet**
   - Router et navigation
   - Formulaires réactifs et validation
   - Composants réutilisables
   - Services injectables

4. **Persistence des données**
   - Architecture sans backend
   - localStorage API
   - Gestion des données JSON
   - Initialisation et migration

5. **UX/UI moderne**
   - Design responsive
   - Thèmes dynamiques
   - Internationalisation
   - Accessibilité

6. **DevOps & Déploiement**
   - CI/CD avec Vercel
   - Docker et containerisation
   - Optimisation des builds
   - Déploiement en production

### Défis relevés

- Créer une architecture scalable sans base de données
- Implémenter un système de traduction custom
- Gérer la synchronisation localStorage
- Optimiser les performances avec Signals
- Déployer une application Angular en production

## Améliorations futures

- [ ] Ajout d'un système d'export/import (CSV, JSON)
- [ ] Synchronisation cloud (Firebase, Supabase)
- [ ] PWA (Progressive Web App) avec offline support
- [ ] Authentification multi-utilisateurs
- [ ] Tags et étiquettes personnalisés
- [ ] Historique des modifications
- [ ] Mode d'archivage des contacts
- [ ] Notifications et rappels

## License

Ce projet est sous licence MIT. Voir le fichier [LICENSE](LICENSE) pour plus de détails.

## Auteur

**coulib_b** - Étudiant ETNA - Phase Code to Work

## Remerciements

- **ETNA** pour la formation et le module IDV-ANGU
- **Angular Team** pour le framework et la documentation
- **Vercel** pour l'hébergement gratuit
- La communauté Angular pour les ressources et tutoriels

---

**Développé avec passion dans le cadre de l'apprentissage d'Angular à l'ETNA**

*Projet pédagogique - Module IDV-ANGU - Code to Work 2025*
