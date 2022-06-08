// A T T R I B U T S  *********************************************************
console.log('1) Déclaration des attributs');

// Canvas
let canvas;
let context;
let animationFrame;

// UI
let ui                = document.getElementById('ui');
let start_Screen      = document.getElementById("start");       // Div : Home Screen
let gameCanvas_Screen = document.getElementById("canvas");      // Canvas : Game
let gameOver_Screen   = document.getElementById("gameOver");    // Div : GameOver Screen

// SONG 
let audio_background = document.getElementById('audio_BackGround');


// Game
let player;
let projectiles = [];
let enemies = [];
let particles = [];
let score;
let scores = [];
let maxScore;

let ennemiesInterval;
let ennemiesSpawnTimeInterval;


// M E N U  S C R E E N S *********************************************************
// Permet de dire quelle morceaux de l'HTML doivent s'afficher
function homeScreen()
{
    console.log('Display : Home Screen');
    ui.style.display                = "block";

    start_Screen.style.display      = "block";
    gameCanvas_Screen.style.display = "none";
    gameOver_Screen.style.display   = "none";  
    
}

function controls()
{
    console.log('Display : Controls text on Home Screen');

    // Afficher un texte dans une fenêtre pop-up pour expliquer comment jouer au jeu 

    // On affiche le texte dans une fenêtre pop-up
    // Récuperer le texte de la DIV "controlsText" et l'afficher dans une fenêtre pop-up

    let controls = document.getElementById('controlsText').innerHTML;
    let controlsTextContent = controls.innerHTML;
    window.alert(controls);
}

function startGame()
{
    console.log('Display : Start Game');

    start_Screen.style.display      = "none";
    gameCanvas_Screen.style.display = "block";
    gameOver_Screen.style.display   = "none"
    ui.style.display                = "none";

    // Start the game loop
    // Lancer la gameloop la première fois, qui se lancera à l'infini
    window.requestAnimationFrame( gameLoop ); 

    audio_background.play();

    // 12) Callback methode ---> Apellé à chaque X temps defini dans la fontion (ici 1[s])
    spawnEnemies();
    
}

function gameOver()
{
    if (window.localStorage.getItem("scores") !== null)
    {
        scores = JSON.parse(localStorage.getItem("scores") || "[]");
    } 

    scores.push(score);
    let userName =  window.localStorage.getItem("userName");
  
    document.getElementById("userName").innerHTML = userName.toString();
    document.getElementById("score").innerHTML = (Math.max(...scores.map(o => o.score))).toString();
    
    window.localStorage.setItem("scores", JSON.stringify(scores));
    console.log("Display : Game Over");

    // Arreter la musique de fond et la réinitialiser
    audio_background.pause();
    audio_background.currentTime = 0;

    // Jouer la musique de game over
    document.getElementById('audio_YouDied').play();

    // Reset les paramètres du jeu
    reset();

    ui.style.display                = "block";
    start_Screen.style.display      = "none";
    gameCanvas_Screen.style.display = "none";
    gameOver_Screen.style.display   = "block"
}

