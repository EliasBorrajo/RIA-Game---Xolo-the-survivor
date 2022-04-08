// 1) configurer le CANVAS
// On récupère les, élements de la balise "canvas", que on attribue dans une variable constante (FINAL)
const canvas = document.querySelector('canvas');
canvas.width  = window.innerWidth; // Prend la largeur complète de la fenêtre
canvas.height = window.innerHeight; // Prend la heuteur compète de la fenêtre 
console.log(canvas);

// Contexte du canvas = API du CANVAS qui nous permet de DESSINER sur le canvas.
// Ce sera notre objet canvas qui détient toute ses paramètres, objet sur lequelle on va pouvoir dessiner.
const ctx = canvas.getContext('2d');
console.log(ctx);




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
        ctx.beginPath(); // Dit au contexte que on veut dessiner sur l'écran
        // Dessiner un cercle
        ctx.arc( this.x, 
                 this.y, 
                 this.radius,  
                 0,             // Angle Start 0°
                 Math.PI*2,     // Angle End 360°
                 false);        // Ddraw counterclockwise
        ctx.fillStyle = this.color;
        ctx.fill(); // Permet de dessiner
                
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
        ctx.beginPath(); // Dit au contexte que on veut dessiner sur l'écran
        // Dessiner un cercle
        ctx.arc( this.x, 
                 this.y, 
                 this.radius,  
                 0,             // Angle Start 0°
                 Math.PI*2,     // Angle End 360°
                 false);        // Draw counterclockwise
        
        ctx.fillStyle = this.color;
        ctx.fill(); // Permet de dessiner
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
        ctx.beginPath(); // Dit au contexte que on veut dessiner sur l'écran
        // Dessiner un cercle
        ctx.arc( this.x, 
                 this.y, 
                 this.radius,  
                 0,             // Angle Start 0°
                 Math.PI*2,     // Angle End 360°
                 false);        // Draw counterclockwise
        
        ctx.fillStyle = this.color;
        ctx.fill(); // Permet de dessiner
    }

    // Comment la classe est utilisé pour être animé à l'écran
    update()
    {
        this.draw();
        // Calcul de la nouvelle position = direction & vitesse du projectile
        this.x = this.x + this.velocity.x ;
        this.y = this.y + this.velocity.y ;
    }
}




// 5) Créer & centrer PLAYER au milieu de l'écran
const xPlayerSpawn = canvas.width  / 2;
const yPlayerSpawn = canvas.height / 2;

const player = new Player(xPlayerSpawn, yPlayerSpawn, 30, 'blue')
console.log(player);

// 6) Créer des tableaux par types, contenant chacun une famille d'objets à dessiner à l'écran en même temps
// Créer un tableau contenant, tous les projectiles, & un autre tous les ennemis, à dessiner en même temps
const projectiles = [];
const enemies = [];

// Définition des différentes fonctions
// 8) Spawner ennemis
function spawnEnemies()
{
    // Va apeller premier argument en callback, pour chaque intervalle spécifié
    setInterval( () => {
        
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

        const color = 'green';

        // Calcul de l'angle de notre ennemi, grâce à la distance entre notre joueur et le point de sa position actuelle.
        // Angle [radian] = atan2( Y, X)                              // Direction = Destination - Source 
        const angle = Math.atan2(   player.yPos - yEnemySpawn,        // Y = Player Y - Enemy Y                     // BUG POSSIBLE : un fois que le joueur a bougé, il ne sera plus dans l'axe de base du zombie               
                                    player.xPos - xEnemySpawn  );     // X = Player X - Enemy X

        // Objet Velocity pour notre projectile, permet d'avoir la vitesse & sa direction de tir
        const velocity = 
        {
            // Auront des valeurs de nombres de -1 à 1
            // X & Y Velocity ensemble donneront un très bon ratio pour connaitre la direction de tir
            x: Math.cos(angle), 
            y: Math.sin(angle)
            
        }

        enemies.push( new Enemy( xEnemySpawn, 
                                 yEnemySpawn, 
                                 radius, 
                                 color, 
                                 velocity ))

        console.log(enemies);

    }, 1000 ); // On veut cette methode toutes les 1[s] = 1000 [ms]
}

