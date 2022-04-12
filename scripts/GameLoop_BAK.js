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
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    context = canvas.getContext('2d');

    // Créer les objets du monde 
    createWorld();


    // Lancer la gameloop la première fois, qui se lancera à l'infini
    window.requestAnimationFrame( gameLoop );  
}


function gameLoop()
{
    console.log('GameLoop');

    // Update the game objects 
    for (let i = 0; i < gameObjects.length; i++)
    {
        gameObjects[i].update();
    }

    // Detect collisions
    detectCollisions();

    // Clear canvas
    context.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the game objects
    for (let i = 0; i < gameObjects.length; i++)
    {
        gameObjects[i].draw();
    }

    // Draw the images on the canvas
    let img = document.getElementById("myImage");
    context.imageSmoothingEnabled = true;
    context.imageSmoothingQuality = "high";
    context.drawImage(img, 100, 100, img.width /2, img.height /2);
    
    // keep the game loop going - call gameLoop again
    window.requestAnimationFrame( gameLoop );
}

/*
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
*/
// G A M E  O B J E C T S  *********************************************************
let gameObjects;
function createWorld()
{
    console.log('Create World');

    gameObjects = 
    [
        new Square(context, 250,  50,   0,  50),
        new Square(context, 250, 300,   0, -50),
        new Square(context, 150,   0,  50,  50),
        new Square(context, 250, 150,  50,  50),
        new Square(context, 350,  75, -50,  50),
        new Square(context, 300, 300,  50, -50)
    ]


}

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
    // Définit l'image du carré
    static sprite;
    static frameWidth = 0;
    static frameHeight = 0;


    constructor (context, x, y, vx, vy)
    {
        super   (context, x, y, vx, vy);

        // Set default width and height
        this.width = 50;
        this.height = 50;

        // Ajouter l'image au carré
        //loadImage();
    }

    draw()
    {
        // Draw a simple square
        this.context.fillStyle = this.isColliding?'#ff8080':'#0099b0';
        this.context.fillRect(this.x, this.y, this.width, this.height);

    }

    update()
    {
        // Move with set velocity
        this.x += this.vx * 0.01;
        this.y += this.vy * 0.001;
    }

    loadImage()
    {
        // Vérfie si une image existe déja 
        if( !this.sprite )
        {
            // No image found, create a new element
            this.sprite = new Image();

            // Load the image from multiple images in one sprite sheet
            /*this.sprite.onload = () =>
            {
                // Define the size of the frame
                this.frameWidth = this.sprite.width / this.numColumns;
                this.frameHeight = this.sprite.height / this.numRows;
            }*/

            // Load the image
            this.sprite.src = "/ressources/images/Tutorial/potion_image.png";
        }

    }
}

function detectCollisions()
{
    let obj1;
    let obj2;

    // Reset collsiion flag for all objects
    for (let i = 0; i < gameObjects.length; i++)
    {
        gameObjects[i].isColliding = false;
    }

    // Check for collisions
    for (let i = 0; i < gameObjects.length; i++)
    {
        obj1 = gameObjects[i];

        // You don't have to check objects twice. 
        // If they overlap the first time, they will too the second time. 
        // And of course, you don't have to check an object against itself,
        // it would always overlap.
        for(let j = i +1; j < gameObjects.length; j++)
        {
            obj2 = gameObjects[j];

            // Compare obj1 & obj2
            if ( rectIntersect(obj1, obj2) )
            {
                // Set collision flag
                obj1.isColliding = true;
                obj2.isColliding = true;
            }
        }
    }
}

function rectIntersect(obj1, obj2) 
{
    x1 = obj1.x;
    y1 = obj1.y;
    w1 = obj1.width;
    h1 = obj1.height;

    x2 = obj2.x;
    y2 = obj2.y;
    w2 = obj2.width;
    h2 = obj2.height;

    // Check x and y for overlap
    if (x2 > w1 + x1 || 
        x1 > w2 + x2 || 
        y2 > h1 + y1 || 
        y1 > h2 + y2)
    {
        return false;
    }
   
    return true;
}






// M A I N  ************************************************************************
// On lance le jeu au chargement de la page

console.log('Main 1');

window.onload = init();

console.log('Main 2');