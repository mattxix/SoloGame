
var c = document.querySelector(`canvas`)
var ctx = c.getContext(`2d`)
var fps = 1000/60
var timer = setInterval(main, fps)
var startTime = Date.now(); 
var elapsedTime = 0; 


function updateTimer() {
    // Calculate the elapsed time in seconds
    elapsedTime = (Date.now() - startTime) / 1000;
    //Updates Clock
    var roundedTime = Math.round(elapsedTime * 100) / 100;
     // Display clock
     ctx.font = "20px Arial";
     ctx.fillStyle = "black";
     ctx.textAlign = "left";
     ctx.textBaseline = "middle";
     ctx.fillText("Time: " + roundedTime, 10, 20);
}
function main()
{
    ctx.clearRect(0,0,c.width,c.height); 
    state();
}

//setup
var state;
var button = new GameObject();
var tryAgainButton = new GameObject();
var avatar = new GameObject();
var wall = new GameObject();
var level = new GameObject();
var sword = new GameObject();
var wall = [];
var lazerAttack = new GameObject();
var lazerAttack = [];
var health = 100;
//Allows me to Change when the lazer does Damage
var isDamageActive = false;

//Allows to call the lazer on
function startLaserAttack() {
    laserAttack[0].isActive = true;
}
//Enable damage during a specific phase
function activateDamage() {
    isDamageActive = true;
}

//Disable damage after the phase ends
function deactivateDamage() {
    isDamageActive = false;
}



function init()
{
    state = menu
    //Reset Clock
    startTime = Date.now(); 
    elapsedTime = 0;
    //Reset Health
    health = 100;

    avatar.color = `#8caba1`; 
    //reset the avatar to the center 
    avatar.vx = 0;
    avatar.vy = 0;
    avatar.x = c.width / 2 ; 
    avatar.y = c.height / 2 + avatar.h / 2 ;
    //buttonSize
    button.w = 100;
    button.h = 50;
    

    level.x = 0; 
    level.y = 0;

    //top Wall
    wall[0]=new GameObject();
    wall[0].h =  10;
    wall[0].w = c.width - 400;
    wall[0].color = `#000000`;
    wall[0].x = c.width/2;
    wall[0].y = c.height - 100;
    wall[0].world = level;
    //bottom wall
    wall[1]=new GameObject();
    wall[1].h = 10;
    wall[1].w = c.width - 400;
    wall[1].color = `#000000`
    wall[1].x = c.width/2;
    wall[1].y = c.height - 450 
    wall[1].world = level
    //left wall
    wall[2]=new GameObject();
    wall[2].h = 357;
    wall[2].w = 10;
    wall[2].color = `#000000`
    wall[2].x = 200;
    wall[2].y = c.height/2 + 34.5
    wall[2].world = level
    //right wall
    wall[3]=new GameObject();
    wall[3].h = 357;
    wall[3].w = 10;
    wall[3].color = `#000000`
    wall[3].x = 900;
    wall[3].y = c.height/2 + 34.5
    wall[3].world = level

    //All lazer attacks
    lazerAttack[0]=new GameObject();
    lazerAttack[0].h =  50;
    lazerAttack[0].w = c.width - 400;
    lazerAttack[0].color = `#000000`
    lazerAttack[0].x = c.width/2;
    lazerAttack[0].y = c.height - 150;
    lazerAttack[0].isActive = false;
    lazerAttack[0].world = level;

    lazerAttack[1]=new GameObject();
    lazerAttack[1].h =  50;
    lazerAttack[1].w = c.width - 400;
    lazerAttack[1].color = `#000000`
    lazerAttack[1].x = c.width/2;
    lazerAttack[1].y = c.height - 400;
    lazerAttack[1].isActive = false;
    lazerAttack[1].world = level;



    sword.color = `#000000`;
}



init();

/*---------------Game Screens (states)----------------*/
function menu()
{
    if(clicked(button))
    {
        state = game;
    }
    button.render()
}

function win()
{

}
function lose()
{
    //display lose screen
    ctx.clearRect(0,0,c.width,c.height);
    ctx.font = "20px Arial";
     ctx.fillStyle = "black";
     ctx.textAlign = "center";
     ctx.textBaseline = "center";
     ctx.fillText("Time Survived: " + roundedTime, c.width/2, c.height/2 - 50);
     ctx.fillText("You Died", c.width/2 , c.height/2 -100); 
     //try again button
     if(clicked(button))
        {
            state = game;
            init();
        }
            button.render();
}

