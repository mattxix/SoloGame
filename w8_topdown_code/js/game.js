
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
var lazerIndicator = new GameObject();
var lazerIndicator = [];
var tinyLazerIndicator = new GameObject();
var tinyLazerIndicator = [];

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
    //small lazer bottom
    lazerAttack[0]=new GameObject();
    lazerAttack[0].h =  50;
    lazerAttack[0].w = c.width - 600;
    lazerAttack[0].color = `#000000`
    lazerAttack[0].x = c.width/2;
    lazerAttack[0].y = c.height - 150;
    lazerAttack[0].isActive = false;
    lazerAttack[0].world = level;
        //small lazer Top
    lazerAttack[1]=new GameObject();
    lazerAttack[1].h =  50;
    lazerAttack[1].w = c.width - 600;
    lazerAttack[1].color = `#000000`
    lazerAttack[1].x = c.width/2;
    lazerAttack[1].y = c.height - 400;
    lazerAttack[1].isActive = false;
    lazerAttack[1].world = level;
        // large attack lazer middle
    lazerAttack[2]=new GameObject();
    lazerAttack[2].h =  80;
    lazerAttack[2].w = c.width - 600;
    lazerAttack[2].color = `#000000`
    lazerAttack[2].x = c.width/2;
    lazerAttack[2].y = c.height - 275;
    lazerAttack[2].isActive = false;
    lazerAttack[2].world = level;

    // above attacks left 1st
    lazerAttack[3]=new GameObject();
    lazerAttack[3].h =  c.height/2 + 50;
    lazerAttack[3].w = 50;
    lazerAttack[3].color = `#000000`
    lazerAttack[3].x = c.width/2 - 200;
    lazerAttack[3].y = c.height/2 + 34.5;
    lazerAttack[3].isActive = false;
    lazerAttack[3].world = level;

    // above attacks left 2nd
    lazerAttack[4]=new GameObject();
    lazerAttack[4].h =  c.height/2 + 50;
    lazerAttack[4].w = 50;
    lazerAttack[4].color = `#000000`
    lazerAttack[4].x = c.width/2 - 100;
    lazerAttack[4].y = c.height/2 + 34.5;
    lazerAttack[4].isActive = false;
    lazerAttack[4].world = level;

    // above attacks 3rd
    lazerAttack[5]=new GameObject();
    lazerAttack[5].h =  c.height/2 + 50;
    lazerAttack[5].w = 50;
    lazerAttack[5].color = `#000000`
    lazerAttack[5].x = c.width/2 ;
    lazerAttack[5].y = c.height/2 + 34.5;
    lazerAttack[5].isActive = false;
    lazerAttack[5].world = level;

    // above attacks 4th
    lazerAttack[6]=new GameObject();
    lazerAttack[6].h =  c.height/2 + 50;
    lazerAttack[6].w = 50;
    lazerAttack[6].color = `#000000`
    lazerAttack[6].x = c.width/2 + 100;
    lazerAttack[6].y = c.height/2 + 34.5;
    lazerAttack[6].isActive = false;
    lazerAttack[6].world = level;

    // above attacks 5th
    lazerAttack[7]=new GameObject();
    lazerAttack[7].h =  c.height/2 + 50;
    lazerAttack[7].w = 50;
    lazerAttack[7].color = `#000000`
    lazerAttack[7].x = c.width/2 + 200;
    lazerAttack[7].y = c.height/2 + 34.5;
    lazerAttack[7].isActive = false;
    lazerAttack[7].world = level;

    //above large middle attack
    lazerAttack[8]=new GameObject();
    lazerAttack[8].h =  c.height/2 + 50;
    lazerAttack[8].w = 80;
    lazerAttack[8].color = `#000000`
    lazerAttack[8].x = c.width/2;
    lazerAttack[8].y = c.height/2 + 34.5;
    lazerAttack[8].isActive = false;
    lazerAttack[8].world = level;

    //above large left attack
    lazerAttack[9]=new GameObject();
    lazerAttack[9].h =  c.height/2 + 50;
    lazerAttack[9].w = 80;
    lazerAttack[9].color = `#000000`
    lazerAttack[9].x = c.width/2 + 125;
    lazerAttack[9].y = c.height/2 + 34.5;
    lazerAttack[9].isActive = false;
    lazerAttack[9].world = level;
    //above large right attack
    lazerAttack[10]=new GameObject();
    lazerAttack[10].h =  c.height/2 + 50;
    lazerAttack[10].w = 80;
    lazerAttack[10].color = `#000000`
    lazerAttack[10].x = c.width/2 - 125;
    lazerAttack[10].y = c.height/2 + 34.5;
    lazerAttack[10].isActive = false;
    lazerAttack[10].world = level;
    // large attack lazer top
    lazerAttack[11]=new GameObject();
    lazerAttack[11].h =  80;
    lazerAttack[11].w = c.width - 600;
    lazerAttack[11].color = `#000000`
    lazerAttack[11].x = c.width/2;
    lazerAttack[11].y = c.height - 175;
    lazerAttack[11].isActive = false;
    lazerAttack[11].world = level;
    // large attack lazer bottom
    lazerAttack[12]=new GameObject();
    lazerAttack[12].h =  80;
    lazerAttack[12].w = c.width - 600;
    lazerAttack[12].color = `#000000`
    lazerAttack[12].x = c.width/2;
    lazerAttack[12].y = c.height - 375;
    lazerAttack[12].isActive = false;
    lazerAttack[12].world = level;

    //attack indicators 
        //left side middle
    lazerIndicator[0]=new GameObject();
    lazerIndicator[0].h =  80;
    lazerIndicator[0].w = 80;
    lazerIndicator[0].color = `yellow`
    lazerIndicator[0].x = c.width/2 - 300;
    lazerIndicator[0].y = c.height/2 + 34.5;
    lazerIndicator[0].isActive = false;
    lazerIndicator[0].world = level;
    // right side middle
    lazerIndicator[1]=new GameObject();
    lazerIndicator[1].h =  80;
    lazerIndicator[1].w = 80;
    lazerIndicator[1].color = `yellow`
    lazerIndicator[1].x = c.width/2 + 300;
    lazerIndicator[1].y = c.height/2 + 34.5;
    lazerIndicator[1].isActive = false;
    lazerIndicator[1].world = level;
    // above middle
    lazerIndicator[2]=new GameObject();
    lazerIndicator[2].h =  80;
    lazerIndicator[2].w = 80;
    lazerIndicator[2].color = `yellow`
    lazerIndicator[2].x = c.width/2;
    lazerIndicator[2].y = c.height/2 - 200;
    lazerIndicator[2].isActive = false;
    lazerIndicator[2].world = level;
    // above left
    lazerIndicator[3]=new GameObject();
    lazerIndicator[3].h =  80;
    lazerIndicator[3].w = 80;
    lazerIndicator[3].color = `yellow`
    lazerIndicator[3].x = c.width/2 - 125;
    lazerIndicator[3].y = c.height/2 - 200;
    lazerIndicator[3].isActive = false;
    lazerIndicator[3].world = level;
    // above right
    lazerIndicator[4]=new GameObject();
    lazerIndicator[4].h =  80;
    lazerIndicator[4].w = 80;
    lazerIndicator[4].color = `yellow`
    lazerIndicator[4].x = c.width/2 + 125;
    lazerIndicator[4].y = c.height/2 - 200;
    lazerIndicator[4].isActive = false;
    lazerIndicator[4].world = level;
    //left side top
    lazerIndicator[5]=new GameObject();
    lazerIndicator[5].h =  80;
    lazerIndicator[5].w = 80;
    lazerIndicator[5].color = `yellow`
    lazerIndicator[5].x = c.width/2 - 300;
    lazerIndicator[5].y = c.height - 175;
    lazerIndicator[5].isActive = false;
    lazerIndicator[5].world = level;
    //left side bottom
    lazerIndicator[6]=new GameObject();
    lazerIndicator[6].h =  80;
    lazerIndicator[6].w = 80;
    lazerIndicator[6].color = `yellow`
    lazerIndicator[6].x = c.width/2 - 300;
    lazerIndicator[6].y = c.height - 375;
    lazerIndicator[6].isActive = false;
    lazerIndicator[6].world = level;
    // right side bottom
    lazerIndicator[7]=new GameObject();
    lazerIndicator[7].h =  80;
    lazerIndicator[7].w = 80;
    lazerIndicator[7].color = `yellow`
    lazerIndicator[7].x = c.width/2 + 300;
    lazerIndicator[7].y = c.height - 375;
    lazerIndicator[7].isActive = false;
    lazerIndicator[7].world = level;
    // right side top
    lazerIndicator[8]=new GameObject();
    lazerIndicator[8].h =  80;
    lazerIndicator[8].w = 80;
    lazerIndicator[8].color = `yellow`
    lazerIndicator[8].x = c.width/2 + 300;
    lazerIndicator[8].y = c.height - 175;
    lazerIndicator[8].isActive = false;
    lazerIndicator[8].world = level;

    //small lazer indicators
        //bottom left
    tinyLazerIndicator[0]=new GameObject();
    tinyLazerIndicator[0].h =  50;
    tinyLazerIndicator[0].w = 50;
    tinyLazerIndicator[0].color = `orange`
    tinyLazerIndicator[0].x = c.width/2 - 300;
    tinyLazerIndicator[0].y = c.height/2 + 155;
    tinyLazerIndicator[0].isActive = false;
    tinyLazerIndicator[0].world = level;
        //top left
    tinyLazerIndicator[1]=new GameObject();
    tinyLazerIndicator[1].h =  50;
    tinyLazerIndicator[1].w = 50;
    tinyLazerIndicator[1].color = `orange`
    tinyLazerIndicator[1].x = c.width/2 - 300;
    tinyLazerIndicator[1].y = c.height/2 - 90;
    tinyLazerIndicator[1].isActive = false;
    tinyLazerIndicator[1].world = level;
        //above attacks 1 (left)
    tinyLazerIndicator[2]=new GameObject();
    tinyLazerIndicator[2].h =  50;
    tinyLazerIndicator[2].w = 50;
    tinyLazerIndicator[2].color = `orange`
    tinyLazerIndicator[2].x = c.width/2 - 200;
    tinyLazerIndicator[2].y = c.height/2 - 175;
    tinyLazerIndicator[2].isActive = false;
    tinyLazerIndicator[2].world = level;
        //2nd left
    tinyLazerIndicator[3]=new GameObject();
    tinyLazerIndicator[3].h =  50;
    tinyLazerIndicator[3].w = 50;
    tinyLazerIndicator[3].color = `orange`
    tinyLazerIndicator[3].x = c.width/2 - 100;
    tinyLazerIndicator[3].y = c.height/2 - 175;
    tinyLazerIndicator[3].isActive = false;
    tinyLazerIndicator[3].world = level;
        //middle
    tinyLazerIndicator[4]=new GameObject();
    tinyLazerIndicator[4].h =  50;
    tinyLazerIndicator[4].w = 50;
    tinyLazerIndicator[4].color = `orange`
    tinyLazerIndicator[4].x = c.width/2;
    tinyLazerIndicator[4].y = c.height/2 - 175;
    tinyLazerIndicator[4].isActive = false;
    tinyLazerIndicator[4].world = level;
        //4th right
    tinyLazerIndicator[5]=new GameObject();
    tinyLazerIndicator[5].h =  50;
    tinyLazerIndicator[5].w = 50;
    tinyLazerIndicator[5].color = `orange`
    tinyLazerIndicator[5].x = c.width/2 + 100;
    tinyLazerIndicator[5].y = c.height/2 - 175;
    tinyLazerIndicator[5].isActive = false;
    tinyLazerIndicator[5].world = level;
        //5th right last
    tinyLazerIndicator[6]=new GameObject();
    tinyLazerIndicator[6].h =  50;
    tinyLazerIndicator[6].w = 50;
    tinyLazerIndicator[6].color = `orange`
    tinyLazerIndicator[6].x = c.width/2 + 200;
    tinyLazerIndicator[6].y = c.height/2 - 175;
    tinyLazerIndicator[6].isActive = false;
    tinyLazerIndicator[6].world = level;
    


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
    avatar.vx *= .89;
    avatar.vy *= .89;
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
    
    if (elapsedTime >= 0.01 && elapsedTime <= 2.5) {
        lazerIndicator[0].render();
        
    } 
    if (elapsedTime >= 1.5 && elapsedTime <= 2.5) {
        lazerAttack[2].render();
        
        // Check for collision
        if (lazerAttack[2].overlaps(avatar)) {
            
            health -= .5; // Damage the player if they touch the lazer
        }
    } 


    if (elapsedTime >= 2.5 && elapsedTime <= 4.75) {
        tinyLazerIndicator[0].render();
        tinyLazerIndicator[1].render();
        
    } 
    if (elapsedTime >= 3.75 && elapsedTime <= 4.75) {
        lazerAttack[0].render();
    
        // Check for collision
        if (lazerAttack[0].overlaps(avatar)) {
            
            health -= .5; // Damage the player if they touch the lazer
        }
    } 
    if (elapsedTime >= 3.75 && elapsedTime <= 4.75) {
        lazerAttack[1].render();
    
        // Check for collision
        if (lazerAttack[1].overlaps(avatar)) {
            
            health -= .5; // Damage the player if they touch the lazer
        }
    } 
    //Large Left
    if (elapsedTime >= 5 && elapsedTime <= 7.5) {
        lazerIndicator[1].render();
        if (elapsedTime >= 6 && elapsedTime <= 7.5) {
            lazerAttack[2].render();
            if (lazerAttack[2].overlaps(avatar)) {
                health -= .5; 
            }
        } 
    } 
    
    if (elapsedTime >= 5.25 && elapsedTime <= 6.75) {
        tinyLazerIndicator[2].render();
        if(elapsedTime >= 5.75 && elapsedTime <= 6.75){
            lazerAttack[3].render();
            if (lazerAttack[3].overlaps(avatar)) {
                health -= .5; 
            }
        }
    } 
    if (elapsedTime >= 5.5 && elapsedTime <= 7) {
        tinyLazerIndicator[3].render();
        if(elapsedTime >= 6 && elapsedTime <= 7){
            lazerAttack[4].render();
            if (lazerAttack[4].overlaps(avatar)) {
                health -= .5; 
            }
        }
    } 
    if (elapsedTime >= 5.75 && elapsedTime <= 7.25) {
        tinyLazerIndicator[4].render();
        if(elapsedTime >= 6.25 && elapsedTime <= 7.25){
            lazerAttack[5].render();
            if (lazerAttack[5].overlaps(avatar)) {
                health -= .5; 
            }
        }
    } 
    if (elapsedTime >= 6 && elapsedTime <= 7.75) {
        tinyLazerIndicator[5].render();
        if(elapsedTime >= 6.5 && elapsedTime <= 7.75){
            lazerAttack[6].render();
            if (lazerAttack[6].overlaps(avatar)) {
                health -= .5; 
            }
        }
    } 
    if (elapsedTime >= 7.5 && elapsedTime <= 8.75) {
        tinyLazerIndicator[1].render();
        tinyLazerIndicator[0].render();
        if(elapsedTime >= 8 && elapsedTime <= 8.75){
            lazerAttack[1].render();
            lazerAttack[0].render();
            if (lazerAttack[1].overlaps(avatar) || lazerAttack[0].overlaps(avatar)) {
                health -= .5; 
            }
        }
    } 
    if (elapsedTime >= 8.5 && elapsedTime <= 10.5) {
        lazerIndicator[2].render();
        lazerIndicator[1].render();
        lazerIndicator[0].render();
        if(elapsedTime >= 9.25 && elapsedTime <= 10.5){
            lazerAttack[8].render();
            lazerAttack[2].render();
            if (lazerAttack[8].overlaps(avatar) || lazerAttack[2].overlaps(avatar)) {
                health -= .5; 
            }
        }
    } 
    if (elapsedTime >= 10.75 && elapsedTime <= 12.75) {
        lazerIndicator[3].render();
        lazerIndicator[4].render();
        lazerIndicator[5].render();
        lazerIndicator[6].render();
        lazerIndicator[7].render();
        lazerIndicator[8].render();
        if(elapsedTime >= 11.5 && elapsedTime <= 12.75){
            lazerAttack[9].render();
            lazerAttack[10].render();
            lazerAttack[11].render();
            lazerAttack[12].render();
            if (lazerAttack[9].overlaps(avatar) || lazerAttack[10].overlaps(avatar) || lazerAttack[11].overlaps(avatar) || lazerAttack[12].overlaps(avatar) ) {
                health -= .5; 
            }
        }
    } 
    if (elapsedTime >= 13 && elapsedTime <= 14.25) {
        lazerIndicator[2].render();
        lazerIndicator[1].render();
        lazerIndicator[0].render();
        if(elapsedTime >= 13.5 && elapsedTime <= 14.25){
            lazerAttack[8].render();
            lazerAttack[2].render();
            if (lazerAttack[8].overlaps(avatar) || lazerAttack[2].overlaps(avatar)) {
                health -= .5; 
            }
        }
    } 
    if (elapsedTime >= 14.5 && elapsedTime <= 15.75) {
        lazerIndicator[3].render();
        lazerIndicator[4].render();
        lazerIndicator[5].render();
        lazerIndicator[6].render();
        lazerIndicator[7].render();
        lazerIndicator[8].render();
        if(elapsedTime >= 15 && elapsedTime <= 15.75){
            lazerAttack[9].render();
            lazerAttack[10].render();
            lazerAttack[11].render();
            lazerAttack[12].render();
            if (lazerAttack[9].overlaps(avatar) || lazerAttack[10].overlaps(avatar) || lazerAttack[11].overlaps(avatar) || lazerAttack[12].overlaps(avatar) ) {
                health -= .5; 
            }
        }
    } 
    if (elapsedTime >= 17 && elapsedTime <= 18) {
        lazerIndicator[0].render();
        lazerIndicator[1].render();
        if(elapsedTime >= 17.25 && elapsedTime <= 18){
            lazerAttack[2].render();
            
            if (lazerAttack[2].overlaps(avatar)) {
                health -= .5; 
            }
        }
    } 
    if (elapsedTime >= 18.5 && elapsedTime <= 19.5) {
        lazerIndicator[7].render();
        lazerIndicator[5].render();
        if(elapsedTime >= 18.75 && elapsedTime <= 19.5){
            lazerAttack[12].render();
            lazerAttack[11].render();
            
            if (lazerAttack[11].overlaps(avatar) || lazerAttack[12].overlaps(avatar)) {
                health -= .5; 
            }
        }
    } 
    if(elapsedTime >= 19.5 && elapsedTime <= 20.80){
        tinyLazerIndicator[2].render();
        tinyLazerIndicator[3].render();
        tinyLazerIndicator[5].render();
        tinyLazerIndicator[6].render();
        if(elapsedTime >= 20.20 && elapsedTime <= 20.80){
            lazerAttack[3].render();
            lazerAttack[4].render();
            lazerAttack[6].render();
            lazerAttack[7].render();
            if (lazerAttack[3].overlaps(avatar) || lazerAttack[4].overlaps(avatar) || lazerAttack[6].overlaps(avatar) || lazerAttack[7].overlaps(avatar)) {
                health -= .5; 
            }
        }
    }
    //top left missing
    if(elapsedTime >= 20.80 && elapsedTime <= 22.10){
        tinyLazerIndicator[3].render();
        tinyLazerIndicator[4].render();
        tinyLazerIndicator[5].render();
        tinyLazerIndicator[6].render();
        if(elapsedTime >= 21.50 && elapsedTime <= 22.10){
            lazerAttack[4].render();
            lazerAttack[5].render();
            lazerAttack[6].render();
            lazerAttack[7].render();
            if (lazerAttack[4].overlaps(avatar) || lazerAttack[5].overlaps(avatar) || lazerAttack[6].overlaps(avatar) || lazerAttack[7].overlaps(avatar)) {
                health -= .5; 
            }
        }
    }
    //top 2nd to left missing
    if(elapsedTime >= 22.10 && elapsedTime <= 23.40){
        tinyLazerIndicator[2].render();
        tinyLazerIndicator[4].render();
        tinyLazerIndicator[5].render();
        tinyLazerIndicator[6].render();
        if(elapsedTime >= 22.80 && elapsedTime <= 23.40){
            lazerAttack[3].render();
            lazerAttack[5].render();
            lazerAttack[6].render();
            lazerAttack[7].render();
            if (lazerAttack[3].overlaps(avatar) || lazerAttack[5].overlaps(avatar) || lazerAttack[6].overlaps(avatar) || lazerAttack[7].overlaps(avatar)) {
                health -= .5; 
            }
        }
    }
    //middle top missing
    if(elapsedTime >= 23.40 && elapsedTime <= 24.70){
        tinyLazerIndicator[2].render();
        tinyLazerIndicator[3].render();
        tinyLazerIndicator[5].render();
        tinyLazerIndicator[6].render();
        if(elapsedTime >= 24.10 && elapsedTime <= 24.70){
            lazerAttack[3].render();
            lazerAttack[4].render();
            lazerAttack[6].render();
            lazerAttack[7].render();
            if (lazerAttack[3].overlaps(avatar) || lazerAttack[4].overlaps(avatar) || lazerAttack[6].overlaps(avatar) || lazerAttack[7].overlaps(avatar)) {
                health -= .5; 
            }
        }
    }
    //4th top missing
    if(elapsedTime >= 24.70 && elapsedTime <= 26){
        tinyLazerIndicator[2].render();
        tinyLazerIndicator[3].render();
        tinyLazerIndicator[4].render();
        tinyLazerIndicator[6].render();
        if(elapsedTime >= 25.40 && elapsedTime <= 26){
            lazerAttack[3].render();
            lazerAttack[4].render();
            lazerAttack[5].render();
            lazerAttack[7].render();
            if (lazerAttack[3].overlaps(avatar) || lazerAttack[4].overlaps(avatar) || lazerAttack[5].overlaps(avatar) || lazerAttack[7].overlaps(avatar)) {
                health -= .5; 
            }
        }
    }
    //top left missing again
    if(elapsedTime >= 26 && elapsedTime <= 27.3){
        tinyLazerIndicator[3].render();
        tinyLazerIndicator[4].render();
        tinyLazerIndicator[5].render();
        tinyLazerIndicator[6].render();
        if(elapsedTime >= 26.70 && elapsedTime <= 27.3){
            lazerAttack[4].render();
            lazerAttack[5].render();
            lazerAttack[6].render();
            lazerAttack[7].render();
            if (lazerAttack[4].overlaps(avatar) || lazerAttack[5].overlaps(avatar) || lazerAttack[6].overlaps(avatar) || lazerAttack[7].overlaps(avatar)) {
                health -= .5; 
            }
        }
    }
    //top right missing 
    if(elapsedTime >= 27.3 && elapsedTime <= 28.6){
        tinyLazerIndicator[2].render();
        tinyLazerIndicator[3].render();
        tinyLazerIndicator[4].render();
        tinyLazerIndicator[5].render();
        if(elapsedTime >= 28 && elapsedTime <= 28.6){
            lazerAttack[3].render();
            lazerAttack[4].render();
            lazerAttack[5].render();
            lazerAttack[6].render();
            if (lazerAttack[3].overlaps(avatar) || lazerAttack[4].overlaps(avatar) || lazerAttack[5].overlaps(avatar) || lazerAttack[6].overlaps(avatar)) {
                health -= .5; 
            }
        }
    }
    //top tiny middle, Large left and right top and bottoms
    if(elapsedTime >= 28.6 && elapsedTime <= 30.25){
        lazerIndicator[5].render();
        lazerIndicator[6].render();
        tinyLazerIndicator[4].render();
        lazerIndicator[7].render();
        lazerIndicator[8].render();
        if(elapsedTime >= 29.3 && elapsedTime <= 30.25){
            lazerAttack[11].render();
            lazerAttack[12].render();
            lazerAttack[5].render();
            if (lazerAttack[11].overlaps(avatar) || lazerAttack[12].overlaps(avatar) || lazerAttack[5].overlaps(avatar) ) {
                health -= .5; 
            }
        }
    }
    //all top tiny missing middle, Large middle
    if(elapsedTime >= 30.25 && elapsedTime <= 31.90){
        lazerIndicator[1].render();
        lazerIndicator[0].render();
        tinyLazerIndicator[2].render();
        tinyLazerIndicator[3].render();
        tinyLazerIndicator[5].render();
        tinyLazerIndicator[6].render();
        if(elapsedTime >= 30.95 && elapsedTime <= 31.90){
            lazerAttack[2].render();
            lazerAttack[3].render();
            lazerAttack[4].render();
            lazerAttack[6].render();
            lazerAttack[7].render();
            if (lazerAttack[2].overlaps(avatar) || lazerAttack[3].overlaps(avatar) || lazerAttack[4].overlaps(avatar) || lazerAttack[6].overlaps(avatar)|| lazerAttack[7].overlaps(avatar) ) {
                health -= .5; 
            }
        }
    }
    //2nd and 3rd tiny above
    if(elapsedTime >= 32 && elapsedTime <= 35){
        tinyLazerIndicator[3].render();
        tinyLazerIndicator[5].render();
        if(elapsedTime >= 32.5 && elapsedTime <= 35){
            lazerAttack[4].render();
            lazerAttack[6].render();
            if (lazerAttack[6].overlaps(avatar) || lazerAttack[4].overlaps(avatar) ) {
                health -= .5; 
            }
        }
    }
    //large middle above
    if(elapsedTime >= 32.75 && elapsedTime <= 35){
        lazerIndicator[2].render();
        if(elapsedTime >= 33.5 && elapsedTime <= 35){
            lazerAttack[8].render();
            if (lazerAttack[8].overlaps(avatar)) {
                health -= .5; 
            }
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



