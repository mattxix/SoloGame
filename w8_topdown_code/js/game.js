
var c = document.querySelector(`canvas`)
var ctx = c.getContext(`2d`)
var fps = 1000/60
var timer = setInterval(main, fps)
var startTime = Date.now(); 
var elapsedTime = 0; 
ctx.imageSmoothingEnabled = false;


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
var playAgainButton = new GameObject();
var avatar = new GameObject();
var wall = new GameObject();
var level = new GameObject();
var shield = new GameObject();
var wall = [];
var lazerAttack = new GameObject();
var lazerAttack = [];
var health = 100;
var backdrop = new GameObject(); 
var lazerIndicator = new GameObject();
var lazerIndicator = [];
var tinyLazerIndicator = new GameObject();
var tinyLazerIndicator = [];
var menuScreen = new GameObject();
var loseScreen = new GameObject();
var winScreen = new GameObject();
var avatarImage = new Image();
avatarImage.src = 'images/FireSprite.png';
avatar.image = avatarImage;
avatar.render = function () {
     // Calculate the aspect ratio of the image
     let scaleX = this.w / this.image.width;
     let scaleY = this.h / this.image.height;

     // Choose the smaller scaling factor to maintain aspect ratio
     let scale = Math.min(scaleX, scaleY);

     // Calculate the new image dimensions
     let scaledWidth = this.image.width * scale;
     let scaledHeight = this.image.height * scale;

     // Calculate the offsets to center the image
     let offsetX = (this.w - scaledWidth) - 25;
     let offsetY = (this.h - scaledHeight) - 25;

     // Draw the scaled and centered image
     ctx.drawImage(
         this.image,
         this.x + offsetX,
         this.y + offsetY,
         scaledWidth,
         scaledHeight
     )
    } 
    //startbutton Image
var startButtonImage = new Image();
startButtonImage.src = `images/startbutton.png`;
button.image = startButtonImage;
button.render = function() {
    // Calculate the aspect ratio of the image
    let scaleX = this.w / this.image.width;
    let scaleY = this.h / this.image.height;

    // Choose the smaller scaling factor to maintain aspect ratio
    let scale = Math.min(scaleX, scaleY);

    // Calculate the new image dimensions
    let scaledWidth = this.image.width * scale;
    let scaledHeight = this.image.height * scale;

    // Calculate the offsets to center the image
    let offsetX = (this.w - scaledWidth) -50;
    let offsetY = (this.h - scaledHeight) -25;

    // Draw the scaled and centered image
    ctx.drawImage(
        this.image,
        this.x + offsetX,
        this.y + offsetY,
        scaledWidth,
        scaledHeight
    )
   } 
   //Preload Again Button
var againButtonImage = new Image();
againButtonImage.src = `images/againbutton.png`;
playAgainButton.image = againButtonImage;
playAgainButton.render = function() {
    // Calculate the aspect ratio of the image
    let scaleX = this.w / this.image.width;
    let scaleY = this.h / this.image.height;

    // Choose the smaller scaling factor to maintain aspect ratio
    let scale = Math.min(scaleX, scaleY);

    // Calculate the new image dimensions
    let scaledWidth = this.image.width * scale;
    let scaledHeight = this.image.height * scale;

    // Calculate the offsets to center the image
    let offsetX = (this.w - scaledWidth) -50;
    let offsetY = (this.h - scaledHeight) -25;

    // Draw the scaled and centered image
    ctx.drawImage(
        this.image,
        this.x + offsetX,
        this.y + offsetY,
        scaledWidth,
        scaledHeight
    )
   } 
//Preload Win Screen
var menuScreenImage = new Image();
menuScreenImage.src = `images/menuScreen.png`;
menuScreen.image =menuScreenImage;
menuScreen.render = function() {
    // Calculate the aspect ratio of the image
    let scaleX = this.w / this.image.width;
    let scaleY = this.h / this.image.height;

    // Choose the smaller scaling factor to maintain aspect ratio
    let scale = Math.min(scaleX, scaleY);

    // Calculate the new image dimensions
    let scaledWidth = this.image.width * scale;
    let scaledHeight = this.image.height * scale;

    // Calculate the offsets to center the image
    let offsetX = (this.w - scaledWidth) - c.width/2;
    let offsetY = (this.h - scaledHeight) - c.height/2 ;

    // Draw the scaled and centered image
    ctx.drawImage(
        this.image,
        this.x + offsetX,
        this.y + offsetY,
        scaledWidth,
        scaledHeight
    )
   } 
//Preload Win Screen
var winScreenImage = new Image();
winScreenImage.src = `images/winScreen.png`;
winScreen.image = winScreenImage;
winScreen.render = function() {
    // Calculate the aspect ratio of the image
    let scaleX = this.w / this.image.width;
    let scaleY = this.h / this.image.height;

    // Choose the smaller scaling factor to maintain aspect ratio
    let scale = Math.min(scaleX, scaleY);

    // Calculate the new image dimensions
    let scaledWidth = this.image.width * scale;
    let scaledHeight = this.image.height * scale;

    // Calculate the offsets to center the image
    let offsetX = (this.w - scaledWidth) - c.width/2;
    let offsetY = (this.h - scaledHeight) - c.height/2 ;

    // Draw the scaled and centered image
    ctx.drawImage(
        this.image,
        this.x + offsetX,
        this.y + offsetY,
        scaledWidth,
        scaledHeight
    )
   } 
//Preload Lose Screen
var loseScreenImage = new Image();
loseScreenImage.src = `images/loseScreen.png`;
loseScreen.image = loseScreenImage;
loseScreen.render = function() {
    // Calculate the aspect ratio of the image
    let scaleX = this.w / this.image.width;
    let scaleY = this.h / this.image.height;

    // Choose the smaller scaling factor to maintain aspect ratio
    let scale = Math.min(scaleX, scaleY);

    // Calculate the new image dimensions
    let scaledWidth = this.image.width * scale;
    let scaledHeight = this.image.height * scale;

    // Calculate the offsets to center the image
    let offsetX = (this.w - scaledWidth) - c.width/2;
    let offsetY = (this.h - scaledHeight) - c.height/2 ;

    // Draw the scaled and centered image
    ctx.drawImage(
        this.image,
        this.x + offsetX,
        this.y + offsetY,
        scaledWidth,
        scaledHeight
    )
   } 




//Image 
    //Image array for Normal Lazer Indicators
    const lazerIndicatorImages = [
        "images/waterSprite64.png",
        "images/waterSprite64lookleft.png",
        "images/waterSprite64lookingdown.png",
        "images/waterSprite64lookingdown.png",
        "images/waterSprite64lookingdown.png",
        "images/waterSprite64.png",
        "images/waterSprite64.png",
        "images/waterSprite64lookleft.png",
        "images/waterSprite64lookleft.png",
    ].map((src) => {
        const img = new Image();
        img.src = src;
        return img;
    });
    //callthefunction
    function renderLazerIndicators(ctx, elapsedTime) {
    lazerIndicators.forEach((indicator, index) => {
        if (elapsedTime >= index * 0.5 && elapsedTime <= index * 0.5 + 2.5) {
            indicator.render(ctx);
        }
    });
}
     
