// A T T R I B U T S  *********************************************************
console.log('Hello World');
let canvas;
let context;

let rectX = 10;
let rectY = 10;



// M E T H O D E S  *********************************************************
function init()
{
    console.log('init');

    // Get the canvas element from the DOM
    canvas = document.querySelector('canvas');
    context = canvas.getContext('2d');

    // Lancer la gameloop la première fois, qui se lancera à l'infini
    window.requestAnimationFrame(gameLoop);  
}


function gameLoop()
{
    console.log('GameLoop');

    update();
    draw();

    // keep the game loop going - call gameLoop again
    window.requestAnimationFrame( gameLoop );
}

function draw()
{
    console.log('Draw');
    
    // clear the canvas
    context.clearRect(0, 0, canvas.width, canvas.height);

    // draw in canvas
    context.fillStyle = '#ff8080';
    context.fillRect(rectX, rectY, 150, 100);

}

function update()
{
    console.log('Update');

    rectX += 1;
    rectY += 1;
}

// G A M E  O B J E C T S  *********************************************************
class GameObject
{
    constructor (context, x, y, vx, vy)
    {
        this.context = context;
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;

        this.isColliding = false;
    }

    
}

class Square extends GameObject
{
    constructor (context, x, y, vx, vy)
    {
        super   (context, x, y, vx, vy);

        // Set default width and height
        this.width = 50;
        this.height = 50;
    }

    draw()
    {
        // Draw a simple square
        this.context.fillStyle = this.isColliding?'#ff8080':'#0099b0';
        this.context.fillRect(this.x, this.y, this.width, this.height);
    }

    update(secondsPassed)
    {
        // Move with set velocity
        this.x += this.vx * secondsPassed;
        this.y += this.vy * secondsPassed;
    }
}




// M A I N  ************************************************************************
// On lance le jeu au chargement de la page

console.log('Main 1');

window.onload = init();

console.log('Main 2');