// 9) Animation loop frame by frame (60fps)
//    La methode s'apelle elle même, donc est apellé à l'infini
function animate() 
{
    // How many frames par seconds is the game running at?
    // 60fps = 1 frame par seconde
    // 1s = 1000ms
    // 1000ms / 60fps = 16.66ms
    // 16.66ms = 1 frame
    // 1 frame = 1 update
    // 1 update = 1 draw
    // 1 draw = 1 frame
    // 1 frame = 1 animation loop

    requestAnimationFrame(animate);
    ctx.clearRect(0,0, canvas.width, canvas.height); // Va nous effacer tout l'écran, pour que l'animation ne se supperpose pas

    /* COPILOT
    // A chaque frame, on va vérifier si l'ennemi a été touché par un projectile (collision) 
    // Si c'est le cas, on va le supprimer du tableau
    enemies.forEach( (enemy, index) => {
        // On va vérifier si l'ennemi a été touché par un projectile
        projectiles.forEach( (projectile) => {
            // On va vérifier si la distance entre le projectile et l'ennemi est inférieur à la somme de leur rayon
            // Si c'est le cas, on va supprimer l'ennemi
            if( Math.sqrt( Math.pow(enemy.x - projectile.x, 2) + Math.pow(enemy.y - projectile.y, 2) ) < enemy.radius + projectile.radius )
            {
                // On va supprimer l'ennemi
                enemies.splice(index, 1);
            }
        });
    });

    // A chaque frame, on va vérifier si le player a été touché par un ennemi (collision) 
    // Si c'est le cas, le jeu se termine (game over)
    enemies.forEach( (enemy) => {
        // On va vérifier si le player a été touché par un ennemi
        if( Math.sqrt( Math.pow(enemy.x - player.xPos, 2) + Math.pow(enemy.y - player.yPos, 2) ) < enemy.radius + player.radius )
        {
            // On va supprimer tous les ennemis
            enemies.splice(0, enemies.length);
            // On va supprimer tous les projectiles
            projectiles.splice(0, projectiles.length);
            // On va supprimer le player
            player.destroy();
            
        }
    });*/


    // PLAYER
    player.draw();

    // PROJECTILES
    projectiles.forEach((projectile) => {
                            projectile.update();
                        });

    // ENEMY
    enemies.forEach     ((enemy, index)   => {  // index sera la boucle sur laquelle on se trouve, nous permet de savoir QUEL enemy supprimer en cas de collision
                            enemy.update();

                            // Vérifie la collision entre le projectile et l'ennemi (collision)
                            projectiles.forEach( (projectile, projectileIndex) => { // Index sera la boucle sur laquelle on se trouve avec le projectile
                                // Math.hypot (x, y) = Distance entre 2 points, (x1-x2 , y1-y2)
                                const dist = Math.hypot( projectile.x - enemy.x  ,  projectile.y - enemy.y );

                                // la distance fait le calcul du CENTRE des 2 points, on doit leur ajouter un rayon ! 
                                // COLLISION !
                                if(dist - enemy.radius - projectile.radius < 1)
                                {
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


// 10) Event Listener, quand je clique, on a 1 projectile qui part
window.addEventListener('click',  (event) => {  // Event donnera les informations concernant le CLICK
                                    console.log("Position du click :");
                                    console.log("Click X ="+event.clientX);
                                    console.log("Click Y ="+event.clientY);

                                    // Calcul de l'angle de notre projectile, grâce à la distance entre notre joueur et le point ou on clique.
                                    // Angle [radian] = atan2( Y, X)                                // Direction = Destination - Source
                                    const angle = Math.atan2(   event.clientY - player.yPos,        // Y = click Y - player Y               // BUG possible ici, si on bouge le perso, la balle va suivre la trajectoire du perso
                                                                event.clientX - player.xPos  );     // X = click X - player X

                                    const radToDeg = angle * (180.0 / Math.PI);
                                    console.log("Angle de : \n"+angle+" [rad] \n"+radToDeg+" [deg°]");

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
                        );


             


// 11) Appel de la game loop infinie d'animation ---> Apellé à chaque frame                     
animate();

// 12) Callback methode ---> Apellé à chaque X temps defini dans la fontion (ici 1[s])
spawnEnemies();