//sets the location and size
const lazerIndicators = [];
for (let i = 0; i < lazerIndicatorImages.length; i++) {
    const indicator = new GameObject();
    indicator.x = 100 + i * 50; // Example positions
    indicator.y = 100;
    indicator.w = 80;
    indicator.h = 80;
    indicator.image = lazerIndicatorImages[i]; // Assign preloaded image
    lazerIndicators.push(indicator);
}
//end of lazer images

//Small lazer image start
    //Image array for Tiny Lazer Indicators
    const tinyLazerIndicatorImages = [
        "images/watergunr.png",
        "images/watergunr.png",
        "images/watergund.png",
        "images/watergund.png",
        "images/watergund.png",
        "images/watergund.png",
        "images/watergund.png",
    ].map((src) => {
        const img = new Image();
        img.src = src;
        return img;
    });
    //callthefunction
    function renderTinyLazerIndicators(ctx, elapsedTime) {
    tinyLazerIndicators.forEach((indicator, index) => {
        if (elapsedTime >= index * 0.5 && elapsedTime <= index * 0.5 + 2.5) {
            indicator.render(ctx);
        }
    });
}
const tinyPositions = [
    { x: c.width/2 - 300, y: c.height/2 + 175 },
    { x: c.width/2 - 300, y: c.height/2 - 80 },
    { x: c.width/2 - 200, y: c.height/2 - 175 },
    { x: c.width/2 - 100, y: c.height/2 - 175 },
    { x: c.width/2, y: c.height/2 - 175 },
    { x: c.width/2 + 100, y: c.height/2 - 175 },
    { x: c.width/2 + 200 , y: c.height/2 - 175 },
];
//sets the location and size
const tinyLazerIndicators = [];
for (let i = 0; i < tinyLazerIndicatorImages.length; i++) {
    const indicator = new GameObject();
    indicator.x = tinyPositions[i].x;
    indicator.y = tinyPositions[i].y;
    indicator.w = 80;
    indicator.h = 80;
    indicator.image = tinyLazerIndicatorImages[i]; // Assign preloaded image
    tinyLazerIndicators.push(indicator);
    
//Tiny Lazer image end
//All lazer images start
    // Image array for Lazer Attacks
    const lazerAttackImages = [
    "images/waterBlast.png",
    "images/waterBlast.png",
    "images/waterBlast.png",
    "images/waterBlastUp.png",
    "images/waterBlastUp.png",
    "images/waterBlastUp.png",
    "images/waterBlastUp.png",
    "images/waterBlastUp.png",
    "images/waterBlastUp.png",
    "images/waterBlastUp.png",
    "images/waterBlastUp.png",
    "images/waterBlast.png",
    "images/waterBlast.png",
].map((src) => {
    const img = new Image();
    img.src = src;
    return img;
});

// Positions for Lazer Attacks
const lazerPositions = [
    { x: c.width/2 -250, y: c.height/2 - 115},//works 0 
    { x: c.width/2 -250, y: c.height/2 + 135},//works 1
    { x: c.width/2 - 250, y: c.height/2 },//Works 2
    { x: c.width/2 - 225, y: c.height/2 - 145},//Works 3
    { x: c.width/2 - 125, y: c.height/2 - 145},//Works 4
    { x: c.width/2 - 25, y: c.height/2 - 145},//works 5
    { x: c.width/2 + 75, y: c.height/2 -145},//works 6
    { x: c.width/2 + 175, y: c.height/2 -145},
    { x: c.width/2 -35 , y: c.height/2 -145},//Works     8
    { x: c.width/2 - 150, y: c.height/2 -145},// works  9 left above
    { x: c.width/2 + 100, y: c.height/2 -145},// works   10 right above 
    { x: c.width/2 - 250, y: c.height/2 -100},//  works     11 left&right top
    { x: c.width/2 - 250, y: c.height/2 + 100},//  works     12 left&right bottom

    
];
// Positions for Lazer Attacks
const lazerSizes = [
    { h:50 , w: c.width - 600},
    { h:50 , w: c.width - 600},
    { h:80 , w: c.width - 600},
    { h:c.height/2 + 50 , w: 50},
    { h: c.height/2 + 50 , w: 50},
    { h: c.height/2 + 50 , w: 50},
    { h: c.height/2 + 50 , w: 50},
    { h: c.height/2 + 50 , w: 50},
    { h: c.height/2 + 50 , w: 80},
    { h: c.height/2 + 50 , w: 80},
    { h: c.height/2 + 50 , w: 80},
    { h: 80 , w:  c.width - 600},
    { h: 80 , w:  c.width - 600},
];

// Lazer Attacks array
const lazerAttacks = [];
for (let i = 0; i < lazerAttackImages.length; i++) {
    const lazerIndicator = new GameObject();
    lazerIndicator.x = lazerPositions[i].x; //access x and y
    lazerIndicator.y = lazerPositions[i].y;
    lazerIndicator.w = lazerSizes[i].w; //access w and h
    lazerIndicator.h = lazerSizes[i].h;
    lazerIndicator.image = lazerAttackImages[i];
    lazerAttacks.push(lazerIndicator);
}

// Render function
function renderLazerAttack(ctx, elapsedTime) {
    lazerAttacks.forEach((lazerIndicator, index) => {
        if (elapsedTime >= index * 0.5 && elapsedTime <= index * 0.5 + 2.5) {
            lazerIndicator.render(ctx);
        }
    });
}
// Lazer Attacks image end


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
/*Lazer animation
let lazerFrames = [];
let currentFrame = 0;
let frameDelay = 100; // Delay in milliseconds between frames
let lastFrameTime = 0;
*/
//Preload the frames
/*
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
    */





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
    avatar.vx = 0;
    avatar.w = 50;
    avatar.h = 50;
    avatar.x = c.width / 2 ; 
    avatar.y = c.height / 2 + avatar.h / 2 ;
    //ButtonSize
    button.w = 100;
    button.h = 50;
    //play again ButtonSize
    playAgainButton.w = 100;
    playAgainButton.h = 50;
    
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

    //Menu Screen
    menuScreen.w =1100
    menuScreen.h = 619
    menuScreen.x = c.width/2;
    menuScreen.y = c.height/2;
    //Lose Screen
    loseScreen.w =1100
    loseScreen.h = 619
    loseScreen.x = c.width/2;
    loseScreen.y = c.height/2;
    //Win Screen
    winScreen.w = 1100
    winScreen.h = 619
    winScreen.x = c.width/2;
    winScreen.y = c.height/2;



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
        // Small lazer Top
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
    lazerIndicator[0].image = lazerIndicatorImages[0];
    lazerIndicator[0].world = level;
    // right side middle
    lazerIndicator[1]=new GameObject();
    lazerIndicator[1].h =  80;
    lazerIndicator[1].w = 80;
    lazerIndicator[1].color = `yellow`
    lazerIndicator[1].x = c.width/2 + 300;
    lazerIndicator[1].y = c.height/2 + 34.5;
    lazerIndicator[1].isActive = false;
    lazerIndicator[1].image = lazerIndicatorImages[1];
    lazerIndicator[1].world = level;
    // above middle
    lazerIndicator[2]=new GameObject();
    lazerIndicator[2].h =  80;
    lazerIndicator[2].w = 80;
    lazerIndicator[2].color = `yellow`
    lazerIndicator[2].x = c.width/2;
    lazerIndicator[2].y = c.height/2 - 200;
    lazerIndicator[2].isActive = false;
    lazerIndicator[2].image = lazerIndicatorImages[2];
    lazerIndicator[2].world = level;
    // above left
    lazerIndicator[3]=new GameObject();
    lazerIndicator[3].h =  80;
    lazerIndicator[3].w = 80;
    lazerIndicator[3].color = `yellow`
    lazerIndicator[3].x = c.width/2 - 125;
    lazerIndicator[3].y = c.height/2 - 200;
    lazerIndicator[3].isActive = false;
    lazerIndicator[3].image = lazerIndicatorImages[3];
    lazerIndicator[3].world = level;
    // above right
    lazerIndicator[4]=new GameObject();
    lazerIndicator[4].h =  80;
    lazerIndicator[4].w = 80;
    lazerIndicator[4].color = `yellow`
    lazerIndicator[4].x = c.width/2 + 125;
    lazerIndicator[4].y = c.height/2 - 200;
    lazerIndicator[4].isActive = false;
    lazerIndicator[4].image = lazerIndicatorImages[4];
    lazerIndicator[4].world = level;
    //left side top
    lazerIndicator[5]=new GameObject();
    lazerIndicator[5].h =  80;
    lazerIndicator[5].w = 80;
    lazerIndicator[5].color = `yellow`
    lazerIndicator[5].x = c.width/2 - 300;
    lazerIndicator[5].y = c.height - 175;
    lazerIndicator[5].isActive = false;
    lazerIndicator[5].image = lazerIndicatorImages[5];
    lazerIndicator[5].world = level;
    //left side bottom
    lazerIndicator[6]=new GameObject();
    lazerIndicator[6].h =  80;
    lazerIndicator[6].w = 80;
    lazerIndicator[6].color = `yellow`
    lazerIndicator[6].x = c.width/2 - 300;
    lazerIndicator[6].y = c.height - 375;
    lazerIndicator[6].isActive = false;
    lazerIndicator[6].image = lazerIndicatorImages[6];
    lazerIndicator[6].world = level;
    // right side bottom
    lazerIndicator[7]=new GameObject();
    lazerIndicator[7].h =  80;
    lazerIndicator[7].w = 80;
    lazerIndicator[7].color = `yellow`
    lazerIndicator[7].x = c.width/2 + 300;
    lazerIndicator[7].y = c.height - 375;
    lazerIndicator[7].isActive = false;
    lazerIndicator[7].image = lazerIndicatorImages[7];
    lazerIndicator[7].world = level;
    // right side top
    lazerIndicator[8]=new GameObject();
    lazerIndicator[8].h =  80;
    lazerIndicator[8].w = 80;
    lazerIndicator[8].color = `yellow`
    lazerIndicator[8].x = c.width/2 + 300;
    lazerIndicator[8].y = c.height - 175;
    lazerIndicator[8].isActive = false;
    lazerIndicator[8].image = lazerIndicatorImages[8];
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
    menuScreen.render();
    button.render()
    
}