// M E T H O D E S  *********************************************************
function init()
{
    console.log('2) Initialisation');

    // Configurer le CANVAS
    // Get the canvas element from the DOM
    canvas = document.querySelector('canvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    context = canvas.getContext('2d');

    // Créer les objets du monde 
    createWorld();

    // Show UserInterface
    homeScreen();
}

function createWorld()
{
    console.log('3) Create World');

    // 6) Créer & centrer PLAYER au milieu de l'écran
    const xPlayerSpawn = canvas.width  / 2;
    const yPlayerSpawn = canvas.height / 2;
    player = new Player(xPlayerSpawn, yPlayerSpawn, 30, 'white');
    score = new Score(20, 30, 100, 0);
    projectiles = [];
    enemies = [];
    particles = [];

    ennemiesSpawnTimeInterval = 1000; // On définit le temps entre chaque spawn d'ennemis, ici 1 seconde
    
}

// On re-initialise tous nos objets à chaque nouvelle partie (reset)
function reset()
{
    createWorld();

    clearInterval(ennemiesInterval);
}

function gameLoop()
{
    console.log('GameLoop');

    animationFrame = requestAnimationFrame(gameLoop); // Va nous retourner à quelle frame on est


    // 1) U P D A T E 
    // Update the game objects 
    

    // 2) C O L L S I O N S
    // Detect collisions
    

    // 3) C L E A R
    // Clear canvas
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = 'rgba(0, 0, 0, 0.9)';            // On dessine un fond noir
    context.fillRect(0,0, canvas.width, canvas.height);  // Va nous remplir tout l'écran de noir

    // 4) D R A W
    // Draw the game objects
    updateAndDraw();

    // Draw the images on the canvas
    

    // A N I M A T I O N  L O O P
    // keep the game loop going - call gameLoop again
    //window.requestAnimationFrame( gameLoop );
}

function updateAndDraw()
{
        // PLAYER
        player.draw();

        // SCORE
        score.draw();
    
        // PARTICLES
        particles.forEach( (particle, index) => 
                            {
                                // supprimer les particles qui sont plus vieux que 1s
                                if( particle.alpha <= 0 )
                                {
                                    particles.splice(index, 1);
                                }
                                else{
                                    particle.update();
                                }
                                
                            } );
    
        // PROJECTILES
        projectiles.forEach((projectile, index) => 
                            {
                                projectile.update();
    
                                // Si le projectile sort de l'écran, on le supprime
                                if(projectile.x + projectile.radius < 0 || projectile.x - projectile.radius > canvas.width ||
                                   projectile.y + projectile.radius < 0 || projectile.y - projectile.radius > canvas.height)
                                {
                                    // Timeout permet de supprimer le projectile après un certain temps
                                    // Cela evite que les autres projectiles ne "blink" quand on tire
                                    setTimeout( () => 
                                    {
                                        projectiles.splice(index, 1);
                                    }, 0);
    
                                }
    
                            });
    
        // ENEMY
        enemies.forEach     ((enemy, index)   => // index sera la boucle sur laquelle on se trouve, nous permet de savoir QUEL enemy supprimer en cas de collision
                            {  
                                enemy.update();
    
                                // COLLISION ENEMY - PLAYER : On va vérifier si le joueur est en collision avec un ennemi 
                                // Math.hypot (x, y) = Distance entre 2 points, (x1-x2 , y1-y2)
                                const dist = Math.hypot( player.x - enemy.x  ,  player.y - enemy.y );
                                // COLLISION !
                                if(dist - enemy.radius - player.radius <= 0)
                                {
                                    // FIN DE JEU - GAME OVER
                                    console.log('Game Over!');    
                                    document.getElementById('audio_Manger').play();
                                    
                                    cancelAnimationFrame(animationFrame); // Arrête l'animation                            
                                    gameOver(); // On affiche l'écran de fin de jeu
                                }
    
    
                                // COLLISION ENEMY - PROJECTILE : Vérifie la collision entre le projectile et l'ennemi (collision)
                                projectiles.forEach( (projectile, projectileIndex) => // Index sera la boucle sur laquelle on se trouve avec le projectile
                                { 
                                    // Math.hypot (x, y) = Distance entre 2 points, (x1-x2 , y1-y2)
                                    const dist = Math.hypot( projectile.x - enemy.x  ,  projectile.y - enemy.y );
    
                                    // la distance fait le calcul du CENTRE des 2 points, on doit leur ajouter un rayon ! 
                                    // COLLISION !
                                    if(dist - enemy.radius - projectile.radius <= 0)
                                    {
                                        playAudio_Restart(document.getElementById('audio_impacte'));
                                        
                                        score.update();
    
                                        // create explosion particles 
                                        // On crée des particules quand on touche un ennemi
                                        for(let i = 0; i < Math.random() * 600; i++)
                                        {
                                            particles.push( new Particle( projectile.x, 
                                                                            projectile.y, 
                                                                            Math.random() * 2,
                                                                            enemy.color, 
                                                                            { 
                                                                                // On va créer des particules aléatoirement dans la direction du projectile
                                                                                // Puis lui multiplier la vitesse par un nombre aléatoire, pour qu'elles ne soient pas toutes identiques
                                                                                x: (Math.random() - 0.5) * (Math.random() *100),
                                                                                y: (Math.random() - 0.5) * (Math.random() *100)
                                                                            }  ) );
                                        }
    
                                        // Pour éviter que l'on dessine un ennemi qui ne se trouve plus dans sa liste, 
                                        // et ne pas avoir un BLINKING à l'écran, on va faire un timeout
                                        setTimeout (() => 
                                        {
                                            // On va dupprimer l'ennemi & le projectile de l'écran
                                            enemies.splice(index, 1);  // On supprime un seul ennemi à l'index de tableau ennemies
                                            projectiles.splice(projectileIndex, 1)
                                        }, 0)
    
    
                                        
                                    }
                                })
                            });
    
     
}

// 8) Spawner ennemis
function spawnEnemies()
{
    // Va apeller premier argument en callback, pour chaque intervalle spécifié
    ennemiesInterval = setInterval( () => 
    {
        console.log('SpawnEnemies');
        
        const radius = 30;
        let xEnemySpawn;
        let yEnemySpawn

        // Faire spawner les ennemis depuis tous les bords de l'écran
        // 50% de chance d'avoir un ennemi à gauche (bas haut) ou à droite(bas haut) de l'écran
        if(Math.random() < 0.5)
        {
            xEnemySpawn = Math.random() < 0.5 ? (0 - radius) : (canvas.width + radius);     // 50% chance de Spawn sur l'axe X à gauche ou à droite 
            yEnemySpawn = Math.random() * canvas.height;                                    // Spawn sur l'axe Y aléatoire
        }
        else
        {
            xEnemySpawn = Math.random() * canvas.width;                                     // Spawn sur l'axe X aléatoire
            yEnemySpawn = Math.random() < 0.5 ? (0 - radius) : (canvas.height + radius);    // 50% chance de Spawn sur l'axe X en haut ou en bas 
        }

        

        // Calcul de l'angle de notre ennemi, grâce à la distance entre notre joueur et le point de sa position actuelle.
        // Angle [radian] = atan2( Y, X)                              // Direction = Destination - Source 
        const angle = Math.atan2(   player.yPos - yEnemySpawn,        // Y = Player Y - Enemy Y                     // BUG POSSIBLE : un fois que le joueur a bougé, il ne sera plus dans l'axe de base du zombie               
                                    player.xPos - xEnemySpawn  );     // X = Player X - Enemy X

        // Objet Velocity pour notre projectile, permet d'avoir la vitesse & sa direction de tir
        let vitesseFacteur = 1.5;
        const velocity = 
        {
            // Auront des valeurs de nombres de -1 à 1
            // X & Y Velocity ensemble donneront un très bon ratio pour connaitre la direction de tir
            x: Math.cos(angle) * vitesseFacteur, 
            y: Math.sin(angle) * vitesseFacteur 
            
        }
        
        // const color = 'green';
        // hsl = high saturation lightness ( Color 0 à 360°, Deep color 0 à 100%, Bright or Dull0 à 100%)
        const color = `hsl(${Math.random() * 360}, 50%, 50% )` // Color aléatoire;

        enemies.push( new Enemy( xEnemySpawn, 
                                 yEnemySpawn, 
                                 radius, 
                                 color, 
                                 velocity ))

        ennemiesSpawnTimeInterval -= 400; // On va accélérer le spawn d'ennemis, en diminuant le temps entre chaque spawn
        if(ennemiesSpawnTimeInterval < 100)
        {
            ennemiesSpawnTimeInterval = 100;
        }
        console.log(ennemiesSpawnTimeInterval);
    }, 700 ); // On veut cette methode toutes les 1[s] = 1000 [ms]
}

function playAudio_Restart(audio_tir)
{
    // Jouer le son du projectile
    if(audio_tir.paused)
    {
        audio_tir.play();
    }
    else
    {
        audio_tir.currentTime = 0;
    }
}


// G A M E  O B J E C T S  *********************************************************

// 2) Definir le PLAYER
class Player 
{
    constructor(x, y, radius, color)
    {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
    }

    // Comment dessiner le Player sur l'écran, Ce que à quoi la classe ressemble
    draw()
    {
        context.beginPath(); // Dit au contexte que on veut dessiner sur l'écran
        // Dessiner un cercle
        context.arc( this.x, 
                 this.y, 
                 this.radius,  
                 0,             // Angle Start 0°
                 Math.PI*2,     // Angle End 360°
                 false);        // Ddraw counterclockwise
        context.fillStyle = this.color;
        context.fill(); // Permet de dessiner
                
    }

    // Comment la classe est utilisé pour être animé à l'écran
    update()
    {

    }

    // Getters
    get xPos()
    {
        return this.x;
    }
    get yPos()
    {
        return this.y;
    }
}

// 3) Définir PROJECTILE
class Projectile 
{
    constructor(x, y, radius, color, velocity, speed)
    {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.velocity = velocity;
        this.speed = speed;
    }

    // Ce que à quoi la classe ressemble
    draw()
    {
        context.beginPath(); // Dit au contexte que on veut dessiner sur l'écran
        // Dessiner un cercle
        context.arc( this.x, 
                 this.y, 
                 this.radius,  
                 0,             // Angle Start 0°
                 Math.PI*2,     // Angle End 360°
                 false);        // Draw counterclockwise
        
        context.fillStyle = this.color;
        context.fill(); // Permet de dessiner
    }

    // Comment la classe est utilisé pour être animé à l'écran
    update()
    {
        this.draw();
        // Calcul de la nouvelle position = direction & vitesse du projectile
        this.x = this.x + this.velocity.x * this.speed;
        this.y = this.y + this.velocity.y * this.speed;
    }
}

// 4) Définir ENEMY
class Enemy 
{
    constructor(x, y, radius, color, velocity)
    {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.velocity = velocity;
    }

    // Ce que à quoi la classe ressemble
    draw()
    {
        context.beginPath(); // Dit au contexte que on veut dessiner sur l'écran
        // Dessiner un cercle
        context.arc( this.x, 
                 this.y, 
                 this.radius,  
                 0,             // Angle Start 0°
                 Math.PI*2,     // Angle End 360°
                 false);        // Draw counterclockwise
        
        context.fillStyle = this.color;
        context.fill(); // Permet de dessiner
    }

    // Comment la classe est utilisé pour être animé à l'écran
    update()
    {
        this.draw();
        // Calcul de la nouvelle position = direction & vitesse du projectile
        this.x = (this.x + this.velocity.x) ;
        this.y = (this.y + this.velocity.y) ;
    }
}

// 5) Définir PARTICLE
const friction = 0.9; // Coefficient de friction, permet de réduire la vitesse de la particule, plus elle est grande, plus la particule va ralentir
class Particle 
{
    constructor(x, y, radius, color, velocity)
    {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.velocity = velocity;
        this.alpha = 1;         // Opacité, 1 = opaque, 0 = transparent
    }

    // Ce que à quoi la classe ressemble
    draw()
    {
        context.save(); // Sauvegarde le contexte actuel
        context.globalAlpha = this.alpha; // Dit au contexte quel est l'opacité 

        context.beginPath(); // Dit au contexte que on veut dessiner sur l'écran
        // Dessiner un cercle
        context.arc( this.x, 
                 this.y, 
                 this.radius,  
                 0,             // Angle Start 0°
                 Math.PI*2,     // Angle End 360°
                 false);        // Draw counterclockwise
        
        context.fillStyle = this.color;
        context.fill(); // Permet de dessiner

        context.restore(); // Restaure le contexte actuel, donc le contexte avant la sauvegarde
    }

    // Comment la classe est utilisé pour être animé à l'écran
    update()
    {
        this.draw();
        // Coefficient de friction, permet de réduire la vitesse de la particule, plus elle est grande, plus la particule va ralentir
        // Randomise friction entre 0.5 et 0.99
        this.friction = Math.random() * (0.99 - 0.5) + 0.5;
        this.velocity.x *= friction ;
        this.velocity.y *= friction ;
        // Calcul de la nouvelle position = direction & vitesse du projectile
        this.x = this.x + this.velocity.x ;
        this.y = this.y + this.velocity.y ;
        this.alpha -= 0.0025; // Diminue l'opacité de 0.01 à chaque frame
    }
}

// Définir score du joueur à afficher dans le canvas (Score)
class Score
{
    constructor(xPos, yPos, size, score)
    {
        this.xPos = xPos;
        this.yPos = yPos;
        this.size = size;
        this.score = score;
    }

    draw()
    {
        context.font = this.size +"% Arial";
        context.fillStyle = 'white';
        context.fillText(`Score : ${this.score}`, this.xPos, this.yPos);
    }

    update()
    {
        this.score += 10;
    }

    toString()
    {
     return this.score;
    }
}




// M A I N  ************************************************************************
// On lance le jeu au chargement de la page
console.log('Main : Start');

window.onload = init();

// 10) Event Listener, quand je clique, on a 1 projectile qui part
window.addEventListener('click',  (event) => // Event donnera les informations concernant le CLICK
{  
    // On ne fait le tir que quand on est en jeu, et non dans les menus
    if(gameCanvas_Screen.style.display == 'block')
    {
        console.log("Click");
    
        playAudio_Restart(document.getElementById('audio_tir'));
    
        /*console.log("Position du click :");
        console.log("Click X ="+event.clientX);
        console.log("Click Y ="+event.clientY);*/
    
        // Calcul de l'angle de notre projectile, grâce à la distance entre notre joueur et le point ou on clique.
        // Angle [radian] = atan2( Y, X)                                // Direction = Destination - Source
        const angle = Math.atan2(   event.clientY - player.yPos,        // Y = click Y - player Y               // BUG possible ici, si on bouge le perso, la balle va suivre la trajectoire du perso
                                    event.clientX - player.xPos  );     // X = click X - player X
    
        const radToDeg = angle * (180.0 / Math.PI);
        //console.log("Angle de : \n"+angle+" [rad] \n"+radToDeg+" [deg°]");
    
        // Objet Velocity pour notre projectile, permet d'avoir la vitesse & sa direction de tir
        const velocity = 
        {
            // Auront des valeurs de nombres de -1 à 1
            // X & Y Velocity ensemble donneront un très bon ratio pour connaitre la direction de tir
            x: Math.cos(angle), 
            y: Math.sin(angle)
        }
                 
    
        // A chaque click, on ajoute un projectile à notre liste de projectiles
        // Crée un projectile depuis le joueur à la direction de l'emplacement de la souris
        projectiles.push( new Projectile(  
                                player.xPos, 
                                player.yPos,
                                5,
                                'red',
                                velocity,
                                50
                            )
        );
    }

    
    
}
);

// On veut jouer la musique de fond en boucle
audio_background.addEventListener('ended', function() {
    this.currentTime = 0;
    this.play();
}, false);

console.log('Main : End');