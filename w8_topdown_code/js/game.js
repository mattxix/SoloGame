
var c = document.querySelector(`canvas`)
var ctx = c.getContext(`2d`)
var fps = 1000/60
var timer = setInterval(main, fps)
var startTime = Date.now(); 
var elapsedTime = 0; 

function updateTimer() {
    // Calculate the elapsed time in seconds
    elapsedTime = (Date.now() - startTime) / 1000;
     // Display clock
     ctx.font = "20px Arial";
     ctx.fillStyle = "black";
     ctx.textAlign = "left";
     ctx.textBaseline = "middle";
     ctx.fillText("Time: " + elapsedTime, 10, 20);
}
function main()
{
    ctx.clearRect(0,0,c.width,c.height); 
    state()
}

//setup
var state;
var button = new GameObject();
var avatar = new GameObject();
var wall = new GameObject();
var level = new GameObject();
var sword = new GameObject();
var wall = [];
var lazerAttack = new GameObject();
var lazerAttack = [];
var health = 100;





function init()
{
    state = menu

    avatar.color = `#8caba1`;

    

    level.x = 0; 
    level.y = 0;

    //top Wall
    wall[0]=new GameObject();
    wall[0].h =  10;
    wall[0].w = c.width - 400;
    wall[0].color = `#000000`
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
    lazerAttack[0].isActive = true;
    lazerAttack[0].world = level;

    lazerAttack[1]=new GameObject();
    lazerAttack[1].h =  50;
    lazerAttack[1].w = c.width - 400;
    lazerAttack[1].color = `#000000`
    lazerAttack[1].x = c.width/2;
    lazerAttack[1].y = c.height - 400;
    lazerAttack[1].isActive = true;
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

}

function game()
{
   
    updateTimer();
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

    


    //used to move the level. 
    var offset = {x:avatar.vx, y:avatar.vy}

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
    //Did avatar get hit by attack
    for(let i=0; i<lazerAttack.length; i++)
        {
            while(lazerAttack[i].isOverPoint(avatar.bottom()))
            {
                health ++ -1;
                pause(2);
                console.log(health);
            }
            while(lazerAttack[i].isOverPoint(avatar.top()))
            {
                health ++ -1;
                pause(2);
                console.log(health);
            }
            while(lazerAttack[i].isOverPoint(avatar.left()))
            {
                health ++ -1;
                pause(2);
                console.log(health);
            }
            while(lazerAttack[i].isOverPoint(avatar.right()))
            {
                health ++ -1;
                pause(2);
                console.log(health);
            }
          
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
   for(let i=0;i<lazerAttack.length; i++)
   {
    lazerAttack[i].render();
   }

    sword.render();
    avatar.render();
    
}



