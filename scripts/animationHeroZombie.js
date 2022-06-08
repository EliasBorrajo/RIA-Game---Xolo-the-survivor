let delay = 100;
let imgNumber = 0;
let totalimgNumber = 10;

var spritesHero = new Array();
var spritesZombie = new Array();

// Charger toutes les images dans le tableau
// Pour le hero
for (var i = 0; i < 10; i++) {
    spritesHero[i] = new Image();
    spritesHero[i].src = "ressources/images/Game_Assets/Hero/Hero-Guy-PNG/_Mode-Gun/01-Idle/JK_P_Gun__Idle_00"+i+".png";
    console.log(i +':'+spritesHero[i]);
}
// Pour le zombie
for (var i = 0; i < 10; i++) {
    spritesZombie[i] = new Image();
    spritesZombie[i].src = "ressources/images/Game_Assets/Zombies/Idle/__Zombie01_Idle_00"+i+".png";
    console.log(i +':'+spritesZombie[i]);
}

function switchImg() {  
    document.getElementById('dropZone').src = spritesHero[imgNumber].src;
    document.getElementById('dragZombie').src = spritesZombie[imgNumber].src;            
    imgNumber++;
    if(imgNumber >= totalimgNumber) {
        imgNumber = 0;
    }
}

function animate() {
    switchImg();
    setTimeout("animate()", delay);
}

window.onLoad = animate();