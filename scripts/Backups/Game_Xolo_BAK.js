
const customer = new Customer(); //TEST AJOUTER FICHIERS
console.log(customer.getName());

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
        ctx.save(); // Sauvegarde le contexte actuel
        ctx.globalAlpha = this.alpha; // Dit au contexte quel est l'opacité 

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

        ctx.restore(); // Restaure le contexte actuel, donc le contexte avant la sauvegarde
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

// Classe du score du joueur à afficher dans le canvas (Score)
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
        ctx.font = this.size + "px Arial";
        ctx.fillStyle = 'white';
        ctx.fillText(`Score : ${this.score}`, this.xPos, this.yPos);
    }

    update()
    {
        this.score += 10;
    }

}




// 6) Créer & centrer PLAYER au milieu de l'écran
const xPlayerSpawn = canvas.width  / 2;
const yPlayerSpawn = canvas.height / 2;
const player = new Player(xPlayerSpawn, yPlayerSpawn, 30, 'white');

// 6) Créer des tableaux par types, contenant chacun une famille d'objets à dessiner à l'écran en même temps
// Créer un tableau contenant, tous les projectiles, & un autre tous les ennemis, à dessiner en même temps
const projectiles = [];
const enemies = [];
const particles = [];
const score = new Score(20, 30, 15, 0);

// On re-initialise tous nos objets à chaque nouvelle partie (reset)
function init()
{
    xPlayerSpawn = canvas.width  / 2;
    yPlayerSpawn = canvas.height / 2;
    player = new Player(xPlayerSpawn, yPlayerSpawn, 30, 'white');

    projectiles = [];
    enemies = [];
    particles = [];
    score = new Score(20, 30, 15, 0); 
}


// Définition des différentes fonctions
// 8) Spawner ennemis
function spawnEnemies()
{
    // Va apeller premier argument en callback, pour chaque intervalle spécifié
    setInterval( () => 
    {
        
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
        const velocity = 
        {
            // Auront des valeurs de nombres de -1 à 1
            // X & Y Velocity ensemble donneront un très bon ratio pour connaitre la direction de tir
            x: Math.cos(angle), 
            y: Math.sin(angle)
            
        }
        
        // const color = 'green';
        // hsl = high saturation lightness ( Color 0 à 360°, Deep color 0 à 100%, Bright or Dull0 à 100%)
        const color = `hsl(${Math.random() * 360}, 50%, 50% )` // Color aléatoire;

        enemies.push( new Enemy( xEnemySpawn, 
                                 yEnemySpawn, 
                                 radius, 
                                 color, 
                                 velocity ))

        

    }, 1000 ); // On veut cette methode toutes les 1[s] = 1000 [ms]
}

// 9) Animation loop frame by frame (60fps)
//    La methode s'apelle elle même, donc est apellé à l'infini
let animationFrame;
function animate() 
{
    // How many frames par seconds is the game running at?
    // 60fps = 1 frame par seconde --> 1s = 1000ms
    // 1000ms / 60fps = 16.66ms = 1 frame = 1 update = 1 draw = 1 animation loop

    


    // On dessine tous les objets à l'écran
    animationFrame = requestAnimationFrame(animate); // Va nous retourner à quelle frame on est
    ctx.clearRect(0,0, canvas.width, canvas.height); // Va nous effacer tout l'écran, pour que l'animation ne se supperpose pas
    ctx.fillStyle = 'rgba(0, 0, 0, 0.9)';         // On dessine un fond noir
    ctx.fillRect(0,0, canvas.width, canvas.height);  // Va nous remplir tout l'écran de noir


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
    projectiles.forEach((projectile, index) => {
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
                                console.log('Game Over!');    
                                cancelAnimationFrame(animationFrame); // Arrête l'animation                            
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
                                    score.update();

                                    // create explosion particles 
                                    // On crée des particules quand on touche un ennemi
                                    for(let i = 0; i < Math.random() * 100; i++)
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


// 10) Event Listener, quand je clique, on a 1 projectile qui part
window.addEventListener('click',  (event) => {  // Event donnera les informations concernant le CLICK
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
                        );


             


// 11) Appel de la game loop infinie d'animation ---> Apellé à chaque frame                     
animate();

// 12) Callback methode ---> Apellé à chaque X temps defini dans la fontion (ici 1[s])
spawnEnemies();