function win()
{
    //Display Win Screen
    ctx.clearRect(0,0,c.width,c.height);
    winScreen.render();
    ctx.font = "20px Arial";
     ctx.fillStyle = "black";
     ctx.textAlign = "center";
     ctx.textBaseline = "center";
     ctx.fillText("Remaining Health: " + health, c.width/2 , c.height/2 + 100); 

     //try again button
     if(clicked(playAgainButton))
        {
            state = game;
            init();
        }
        
    playAgainButton.render();
}
function lose()
{
    //display lose screen
    ctx.clearRect(0,0,c.width,c.height);
    loseScreen.render();
    ctx.font = "20px Arial";
     ctx.fillStyle = "black";
     ctx.textAlign = "center";
     ctx.textBaseline = "center";
     ctx.fillText("Time Survived: " + roundedTime, c.width/2, c.height/2 - 50);
     
     
     //try again button
     if(clicked(playAgainButton))
        {
            state = game;
            init();
        }
            
            playAgainButton.render();
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
        avatar.vx += -7;
    }
    if(d == true)
    {
        avatar.vx += 7;
    }
    if(w == true)
    {
        avatar.vy += -7;
    }
    if(s == true)
    {
        avatar.vy += 7;
    }
    if(up == true)
    {
        avatar.vy += -7;
    }
    if(down == true)
    {
        avatar.vy += 7;
    }
    if(left == true)
    {
        avatar.vx += -7;
    }
    if(right == true)
    {
        avatar.vx += 7;
    }
    avatar.vx *= .6;
    avatar.vy *= .6;
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
        ctx.drawImage(lazerIndicatorImages[0], lazerIndicator[0].x -40 , lazerIndicator[0].y - 50, 80, 80);
        
        
    } 
    if (elapsedTime >= 1.5 && elapsedTime <= 2.5) {
        //lazerAttack[2].render();
        //const lazerIndicator2 = lazerAttacks[2];
        ctx.drawImage(lazerAttacks[2].image, lazerAttacks[2].x , lazerAttacks[2].y , lazerAttacks[2].w, lazerAttacks[2].h);
        // Check for collision
        if (lazerAttack[2].overlaps(avatar)) {
            health -=3 // Damage the player if they touch the lazer
        }
    } 


    if (elapsedTime >= 2.5 && elapsedTime <= 4.75) {
        const indicator0 = tinyLazerIndicators[0];
        const indicator1 = tinyLazerIndicators[1];
        ctx.drawImage(indicator0.image, indicator0.x - 40, indicator0.y - 50, indicator0.w, indicator0.h);
        ctx.drawImage(indicator1.image, indicator1.x - 40, indicator1.y - 50, indicator1.w, indicator1.h);
    } 
    if (elapsedTime >= 3.75 && elapsedTime <= 4.75) {
        //lazerAttack[0].render();
        ctx.drawImage(lazerAttacks[0].image, lazerAttacks[0].x , lazerAttacks[0].y , lazerAttacks[0].w, lazerAttacks[0].h);
        // Check for collision
        if (lazerAttack[0].overlaps(avatar)) {   
            health -=3 // Damage the player if they touch the lazer
        }
    } 
    if (elapsedTime >= 3.75 && elapsedTime <= 4.75) {
        //lazerAttack[1].render();
        ctx.drawImage(lazerAttacks[1].image, lazerAttacks[1].x , lazerAttacks[1].y , lazerAttacks[1].w, lazerAttacks[1].h);
        // Check for collision
        if (lazerAttack[1].overlaps(avatar)) {
            
            health -=3 // Damage the player if they touch the lazer
        }
    } 
    //Large Left
    if (elapsedTime >= 5 && elapsedTime <= 7.5) {
        ctx.drawImage(lazerIndicatorImages[1], lazerIndicator[1].x -40 , lazerIndicator[1].y - 50, 80, 80);
        if (elapsedTime >= 6 && elapsedTime <= 7.5) {
            //lazerAttack[2].render();
            ctx.drawImage(lazerAttacks[2].image, lazerAttacks[2].x , lazerAttacks[2].y , lazerAttacks[2].w, lazerAttacks[2].h);
            if (lazerAttack[2].overlaps(avatar)) {
                health -=3 
            }
        } 
    } 
    
    if (elapsedTime >= 5.25 && elapsedTime <= 6.75) {
        const indicator2 = tinyLazerIndicators[2];
        ctx.drawImage(indicator2.image, indicator2.x - 40, indicator2.y - 50, indicator2.w, indicator2.h);
        if(elapsedTime >= 5.75 && elapsedTime <= 6.75){
            //lazerAttack[3].render();
            ctx.drawImage(lazerAttacks[3].image, lazerAttacks[3].x , lazerAttacks[3].y , lazerAttacks[3].w, lazerAttacks[3].h);
            if (lazerAttack[3].overlaps(avatar)) {
                health -=3 
            }
        }
    } 
    if (elapsedTime >= 5.5 && elapsedTime <= 7) {
        const indicator3 = tinyLazerIndicators[3];
        ctx.drawImage(indicator3.image, indicator3.x - 40, indicator3.y - 50, indicator3.w, indicator3.h);
        if(elapsedTime >= 6 && elapsedTime <= 7){
            //lazerAttack[4].render();
            ctx.drawImage(lazerAttacks[4].image, lazerAttacks[4].x , lazerAttacks[4].y , lazerAttacks[4].w, lazerAttacks[4].h);
            if (lazerAttack[4].overlaps(avatar)) {
                health -=3 
            }
        }
    } 
    if (elapsedTime >= 5.75 && elapsedTime <= 7.25) {
        const indicator4 = tinyLazerIndicators[4];
        ctx.drawImage(indicator4.image, indicator4.x - 40, indicator4.y - 50, indicator4.w, indicator4.h);
        if(elapsedTime >= 6.25 && elapsedTime <= 7.25){
            //lazerAttack[5].render();
            ctx.drawImage(lazerAttacks[5].image, lazerAttacks[5].x , lazerAttacks[5].y , lazerAttacks[5].w, lazerAttacks[5].h);
            if (lazerAttack[5].overlaps(avatar)) {
                health -=3 
            }
        }
    } 
    if (elapsedTime >= 6 && elapsedTime <= 7.75) {
        const indicator5 = tinyLazerIndicators[5];
        ctx.drawImage(indicator5.image, indicator5.x - 40, indicator5.y - 50, indicator5.w, indicator5.h);
        if(elapsedTime >= 6.5 && elapsedTime <= 7.75){
            //lazerAttack[6].render();
            ctx.drawImage(lazerAttacks[6].image, lazerAttacks[6].x , lazerAttacks[6].y , lazerAttacks[6].w, lazerAttacks[6].h);
            if (lazerAttack[6].overlaps(avatar)) {
                health -=3 
            }
        }
    } 
    if (elapsedTime >= 7.5 && elapsedTime <= 8.75) {
        const indicator0 = tinyLazerIndicators[0];
        const indicator1 = tinyLazerIndicators[1];
        ctx.drawImage(indicator0.image, indicator0.x - 40, indicator0.y - 50, indicator0.w, indicator0.h);
        ctx.drawImage(indicator1.image, indicator1.x - 40, indicator1.y - 50, indicator1.w, indicator1.h);
        if(elapsedTime >= 8 && elapsedTime <= 8.75){
            //lazerAttack[1].render();
            //lazerAttack[0].render();
            ctx.drawImage(lazerAttacks[0].image, lazerAttacks[0].x , lazerAttacks[0].y , lazerAttacks[0].w, lazerAttacks[0].h);
            ctx.drawImage(lazerAttacks[1].image, lazerAttacks[1].x , lazerAttacks[1].y , lazerAttacks[1].w, lazerAttacks[1].h);
            if (lazerAttack[1].overlaps(avatar) || lazerAttack[0].overlaps(avatar)) {
                health -=3 
            }
        }
    } 
    if (elapsedTime >= 8.5 && elapsedTime <= 10.5) {
        ctx.drawImage(lazerIndicatorImages[0], lazerIndicator[0].x -40 , lazerIndicator[0].y - 50, 80, 80);
        ctx.drawImage(lazerIndicatorImages[1], lazerIndicator[1].x -40 , lazerIndicator[1].y - 50, 80, 80);
        ctx.drawImage(lazerIndicatorImages[2], lazerIndicator[2].x -40 , lazerIndicator[2].y - 50, 80, 80);
        if(elapsedTime >= 9.25 && elapsedTime <= 10.5){
            //lazerAttack[8].render();
            //lazerAttack[2].render();
            ctx.drawImage(lazerAttacks[2].image, lazerAttacks[2].x , lazerAttacks[2].y , lazerAttacks[2].w, lazerAttacks[2].h);
            ctx.drawImage(lazerAttacks[8].image, lazerAttacks[8].x , lazerAttacks[8].y , lazerAttacks[8].w, lazerAttacks[8].h);
            if (lazerAttack[8].overlaps(avatar) || lazerAttack[2].overlaps(avatar)) {
                health -=3 
            }
        }
    } 
    if (elapsedTime >= 10.75 && elapsedTime <= 12.75) {
        ctx.drawImage(lazerIndicatorImages[3], lazerIndicator[3].x -40 , lazerIndicator[3].y - 50, 80, 80);
        ctx.drawImage(lazerIndicatorImages[4], lazerIndicator[4].x -40 , lazerIndicator[4].y - 50, 80, 80);
        ctx.drawImage(lazerIndicatorImages[5], lazerIndicator[5].x -40 , lazerIndicator[5].y - 50, 80, 80);
        ctx.drawImage(lazerIndicatorImages[6], lazerIndicator[6].x -40 , lazerIndicator[6].y - 50, 80, 80);
        ctx.drawImage(lazerIndicatorImages[7], lazerIndicator[7].x -40 , lazerIndicator[7].y - 50, 80, 80);
        ctx.drawImage(lazerIndicatorImages[8], lazerIndicator[8].x -40 , lazerIndicator[8].y - 50, 80, 80);
        if(elapsedTime >= 11.5 && elapsedTime <= 12.75){
            //lazerAttack[9].render();
            //lazerAttack[10].render();
            //lazerAttack[11].render();
            //lazerAttack[12].render();
            ctx.drawImage(lazerAttacks[9].image, lazerAttacks[9].x , lazerAttacks[9].y , lazerAttacks[9].w, lazerAttacks[9].h);
            ctx.drawImage(lazerAttacks[10].image, lazerAttacks[10].x , lazerAttacks[10].y , lazerAttacks[10].w, lazerAttacks[10].h);
            ctx.drawImage(lazerAttacks[11].image, lazerAttacks[11].x , lazerAttacks[11].y , lazerAttacks[11].w, lazerAttacks[11].h);
            ctx.drawImage(lazerAttacks[12].image, lazerAttacks[12].x , lazerAttacks[12].y , lazerAttacks[12].w, lazerAttacks[12].h);
            if (lazerAttack[9].overlaps(avatar) || lazerAttack[10].overlaps(avatar) || lazerAttack[11].overlaps(avatar) || lazerAttack[12].overlaps(avatar) ) {
                health -=3 
            }
        }
    } 
    if (elapsedTime >= 13 && elapsedTime <= 14.25) {
        ctx.drawImage(lazerIndicatorImages[2], lazerIndicator[2].x -40 , lazerIndicator[2].y - 50, 80, 80);
        ctx.drawImage(lazerIndicatorImages[1], lazerIndicator[1].x -40 , lazerIndicator[1].y - 50, 80, 80);
        ctx.drawImage(lazerIndicatorImages[0], lazerIndicator[0].x -40 , lazerIndicator[0].y - 50, 80, 80);
        if(elapsedTime >= 13.5 && elapsedTime <= 14.25){
            //lazerAttack[8].render();
            //lazerAttack[2].render();
            ctx.drawImage(lazerAttacks[8].image, lazerAttacks[8].x , lazerAttacks[8].y , lazerAttacks[8].w, lazerAttacks[8].h);
            ctx.drawImage(lazerAttacks[2].image, lazerAttacks[2].x , lazerAttacks[2].y , lazerAttacks[2].w, lazerAttacks[2].h);
            if (lazerAttack[8].overlaps(avatar) || lazerAttack[2].overlaps(avatar)) {
                health -=3 
            }
        }
    } 
    if (elapsedTime >= 14.5 && elapsedTime <= 15.75) {
        ctx.drawImage(lazerIndicatorImages[3], lazerIndicator[3].x -40 , lazerIndicator[3].y - 50, 80, 80);
        ctx.drawImage(lazerIndicatorImages[4], lazerIndicator[4].x -40 , lazerIndicator[4].y - 50, 80, 80);
        ctx.drawImage(lazerIndicatorImages[5], lazerIndicator[5].x -40 , lazerIndicator[5].y - 50, 80, 80);
        ctx.drawImage(lazerIndicatorImages[6], lazerIndicator[6].x -40 , lazerIndicator[6].y - 50, 80, 80);
        ctx.drawImage(lazerIndicatorImages[7], lazerIndicator[7].x -40 , lazerIndicator[7].y - 50, 80, 80);
        ctx.drawImage(lazerIndicatorImages[8], lazerIndicator[8].x -40 , lazerIndicator[8].y - 50, 80, 80);
        if(elapsedTime >= 15 && elapsedTime <= 15.75){
            //lazerAttack[9].render();
            //lazerAttack[10].render();
            //lazerAttack[11].render();
            //lazerAttack[12].render();
            ctx.drawImage(lazerAttacks[9].image, lazerAttacks[9].x , lazerAttacks[9].y , lazerAttacks[9].w, lazerAttacks[9].h);
            ctx.drawImage(lazerAttacks[10].image, lazerAttacks[10].x , lazerAttacks[10].y , lazerAttacks[10].w, lazerAttacks[10].h);
            ctx.drawImage(lazerAttacks[11].image, lazerAttacks[11].x , lazerAttacks[11].y , lazerAttacks[11].w, lazerAttacks[11].h);
            ctx.drawImage(lazerAttacks[12].image, lazerAttacks[12].x , lazerAttacks[12].y , lazerAttacks[12].w, lazerAttacks[12].h);
            if (lazerAttack[9].overlaps(avatar) || lazerAttack[10].overlaps(avatar) || lazerAttack[11].overlaps(avatar) || lazerAttack[12].overlaps(avatar) ) {
                health -=3 
            }
        }
    } 
    if (elapsedTime >= 17 && elapsedTime <= 18) {
        ctx.drawImage(lazerIndicatorImages[0], lazerIndicator[0].x -40 , lazerIndicator[0].y - 50, 80, 80);
        ctx.drawImage(lazerIndicatorImages[1], lazerIndicator[1].x -40 , lazerIndicator[1].y - 50, 80, 80);
        if(elapsedTime >= 17.25 && elapsedTime <= 18){
            //lazerAttack[2].render();
            ctx.drawImage(lazerAttacks[2].image, lazerAttacks[2].x , lazerAttacks[2].y , lazerAttacks[2].w, lazerAttacks[2].h);
            if (lazerAttack[2].overlaps(avatar)) {
                health -=3 
            }
        }
    } 
    if (elapsedTime >= 18.5 && elapsedTime <= 19.5) {
        ctx.drawImage(lazerIndicatorImages[7], lazerIndicator[7].x -40 , lazerIndicator[7].y - 50, 80, 80);
        ctx.drawImage(lazerIndicatorImages[5], lazerIndicator[5].x -40 , lazerIndicator[5].y - 50, 80, 80);
        if(elapsedTime >= 18.75 && elapsedTime <= 19.5){
            //lazerAttack[12].render();
            //lazerAttack[11].render();
            ctx.drawImage(lazerAttacks[11].image, lazerAttacks[11].x , lazerAttacks[11].y , lazerAttacks[11].w, lazerAttacks[11].h);
            ctx.drawImage(lazerAttacks[12].image, lazerAttacks[12].x , lazerAttacks[12].y , lazerAttacks[12].w, lazerAttacks[12].h);
            if (lazerAttack[11].overlaps(avatar) || lazerAttack[12].overlaps(avatar)) {
                health -=3 
            }
        }
    } 
    if(elapsedTime >= 19.5 && elapsedTime <= 20.80){
        const indicator2 = tinyLazerIndicators[2];
        const indicator3 = tinyLazerIndicators[3];
        const indicator5 = tinyLazerIndicators[5];
        const indicator6 = tinyLazerIndicators[6];
        ctx.drawImage(indicator2.image, indicator2.x - 40, indicator2.y - 50, indicator2.w, indicator2.h);
        ctx.drawImage(indicator3.image, indicator3.x - 40, indicator3.y - 50, indicator3.w, indicator3.h);
        ctx.drawImage(indicator5.image, indicator5.x - 40, indicator5.y - 50, indicator5.w, indicator5.h);
        ctx.drawImage(indicator6.image, indicator6.x - 40, indicator6.y - 50, indicator6.w, indicator6.h);
        if(elapsedTime >= 20.20 && elapsedTime <= 20.80){
            //lazerAttack[3].render();
            //lazerAttack[4].render();
            //lazerAttack[6].render();
            //lazerAttack[7].render();
            ctx.drawImage(lazerAttacks[3].image, lazerAttacks[3].x , lazerAttacks[3].y , lazerAttacks[3].w, lazerAttacks[3].h);
            ctx.drawImage(lazerAttacks[4].image, lazerAttacks[4].x , lazerAttacks[4].y , lazerAttacks[4].w, lazerAttacks[4].h);
            ctx.drawImage(lazerAttacks[6].image, lazerAttacks[6].x , lazerAttacks[6].y , lazerAttacks[6].w, lazerAttacks[6].h);
            ctx.drawImage(lazerAttacks[7].image, lazerAttacks[7].x , lazerAttacks[7].y , lazerAttacks[7].w, lazerAttacks[7].h);
            if (lazerAttack[3].overlaps(avatar) || lazerAttack[4].overlaps(avatar) || lazerAttack[6].overlaps(avatar) || lazerAttack[7].overlaps(avatar)) {
                health -=3 
            }
        }
    }
    //top left missing
    if(elapsedTime >= 20.80 && elapsedTime <= 22.10){
        const indicator3 = tinyLazerIndicators[3];
        const indicator4 = tinyLazerIndicators[4];
        const indicator5 = tinyLazerIndicators[5];
        const indicator6 = tinyLazerIndicators[6];
        ctx.drawImage(indicator3.image, indicator3.x - 40, indicator3.y - 50, indicator3.w, indicator3.h);
        ctx.drawImage(indicator4.image, indicator4.x - 40, indicator4.y - 50, indicator4.w, indicator4.h);
        ctx.drawImage(indicator5.image, indicator5.x - 40, indicator5.y - 50, indicator5.w, indicator5.h);
        ctx.drawImage(indicator6.image, indicator6.x - 40, indicator6.y - 50, indicator6.w, indicator6.h);
        if(elapsedTime >= 21.50 && elapsedTime <= 22.10){
            //lazerAttack[4].render();
            //lazerAttack[5].render();
            //lazerAttack[6].render();
            //lazerAttack[7].render();
            ctx.drawImage(lazerAttacks[5].image, lazerAttacks[5].x , lazerAttacks[5].y , lazerAttacks[5].w, lazerAttacks[5].h);
            ctx.drawImage(lazerAttacks[4].image, lazerAttacks[4].x , lazerAttacks[4].y , lazerAttacks[4].w, lazerAttacks[4].h);
            ctx.drawImage(lazerAttacks[6].image, lazerAttacks[6].x , lazerAttacks[6].y , lazerAttacks[6].w, lazerAttacks[6].h);
            ctx.drawImage(lazerAttacks[7].image, lazerAttacks[7].x , lazerAttacks[7].y , lazerAttacks[7].w, lazerAttacks[7].h);
            if (lazerAttack[4].overlaps(avatar) || lazerAttack[5].overlaps(avatar) || lazerAttack[6].overlaps(avatar) || lazerAttack[7].overlaps(avatar)) {
                health -=3 
            }
        }
    }
    //top 2nd to left missing
    if(elapsedTime >= 22.10 && elapsedTime <= 23.40){
        const indicator2 = tinyLazerIndicators[2];
        const indicator4 = tinyLazerIndicators[4];
        const indicator5 = tinyLazerIndicators[5];
        const indicator6 = tinyLazerIndicators[6];
        ctx.drawImage(indicator2.image, indicator2.x - 40, indicator2.y - 50, indicator2.w, indicator2.h);
        ctx.drawImage(indicator4.image, indicator4.x - 40, indicator4.y - 50, indicator4.w, indicator4.h);
        ctx.drawImage(indicator5.image, indicator5.x - 40, indicator5.y - 50, indicator5.w, indicator5.h);
        ctx.drawImage(indicator6.image, indicator6.x - 40, indicator6.y - 50, indicator6.w, indicator6.h);
        if(elapsedTime >= 22.80 && elapsedTime <= 23.40){
            //lazerAttack[3].render();
            //lazerAttack[5].render();
            //lazerAttack[6].render();
            //lazerAttack[7].render();
            ctx.drawImage(lazerAttacks[3].image, lazerAttacks[3].x , lazerAttacks[3].y , lazerAttacks[3].w, lazerAttacks[3].h);
            ctx.drawImage(lazerAttacks[5].image, lazerAttacks[5].x , lazerAttacks[5].y , lazerAttacks[5].w, lazerAttacks[5].h);
            ctx.drawImage(lazerAttacks[6].image, lazerAttacks[6].x , lazerAttacks[6].y , lazerAttacks[6].w, lazerAttacks[6].h);
            ctx.drawImage(lazerAttacks[7].image, lazerAttacks[7].x , lazerAttacks[7].y , lazerAttacks[7].w, lazerAttacks[7].h);
            if (lazerAttack[3].overlaps(avatar) || lazerAttack[5].overlaps(avatar) || lazerAttack[6].overlaps(avatar) || lazerAttack[7].overlaps(avatar)) {
                health -=3 
            }
        }
    }
    //middle top missing
    if(elapsedTime >= 23.40 && elapsedTime <= 24.70){
        const indicator2 = tinyLazerIndicators[2];
        const indicator3 = tinyLazerIndicators[3];
        const indicator5 = tinyLazerIndicators[5];
        const indicator6 = tinyLazerIndicators[6];
        ctx.drawImage(indicator2.image, indicator2.x - 40, indicator2.y - 50, indicator2.w, indicator2.h);
        ctx.drawImage(indicator3.image, indicator3.x - 40, indicator3.y - 50, indicator3.w, indicator3.h);
        ctx.drawImage(indicator5.image, indicator5.x - 40, indicator5.y - 50, indicator5.w, indicator5.h);
        ctx.drawImage(indicator6.image, indicator6.x - 40, indicator6.y - 50, indicator6.w, indicator6.h);
        if(elapsedTime >= 24.10 && elapsedTime <= 24.70){
            //lazerAttack[3].render();
            //lazerAttack[4].render();
            //lazerAttack[6].render();
            //lazerAttack[7].render();
            ctx.drawImage(lazerAttacks[3].image, lazerAttacks[3].x , lazerAttacks[3].y , lazerAttacks[3].w, lazerAttacks[3].h);
            ctx.drawImage(lazerAttacks[4].image, lazerAttacks[4].x , lazerAttacks[4].y , lazerAttacks[4].w, lazerAttacks[4].h);
            ctx.drawImage(lazerAttacks[6].image, lazerAttacks[6].x , lazerAttacks[6].y , lazerAttacks[6].w, lazerAttacks[6].h);
            ctx.drawImage(lazerAttacks[7].image, lazerAttacks[7].x , lazerAttacks[7].y , lazerAttacks[7].w, lazerAttacks[7].h);
            if (lazerAttack[3].overlaps(avatar) || lazerAttack[4].overlaps(avatar) || lazerAttack[6].overlaps(avatar) || lazerAttack[7].overlaps(avatar)) {
                health -=3 
            }
        }
    }
    //4th top missing
    if(elapsedTime >= 24.70 && elapsedTime <= 26){
        const indicator2 = tinyLazerIndicators[2];
        const indicator3 = tinyLazerIndicators[3];
        const indicator4 = tinyLazerIndicators[4];
        const indicator6 = tinyLazerIndicators[6];
        ctx.drawImage(indicator2.image, indicator2.x - 40, indicator2.y - 50, indicator2.w, indicator2.h);
        ctx.drawImage(indicator3.image, indicator3.x - 40, indicator3.y - 50, indicator3.w, indicator3.h);
        ctx.drawImage(indicator4.image, indicator4.x - 40, indicator4.y - 50, indicator4.w, indicator4.h);
        ctx.drawImage(indicator6.image, indicator6.x - 40, indicator6.y - 50, indicator6.w, indicator6.h);
        if(elapsedTime >= 25.40 && elapsedTime <= 26){
            //lazerAttack[3].render();
            //lazerAttack[4].render();
            //lazerAttack[5].render();
            //lazerAttack[7].render();
            ctx.drawImage(lazerAttacks[3].image, lazerAttacks[3].x , lazerAttacks[3].y , lazerAttacks[3].w, lazerAttacks[3].h);
            ctx.drawImage(lazerAttacks[4].image, lazerAttacks[4].x , lazerAttacks[4].y , lazerAttacks[4].w, lazerAttacks[4].h);
            ctx.drawImage(lazerAttacks[5].image, lazerAttacks[5].x , lazerAttacks[5].y , lazerAttacks[5].w, lazerAttacks[5].h);
            ctx.drawImage(lazerAttacks[7].image, lazerAttacks[7].x , lazerAttacks[7].y , lazerAttacks[7].w, lazerAttacks[7].h);
            if (lazerAttack[3].overlaps(avatar) || lazerAttack[4].overlaps(avatar) || lazerAttack[5].overlaps(avatar) || lazerAttack[7].overlaps(avatar)) {
                health -=3 
            }
        }
    }
    //top left missing again
    if(elapsedTime >= 26 && elapsedTime <= 27.3){
        const indicator3 = tinyLazerIndicators[3];
        const indicator4 = tinyLazerIndicators[4];
        const indicator5 = tinyLazerIndicators[5];
        const indicator6 = tinyLazerIndicators[6];
        ctx.drawImage(indicator3.image, indicator3.x - 40, indicator3.y - 50, indicator3.w, indicator3.h);
        ctx.drawImage(indicator4.image, indicator4.x - 40, indicator4.y - 50, indicator4.w, indicator4.h);
        ctx.drawImage(indicator5.image, indicator5.x - 40, indicator5.y - 50, indicator5.w, indicator5.h);
        ctx.drawImage(indicator6.image, indicator6.x - 40, indicator6.y - 50, indicator6.w, indicator6.h);
        if(elapsedTime >= 26.70 && elapsedTime <= 27.3){
            //lazerAttack[4].render();
           // lazerAttack[5].render();
            //lazerAttack[6].render();
            ///lazerAttack[7].render();
            ctx.drawImage(lazerAttacks[5].image, lazerAttacks[5].x , lazerAttacks[5].y , lazerAttacks[5].w, lazerAttacks[5].h);
            ctx.drawImage(lazerAttacks[4].image, lazerAttacks[4].x , lazerAttacks[4].y , lazerAttacks[4].w, lazerAttacks[4].h);
            ctx.drawImage(lazerAttacks[6].image, lazerAttacks[6].x , lazerAttacks[6].y , lazerAttacks[6].w, lazerAttacks[6].h);
            ctx.drawImage(lazerAttacks[7].image, lazerAttacks[7].x , lazerAttacks[7].y , lazerAttacks[7].w, lazerAttacks[7].h);
            if (lazerAttack[4].overlaps(avatar) || lazerAttack[5].overlaps(avatar) || lazerAttack[6].overlaps(avatar) || lazerAttack[7].overlaps(avatar)) {
                health -=3 
            }
        }
    }
    //top right missing 
    if(elapsedTime >= 27.3 && elapsedTime <= 28.6){
        const indicator2 = tinyLazerIndicators[2];
        const indicator3 = tinyLazerIndicators[3];
        const indicator4 = tinyLazerIndicators[4];
        const indicator5 = tinyLazerIndicators[5];
        ctx.drawImage(indicator2.image, indicator2.x - 40, indicator2.y - 50, indicator2.w, indicator2.h);
        ctx.drawImage(indicator3.image, indicator3.x - 40, indicator3.y - 50, indicator3.w, indicator3.h);
        ctx.drawImage(indicator4.image, indicator4.x - 40, indicator4.y - 50, indicator4.w, indicator4.h);
        ctx.drawImage(indicator5.image, indicator5.x - 40, indicator5.y - 50, indicator5.w, indicator5.h);
        if(elapsedTime >= 28 && elapsedTime <= 28.6){
            //lazerAttack[3].render();
            //lazerAttack[4].render();
            //lazerAttack[5].render();
            //lazerAttack[6].render();
            ctx.drawImage(lazerAttacks[3].image, lazerAttacks[3].x , lazerAttacks[3].y , lazerAttacks[3].w, lazerAttacks[3].h);
            ctx.drawImage(lazerAttacks[4].image, lazerAttacks[4].x , lazerAttacks[4].y , lazerAttacks[4].w, lazerAttacks[4].h);
            ctx.drawImage(lazerAttacks[6].image, lazerAttacks[6].x , lazerAttacks[6].y , lazerAttacks[6].w, lazerAttacks[6].h);
            ctx.drawImage(lazerAttacks[5].image, lazerAttacks[5].x , lazerAttacks[5].y , lazerAttacks[5].w, lazerAttacks[5].h);
            if (lazerAttack[3].overlaps(avatar) || lazerAttack[4].overlaps(avatar) || lazerAttack[5].overlaps(avatar) || lazerAttack[6].overlaps(avatar)) {
                health -=3 
            }
        }
    }
    //top tiny middle, Large left and right top and bottoms
    if(elapsedTime >= 28.6 && elapsedTime <= 30.25){
        const indicator4 = tinyLazerIndicators[4];
        ctx.drawImage(indicator4.image, indicator4.x - 40, indicator4.y - 50, indicator4.w, indicator4.h);
        ctx.drawImage(lazerIndicatorImages[5], lazerIndicator[5].x -40 , lazerIndicator[5].y - 50, 80, 80);
        ctx.drawImage(lazerIndicatorImages[6], lazerIndicator[6].x -40 , lazerIndicator[6].y - 50, 80, 80);
        ctx.drawImage(lazerIndicatorImages[7], lazerIndicator[7].x -40 , lazerIndicator[7].y - 50, 80, 80);
        ctx.drawImage(lazerIndicatorImages[8], lazerIndicator[8].x -40 , lazerIndicator[8].y - 50, 80, 80);
        if(elapsedTime >= 29.3 && elapsedTime <= 30.25){
            //lazerAttack[11].render();
            //lazerAttack[12].render();
            //lazerAttack[5].render();
            ctx.drawImage(lazerAttacks[5].image, lazerAttacks[5].x , lazerAttacks[5].y , lazerAttacks[5].w, lazerAttacks[5].h);
            ctx.drawImage(lazerAttacks[11].image, lazerAttacks[11].x , lazerAttacks[11].y , lazerAttacks[11].w, lazerAttacks[11].h);
            ctx.drawImage(lazerAttacks[12].image, lazerAttacks[12].x , lazerAttacks[12].y , lazerAttacks[12].w, lazerAttacks[12].h);
            if (lazerAttack[11].overlaps(avatar) || lazerAttack[12].overlaps(avatar) || lazerAttack[5].overlaps(avatar) ) {
                health -=3 
            }
        }
    }
    //all top tiny missing middle, Large middle
    if(elapsedTime >= 30.25 && elapsedTime <= 31.90){
        ctx.drawImage(lazerIndicatorImages[0], lazerIndicator[0].x -40 , lazerIndicator[0].y - 50, 80, 80);
        ctx.drawImage(lazerIndicatorImages[1], lazerIndicator[1].x -40 , lazerIndicator[1].y - 50, 80, 80);
        const indicator2 = tinyLazerIndicators[2];
        const indicator3 = tinyLazerIndicators[3];
        const indicator5 = tinyLazerIndicators[5];
        const indicator6 = tinyLazerIndicators[6];
        ctx.drawImage(indicator2.image, indicator2.x - 40, indicator2.y - 50, indicator2.w, indicator2.h);
        ctx.drawImage(indicator3.image, indicator3.x - 40, indicator3.y - 50, indicator3.w, indicator3.h);
        ctx.drawImage(indicator5.image, indicator5.x - 40, indicator5.y - 50, indicator5.w, indicator5.h);
        ctx.drawImage(indicator6.image, indicator6.x - 40, indicator6.y - 50, indicator6.w, indicator6.h);
        if(elapsedTime >= 30.95 && elapsedTime <= 31.90){
            //lazerAttack[2].render();
            //lazerAttack[3].render();    
            //lazerAttack[4].render();
            //lazerAttack[6].render();
            //lazerAttack[7].render();
            ctx.drawImage(lazerAttacks[2].image, lazerAttacks[2].x , lazerAttacks[2].y , lazerAttacks[2].w, lazerAttacks[2].h);
            ctx.drawImage(lazerAttacks[3].image, lazerAttacks[3].x , lazerAttacks[3].y , lazerAttacks[3].w, lazerAttacks[3].h);
            ctx.drawImage(lazerAttacks[6].image, lazerAttacks[6].x , lazerAttacks[6].y , lazerAttacks[6].w, lazerAttacks[6].h);
            ctx.drawImage(lazerAttacks[4].image, lazerAttacks[4].x , lazerAttacks[4].y , lazerAttacks[4].w, lazerAttacks[4].h);
            ctx.drawImage(lazerAttacks[7].image, lazerAttacks[7].x , lazerAttacks[7].y , lazerAttacks[7].w, lazerAttacks[7].h);
            if (lazerAttack[2].overlaps(avatar) || lazerAttack[3].overlaps(avatar) || lazerAttack[4].overlaps(avatar) || lazerAttack[6].overlaps(avatar)|| lazerAttack[7].overlaps(avatar) ) {
                health -=3 
            }
        }
    }
    //2nd and 3rd tiny above
    if (elapsedTime >= 32 && elapsedTime <= 35) {
        const indicator3 = tinyLazerIndicators[3];
        const indicator5 = tinyLazerIndicators[5];
        ctx.drawImage(indicator3.image, indicator3.x - 40, indicator3.y - 50, indicator3.w, indicator3.h);
        ctx.drawImage(indicator5.image, indicator5.x - 40, indicator5.y - 50, indicator5.w, indicator5.h);
        if(elapsedTime >= 32.5 && elapsedTime <= 35){
            //lazerAttack[4].render();
            //lazerAttack[6].render();
            ctx.drawImage(lazerAttacks[4].image, lazerAttacks[4].x , lazerAttacks[4].y , lazerAttacks[4].w, lazerAttacks[4].h);
            ctx.drawImage(lazerAttacks[6].image, lazerAttacks[6].x , lazerAttacks[6].y , lazerAttacks[6].w, lazerAttacks[6].h);
            if (lazerAttack[6].overlaps(avatar) || lazerAttack[4].overlaps(avatar) ) {
                health -=3 
            }
        }
    }
    //large middle above
    if(elapsedTime >= 32.75 && elapsedTime <= 35){
        ctx.drawImage(lazerIndicatorImages[2], lazerIndicator[2].x -40 , lazerIndicator[2].y - 50, 80, 80);
        if(elapsedTime >= 33.5 && elapsedTime <= 35){
            //lazerAttack[8].render();
            ctx.drawImage(lazerAttacks[8].image, lazerAttacks[8].x , lazerAttacks[8].y , lazerAttacks[8].w, lazerAttacks[8].h);
            if (lazerAttack[8].overlaps(avatar)) {
                health -=3 
            }
        }
    }
    if(elapsedTime >= 35.1){
        state = win;
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
    //drawLazerIndicators(ctx, lazerIndicator);
    
   
    
    
    
}



}
