# Xolo the Survivor – RIA Game

> *A retro-inspired web game built as a Rich Internet Application (RIA), featuring Xolo navigating survival challenges.*

---

## 📚 Project Description

"Xolo the Survivor" is a web game developed as part of the **624-2 Rich Internet Applications (RIA)** module of the Bachelor of Science in Business Information Technology at HES-SO Valais-Wallis. The game features Xolo, a survivor facing ever-increasing waves of zombies in a hostile environment.

The game is deployed here: [Xolo the Survivor](https://xolo.elias-borrajo.ch/description_start.html)

## 🎮 Game Description

### 🎯 Game Objective

Survive as long as possible by eliminating as many zombies as you can, all while enjoying a 13-minute soundtrack.

### 🧟‍♂️ Characters

* **Xolo**: The hero of the game.
* **Zombies**: Enemies trying to devour Xolo.

### 📖 Rules and Mechanics

"Xolo the Survivor" is a top-down survival game where the main character is centered on the screen. Xolo must eliminate zombies before they reach him. Killing zombies earns points, allowing players to compete with others.

### 📜 Story

After the KM virus triggers a zombie apocalypse in Sion, Xolo, a skilled young hunter, finds himself facing hordes of the undead. Armed with his MOSSBERG 500 shotgun, Xolo must survive for as long as possible.

## 🧪 Technologies Used

| Type      | Name                            | Version |
| --------- | ------------------------------- | ------- |
| Languages | JavaScript (ES6+), CSS, HTML    |         |
| APIs/Web  | LocalStorage, JSON, Geolocation |         |

## 🎯 Learning Objectives

* Understand the principles of Rich Internet Applications (RIA)
* Implement interactive game mechanics in JavaScript
* Manipulate the DOM and handle user events
* Design responsive layouts using HTML/CSS
* Structure a modular game

## 🔧 Features

* Enemy elimination and score tracking
* Dynamic user interface (menus, transitions)
* Collision detection and survival logic

### 🔧 Bonus Features

* Custom particle animations
* In-game sounds and sound effects
* Drag'n Drop (character appearance selection)
* Integrated geolocation

## 🏗 Project Structure

### 📂 Architecture

* `index.html` : Game entry point
* `playerForm.html` : Player registration form
* `Game_Xolo.html` : Main game interface
* `5_GameLoop.js` : Main game logic (game loop)
* `animationHeroZombie.js` : Character animation management
* `geolocalisation.js` : Geolocation integration
* `assets/` : Images, sounds, and various resources

General flow:
`index.html` → initialization via `5_GameLoop.js` → interaction management (animations, movement, collisions, score)

## ✅ Testing & Validation

* Manual testing on various devices

## 📌 Success Criteria (per the specifications)

| Criterion                                     | Status |
| --------------------------------------------- | ------ |
| Evaluation of integrated skills (screenshots) | ✅ Done |
| Code quality (variables, comments, etc.)      | ✅ Done |
| Personal involvement                          | ✅ Done |
| Task distribution report                      | ✅ Done |
| Functional code                               | ✅ Done |

## 🚀 Results and Future Improvements

### ✨ Possible Improvements:

* Add multiple levels
* Improve graphical design
* Introduce a variety of weapons

### 🎯 Conclusion:

This project allowed the team to learn and master JavaScript, HTML, and CSS technologies despite initially limited experience. While satisfied with the current result, the project could be enhanced with more animations and expanded gameplay.

## 👤 Authors

* **Elias Borrajo**
* **Milena Lonfat**
* **Jonathan Bourquin**

---

**Project completed for the 624-2 Rich Internet Applications (RIA) course**
**Instructors: Alexandre Cotting & Raphaël Rey, HES-SO Valais-Wallis**
*Submitted on: June 9, 2022*

---
 
 <details>
 <summary>
  Original Readme Archive (FR)
 </summary>


 <h2>Description de notre projet</h2>
 
</header>
<p>
Dans le cadre du cours 624-2 Rich Internet Applications (RIA) de la formation<a href="https://www.hevs.ch/fr/hautes-ecoles/haute-ecole-de-gestion/informatique-de-gestion/formation-bachelor-en-informatique-de-gestion-200049/"> Bachelor of Science en informatique de gestion</a> de la <a href="https://www.hevs.ch/fr/intro">HES-SO Valais Wallis</a>, nous avons dû réaliser un site web à l'aide d'HTMl et de CSS ainsi qu'un jeu en JavaScript.
</p>  
<p>
Lors du cours, la documentation relative aux différents langages ainsi que des exercices nous ont été donnés pour nous aider. Du côté du site internet, il nous a été demandé de reproduire des mockups distribués par le professeur. Nous avons ausssi reçu un cahier des charges à respecter avec à l'intérieur différents codes à implémenter. Concernant la partie javascript, aucune contrainte ne nous a été imposée mise à part celle de créer notre jeu en 2D. Notre choix s'est donc porté sur le développement d'un shooter en vue du dessus que nous avons nommé <b>"Xolo the survivor"</b>.
</p>  
<h3>Informations Générales</h3>
<ul>
<li>Nom du jeu : Xolo the survivor.</li>
<li>Niveaux : Un seul niveau/map actuellement.</li>
<li>But : Survivre le plus longtemps possible en tuant le plus de zombies.</li>
</ul>

<h3>Mécaniques du jeu</h3>
<ul>
<li>Points : Tuer des zombies vous rapporte des points, plus vous en avez, plus vous pourrez fanfaronner à la place du midi à Sion.</li>
<li>Zombies : les zombies foncent sur Xolo pour essayer de le dévorer.</li>
</ul>
                
<h3>Histoire</h3>
<p>
Vous incarnez Xolo, c'est l'un des derniers survivants après que le virus MK ait plongé l'humanité dans l'apocalypse.
<br/>
Xolo passait une soirée paisible à se promener en ville de Sion, mais tout bascula lorsqu'un ivrogne mordit une personne à la place du midi. La gens commencèrent à crier, s'effondrer, puis se relever en mordant à leur tour leurs amis qui essayaient de les aider.
<br/>
Notre jeune héros n'est pas dupe, il a vu plein de films de science-fiction et de fantastique, il sait très bien ce qui est en train de se passer, l'apocalypse zombie est arrivée !
<br/>
Xolo étant aussi un jeune chasseur à ses heures perdues, il courut vers son appartement pour y récupérer son fusil de chasse, un MOSSBERG 500.
<br/>
C'est maintenant que le fun commence ! <b>Survivez aussi longtemps que possible, faites un maximum de points !</b>   
</p>
<p>
Le code source de l'application est disponible sur le <a href="https://gitlab.com/hes-so-elias/semestre4/ria_gameproject">gitlab du projet</a>.
</p>
<p>
Pour voir le résultat, c'est par <a href="https://elmijo.savingberset.ch/description_start.html">ici</a>!
</p>
<div>
<h3>Fiche signalétique</h3>
<ul>
<li>
<p><strong>Bourquin Jonathan</strong>: Coder, Architect</p>
</li>
<li>
<p><strong>Lonfat Milena</strong>: Layout, Coder, Graphics</p>
</li>
<li>
<p><strong>Borrajo Elias</strong>: Git, Coder, Game-designer</p>
</li>
</ul>
</div>

  
 </details>

  
