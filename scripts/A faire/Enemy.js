// 4) Définir ENEMY
class Enemy extends BoardObject
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