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

    // Comment dessiner le Player sur l'écran
    draw()
    {
        ctx.beginPath(); // Dit au contexte que on veut dessiner sur l'écran
        // Dessiner un cercle
        ctx.arc( this.x, this.y, this.radius,  
                 0, Math.PI*2, false); // Angle start , end, draw counterclockwise
        ctx.fillStyle = this.color;
        ctx.fill(); // Permet de dessiner
                
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

    draw()
    {
        ctx.beginPath(); // Dit au contexte que on veut dessiner sur l'écran
        // Dessiner un cercle
        ctx.arc( this.x, this.y, this.radius,  
                 0, Math.PI*2, false); // Angle start , Angle end, draw counterclockwise
        ctx.fillStyle = this.color;
        ctx.fill(); // Permet de dessiner
    }
}


// 3) Créer & centrer PLAYER
const x = canvas.width / 2;
const y = canvas.height / 2;

const player = new Player(x, y, 30, 'blue')
player.draw();
console.log(player);

// 5) Event Listener, quand je clicque, on a 1 projectile qui part
window.addEventListener('click', 
                        () => {
                            console.log('go');
                        }
                        );




