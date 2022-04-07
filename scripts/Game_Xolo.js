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

// 4) Définir PROJECTILE
class Projectile 
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

// 9) Définir ENEMY
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




// 3) Créer & centrer PLAYER
const xCenter = canvas.width  / 2;
const yCenter = canvas.height / 2;

const player = new Player(xCenter, yCenter, 30, 'blue')
console.log(player);


// 8) Créer un tableau contenant tous les projectiles à dessiner en même temps
const projectiles = [];
// 11)Créer un tableau contenant tous les ennemis à dessiner en même temps
const enemies = [];

// 10) Spawner ennemis
function spawnEnemies()
{
    // Va apeller premier argument en callback, pour chaque intervalle spécifié
    setInterval( () => {
        
        const radius = 30;
        let xEnemySpawn;
        let yEnemySpawn

        // 50% de chance 
        if(Math.random() < 0.5)
        {
            xEnemySpawn = Math.random() < 0.5 ? (0 - radius) : (canvas.width + radius);     // 50% chance de Spawn sur l'axe X à gauche ou à droite 
            yEnemySpawn = Math.random() * canvas.height;                                    // Spawn sur l'axe Y aléatoire
        }
        else
        {
            xEnemySpawn = Math.random() * canvas.width;                                     // Spawn sur l'axe X aléatoire
            yEnemySpawn = Math.random() < 0.5 ? (0 - radius) : (canvas.height + radius);    // 50% chance de Spawn sur l'axe X à gauche ou à droite 
        }

        const color = 'green';

        // Calcul de l'angle de notre ennemi, grâce à la distance entre notre joueur et le point de sa position actuelle.
        // Angle [radian] = atan2( Y, X)                              // Direction = Destination - Source 
        const angle = Math.atan2(   player.xPos - xEnemySpawn,        // Y = Player Y - Enemy Y                     // BUG POSSIBLE : un fois que le joueur a bougé, il ne sera plus dans l'axe de base du zombie               
                                    player.yPos - yEnemySpawn  );     // X = Player X - Enemy X

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

// 6) Animation loop
//    La methode s'apelle elle même, donc est apellé à l'infini
function animate() 
{
    requestAnimationFrame(animate);
    ctx.clearRect(0,0, canvas.width, canvas.height); // Va nous effacer tout l'écran, pour que l'animation ne se supperpose pas

    // PLAYER
    player.draw();

    // PROJECTILES
    projectiles.forEach(    (projectile) => {
                                projectile.update();
                            })

    // ENEMY
    enemies.forEach     (    (enemy)   => {
                                enemy.update();
                            })

}


// 5.1) Event Listener, quand je clique, on a 1 projectile qui part
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
                                    // 5.2) Crée un projectile depuis le joueur à la direction de l'emplacement de la souris
                                    projectiles.push( new Projectile(  
                                                            player.xPos, 
                                                            player.yPos,
                                                            5,
                                                            'red',
                                                            velocity
                                                        )
                                    );
                                    
                                }
                        );


// 7) Appel de la game loop infinie d'animation ---> Apellé à chaque frame                     
animate();

// Callback methode ---> Apellé à chaque X temps defini dans la fontion (ici 1[s])
spawnEnemies();