function game()
{

    //Displays Health
    var roundedHealth = Math.round(health);
    ctx.font = "20px Arial";
     ctx.fillStyle = "black";
     ctx.textAlign = "middle";
     ctx.textBaseline = "middle";
     ctx.fillText("Health: " + roundedHealth, c.width/2 -50 , c.height/2 + 250);
    
    updateTimer();
    //renders off screen
    sword.x = 10000;
    if(a == true)
    {
        avatar.vx += -2;
    }
    if(d == true)
    {
        avatar.vx += 2;
    }
    if(w == true)
    {
        avatar.vy += -2;
    }
    if(s == true)
    {
        avatar.vy += 2;
    }
    if(up == true)
    {
        sword.x = avatar.top().x;
        sword.y = avatar.top().y - 20;
        sword.w = 50;
        sword.h = 45;
    }
    if(down == true)
    {
        sword.x = avatar.bottom().x;
        sword.y = avatar.bottom().y + 20;
        sword.w = 50;
        sword.h = 45;
    }
    if(left == true)
    {
        sword.x = avatar.left().x - 20;
        sword.y = avatar.left().y;
        sword.h = 50;
        sword.w = 45;
    }
    if(right == true)
    {
        sword.x = avatar.right().x + 20;
        sword.y = avatar.right().y;
        sword.h = 50;
        sword.w = 45;
    }
    avatar.vx *= .85;
    avatar.vy *= .85;
    avatar.move();

    /*
    for (let i = 0; i < lazerAttack.length; i++) {
        if (isDamageActive) { 
            if (lazerAttack[i].isOverPoint(avatar.bottom()) ||
                lazerAttack[i].isOverPoint(avatar.top()) ||
                lazerAttack[i].isOverPoint(avatar.left()) ||
                lazerAttack[i].isOverPoint(avatar.right())) {
                health -= 1;
            }
        }
    }
    */
    if (laserAttack[0].isActive) {
        laserAttack[0].render(); // Draw the laser
        if (laserAttack[0].isOverPoint(avatar)) {
            health -= 1; // Damage the player if they touch the laser
        }
    }

    //used to move the level. 
    var offset = {x:avatar.vx, y:avatar.vy}
    //is avatar touching wall
    for(let i=0; i<wall.length; i++)
    {
        while(wall[i].isOverPoint(avatar.bottom()))
        {
            avatar.vy = 0;
            avatar.y--;
            offset.y--;
        }
        while(wall[i].isOverPoint(avatar.top()))
        {
            avatar.vy = 0;
            avatar.y++;
            offset.y++;
        }
        while(wall[i].isOverPoint(avatar.left()))
        {
            avatar.vx = 0;
            avatar.x++;
            offset.x++;
        }
        while(wall[i].isOverPoint(avatar.right()))
        {
            avatar.vx = 0;
            avatar.x--;
            offset.x--;
        }
      
    }
    
    // MAIN ATTACK SEQUENCE
    if(elapsedTime >= 3 && elapsedTime <= 6){
        lazerAttack[0].isActive = true;
        lazerAttack[1].isActive = true;
         
    }

    
        if(health <= 0 )
            {
                roundedTime = Math.round(elapsedTime * 100) / 100;
                state = lose;  

            }
        

    /*-------Level movement threshold----*/
    //if(avatar.x > 500 || avatar.x < 300)
    /*{
        //Level movement code
        level.x -= offset.x;
        avatar.x -= offset.x;
        level.y -= offset.y;
        avatar.y -= offset.y;
    }*/

    /*----- Camera Code -----------
        var dx = c.width/2 - avatar.x
        var dy = c.height/2 - avatar.y
        
        level.x += dx*.05; 
        avatar.x += dx*.05; 
        level.y += dy*.15; 
        avatar.y += dy*.15; 
    ----------------------------*/
    
    
   for(let i=0;i<wall.length; i++)
   {
    wall[i].render();
   }
    
   /*for(let i=0;i<lazerAttack.length; i++)
   {
    lazerAttack[i].render();
   }
   */
   for(let i=0;i<lazerAttack.length; i++){
        if (laserAttack[i].isActive) {
        // Perform laser's actions 
        laserAttack[i].render();
    }
   }
   
      sword.render();
    avatar.render();
    
}



