function startGame()
{
    let start_Screen = document.getElementById("start");
    let gameCanvas_Screen = document.getElementById("canvas");
    let gameOver_Screen = document.getElementById("gameOver");

    start_Screen.style.display = "none";
    gameCanvas_Screen.style.display = "block";
    gameOver_Screen.style.display = "none"
    
}

function gameOver()
{
    let start_Screen = document.getElementById("start");
    let gameCanvas_Screen = document.getElementById("canvas");
    let gameOver_Screen = document.getElementById("gameOver");

    start_Screen.style.display = "none";
    gameCanvas_Screen.style.display = "none";
    gameOver_Screen.style.display = "block"
}