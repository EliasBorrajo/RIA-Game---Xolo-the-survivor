let delay = 100;
let imgNumber = 0;
let totalimgNumber = 10;

var sprites = new Array();

// Charger toutes les images dans le tableau
for (var i = 0; i < 10; i++) {
    sprites[i] = new Image();
    sprites[i].src = "ressources/images/Game_Assets/Hero/Hero-Guy-PNG/_Mode-Gun/01-Idle/JK_P_Gun__Idle_00"+i+".png";
    console.log(i +':'+sprites[i]);
}

function switchImg() {  
    document.getElementById('heroImg').src = sprites[imgNumber].src;           
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