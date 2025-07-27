# Xolo the Survivor – RIA Game

> *A retro-inspired web game built as a Rich Internet Application (RIA), featuring Xolo navigating survival challenges.*

---

## 📚 Project Description

"Xolo the Survivor" est un jeu web développé dans le cadre du module universitaire **624-2 Rich Internet Applications (RIA)** de la formation Bachelor of Science en informatique de gestion à la HES-SO Valais-Wallis. Le jeu consiste à incarner Xolo, un survivant devant affronter des vagues croissantes de zombies dans un environnement hostile.

Le jeu est déployé ici : [Xolo the Survivor](https://xolo.elias-borrajo.ch/description_start.html)

## 🎮 Description du jeu

### 🎯 But du jeu

Survivre le plus longtemps possible en éliminant un maximum de zombies tout en profitant d'une bande sonore de 13 minutes.

### 🧟‍♂️ Personnages

* **Xolo** : Le héros du jeu.
* **Zombies** : Ennemis qui tentent de dévorer Xolo.

### 📖 Règles et mécaniques

"Xolo the Survivor" est un jeu de survie en vue du dessus où le personnage principal est positionné au centre de l’écran. Xolo doit éliminer les zombies avant qu'ils ne le touchent. Éliminer des zombies rapporte des points permettant de rivaliser avec d'autres joueurs.

### 📜 Histoire

Après que le virus KM ait déclenché une apocalypse zombie à Sion, Xolo, un jeune chasseur expérimenté, se retrouve confronté à des hordes de zombies. Armé de son fusil MOSSBERG 500, Xolo doit survivre le plus longtemps possible.

## 🧪 Technologies utilisées

| Type     | Nom                                 | Version |
| -------- | ----------------------------------- | ------- |
| Langages | JavaScript (ES6+), CSS, HTML        |         |
| APIs/Web | LocalStorage, JSON, Géolocalisation |         |

## 🎯 Objectifs d'apprentissage

* Comprendre les principes des Rich Internet Applications (RIA)
* Implémenter des mécaniques de jeu interactives en JavaScript
* Manipuler le DOM et gérer les événements utilisateur
* Concevoir des mises en page responsive avec HTML/CSS
* Structurer un jeu modulaire 

## 🔧 Fonctionnalités

* Elimination d'ennemis et gestion des scores
* Interface utilisateur dynamique (menus, transitions)
* Gestion des collisions et logique de survie

### 🔧 Fonctionnalités bonus

* Animations de particules personnalisées
* Sons et effets sonores en jeu
* Drag'n Drop (choix de l'apparence)
* Géolocalisation intégrée


## 🏗 Structure du projet

### 📂 Architecture

* `index.html` : Point d'entrée du jeu
* `playerForm.html` : Formulaire d'inscription du joueur
* `Game_Xolo.html` : Interface principale du jeu
* `5_GameLoop.js` : Logique principale du jeu (boucle de jeu)
* `animationHeroZombie.js` : Gestion des animations des personnages
* `geolocalisation.js` : Intégration de la géolocalisation
* `assets/` : Images, sons, ressources diverses

Flux général :
`index.html` → initialisation via `5_GameLoop.js` → gestion des interactions (animations, mouvements, collisions, score)

## ✅ Tests & Validation

* Tests manuels réalisés sur divers dispositifs

## 📌 Critères de succès (selon le cahier des charges)

| Critère                                             | Statut |
| --------------------------------------------------  | ------ |
| Évaluation des compétences intégrées (screenshots)      | ✅ Done |
| Qualité du code (variables, commentaires, ...)        | ✅ Done |
| Implication personnelle                                | ✅ Done |
| Rapport de séparation des tâches                      | ✅ Done |
| Code fonctionnel                                       | ✅ Done |

## 🚀 Résultats et améliorations futures

### ✨ Améliorations possibles :

* Intégrer plusieurs niveaux
* Enrichir le design graphique
* Ajouter une variété d’armes

### 🎯 Conclusion :

Ce projet a permis à l'équipe d'apprendre et maîtriser les technologies JavaScript, HTML et CSS malgré une expérience initiale limitée. Bien que satisfait du résultat actuel, le projet gagnerait à être enrichi par plus d’animations et un gameplay étendu.

## 👤 Auteurs

* **Elias Borrajo**
* **Milena Lonfat**
* **Jonathan Bourquin**

---

**Projet réalisé dans le cadre du cours 624-2 Rich Internet Applications (RIA)**
**Enseignants : Alexandre Cotting & Raphaël Rey, HES-SO Valais-Wallis**
*Déposé le : 9 juin 2022*
