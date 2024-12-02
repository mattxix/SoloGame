
var c = document.querySelector(`canvas`)
var ctx = c.getContext(`2d`)
var fps = 1000/60
var timer = setInterval(main, fps)
var startTime = Date.now(); 
var elapsedTime = 0; 


function updateTimer() {
    // Calculate the time in seconds
    elapsedTime = (Date.now() - startTime) / 1000;
    //Round the time
    var roundedTime = Math.round(elapsedTime * 100) / 100;
    //var milliseconds = roundedTime%1000;
    var seconds = Math.floor(elapsedTime % 60);
    var minutes = Math.floor(elapsedTime / 60);
     // Display clock
     ctx.font = "20px Arial";
     ctx.fillStyle = "black";
     ctx.textAlign = "left";
     ctx.textBaseline = "middle";
     //ctx.fillText("Time: " + minutes + "Seconds: " + seconds, 10, 20);
     if(roundedTime<10){
        ctx.fillText(`Time: ${minutes}:0${roundedTime}`, 10, 20);
     }else{
        ctx.fillText(`Time: ${minutes}:${roundedTime}`, 10, 20);
     }
    
    
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
var shield = new GameObject();
var wall = [];
var lazerAttack = new GameObject();
var lazerAttack = [];
var health = 100;
var backdrop = new GameObject(); //Display the Game Backdrop Animation


//Allows me to Change when the lazer does Damage
var isDamageActive = false;

//Allows to call the lazer on
function startLazerAttack() {
    lazerAttack[0].isActive = true;
}
//Allows to call the lazer off
function endLazerAttack() {
    lazerAttack[0].isActive = false;
}
//Enable damage during a specific phase
function activateDamage() {
    isDamageActive = true;
}

//Disable damage after the phase ends
function deactivateDamage() {
    isDamageActive = false;
}
//Lazer animation
let lazerFrames = [];
let currentFrame = 0;
let frameDelay = 100; // Delay in milliseconds between frames
let lastFrameTime = 0;

//Preload the frames
for (let i = 0; i < 5; i++) { // Assuming 5 frames
    let img = new Image();
    img.src = `images/lazerFrames/frame${i}.png`;
    lazerFrames.push(img);
}

function renderlazerAttack(lazer, timestamp) {
    //Check if it's time to advance to the next frame
    if (timestamp - lastFrameTime > frameDelay) {
        currentFrame = (currentFrame + 1) % lazerFrames.length; //Loop through frames
        lastFrameTime = timestamp;
    }

    //Draw the current frame of the lazer
    ctx.drawImage(
        lazerFrames[currentFrame],
        lazer.x,
        lazer.y,
        lazer.w,
        lazer.h
    );
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
    //Reset the avatar to the center 
    avatar.vx = 0;
    avatar.vy = 0;
    avatar.x = c.width / 2 ; 
    avatar.y = c.height / 2 + avatar.h / 2 ;
    //ButtonSize
    button.w = 100;
    button.h = 50;
    
    //Level Size
    level.x = 0; 
    level.y = 0;

    //Define Backdrop
    backdrop.w = c.width;
    backdrop.h = c.height; 
    backdrop.x = c.width/2;
    backdrop.y = c.height/2;
    backdrop.color = `grey`
    backdrop.world = level;


    //top Wall
    wall[0]=new GameObject();
    wall[0].h =  10;
    wall[0].w = c.width - 600;
    wall[0].color = `#000000`;
    wall[0].x = c.width/2;
    wall[0].y = c.height - 100;
    wall[0].world = level;
    //bottom wall
    wall[1]=new GameObject();
    wall[1].h = 10;
    wall[1].w = c.width - 600;
    wall[1].color = `#000000`;
    wall[1].x = c.width/2;
    wall[1].y = c.height - 450 ;
    wall[1].world = level;
    //left wall
    wall[2] = new GameObject();
    wall[2].h = 360; 
    wall[2].w = 10; 
    wall[2].color = `#000000`;
    wall[2].x = 300; 
    wall[2].y = c.height / 2 + 34.5; 
    wall[2].world = level;
    //right wall
    wall[3] = new GameObject();
    wall[3].h = 360; 
    wall[3].w = 10; 
    wall[3].color = `#000000`;
    wall[3].x = 800; 
    wall[3].y = c.height / 2 + 34.5; 
    wall[3].world = level;

    //All lazer attacks
    lazerAttack[0]=new GameObject();
    lazerAttack[0].h =  50;
    lazerAttack[0].w = c.width - 600;
    lazerAttack[0].color = `#000000`
    lazerAttack[0].x = c.width/2;
    lazerAttack[0].y = c.height - 150;
    lazerAttack[0].isActive = false;
    lazerAttack[0].world = level;

    lazerAttack[1]=new GameObject();
    lazerAttack[1].h =  50;
    lazerAttack[1].w = c.width - 600;
    lazerAttack[1].color = `#000000`
    lazerAttack[1].x = c.width/2;
    lazerAttack[1].y = c.height - 400;
    lazerAttack[1].isActive = false;
    lazerAttack[1].world = level;

    lazerAttack[2]=new GameObject();
    lazerAttack[2].h =  80;
    lazerAttack[2].w = c.width - 600;
    lazerAttack[2].color = `#000000`
    lazerAttack[2].x = c.width/2;
    lazerAttack[2].y = c.height - 275;
    lazerAttack[2].isActive = false;
    lazerAttack[2].world = level;





    shield.color = `#000000`;
}



init();

/*---------------Game Screens (states)----------------*/
function menu()
{
    if(clicked(button))
    {
        state = game;
        //Reset Clock
        startTime = Date.now(); 
        elapsedTime = 0;
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

function game(timestamp)
{
    backdrop.render();
    //Displays Health
    var roundedHealth = Math.round(health);
    ctx.font = "20px Arial";
     ctx.fillStyle = "black";
     ctx.textAlign = "middle";
     ctx.textBaseline = "middle";
     ctx.fillText("Health: " + roundedHealth, c.width/2 -50 , c.height/2 + 250);
    
    updateTimer();
    //renders off screen
    shield.x = 10000;
    //Movement 
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
    //Shield controls
    if(up == true)
    {
        shield.x = avatar.top().x;
        shield.y = avatar.top().y - 20;
        shield.w = 50;
        shield.h = 45;
    }
    if(down == true)
    {
        shield.x = avatar.bottom().x;
        shield.y = avatar.bottom().y + 20;
        shield.w = 50;
        shield.h = 45;
    }
    if(left == true)
    {
        shield.x = avatar.left().x - 20;
        shield.y = avatar.left().y;
        shield.h = 50;
        shield.w = 45;
    }
    if(right == true)
    {
        shield.x = avatar.right().x + 20;
        shield.y = avatar.right().y;
        shield.h = 50;
        shield.w = 45;
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
    /*
    if(elapsedTime>=1.5 && elapsedTime < 3){
        deactivateDamage();
        lazerAttack[0].render();
    }
    */
    
    if (elapsedTime >= 1 && elapsedTime <= 2.5) {
        lazerAttack[2].render();
        
        // Check for collision
        if (lazerAttack[2].overlaps(avatar)) {
            
            health -= .5; // Damage the player if they touch the lazer
        }
    } 
    if (elapsedTime >= 3 && elapsedTime <= 5) {
        lazerAttack[0].render();
    
        // Check for collision
        if (lazerAttack[0].overlaps(avatar)) {
            
            health -= .5; // Damage the player if they touch the lazer
        }
    } 
    if (elapsedTime >= 3 && elapsedTime <= 5) {
        lazerAttack[1].render();
    
        // Check for collision
        if (lazerAttack[1].overlaps(avatar)) {
            
            health -= .5; // Damage the player if they touch the lazer
        }
    } 
    
    //requestAnimationFrame(game);
    
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
        if (lazerAttack[i].isActive == true) {
        // Perform lazer's actions 
        lazerAttack[i].render();
    }
   }
   
      shield.render();
    avatar.render();
    
    
}



