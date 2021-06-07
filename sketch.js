var PLAY = 1;
var END = 0;
var gameState = PLAY;


var boy_running , boy ;


function preload(){
    boy_running=loadAnimation("boy1.png","boy2.png","boy3.png","boy4.png","boy5.png","boy6.png");
    
  backImg=loadImage("backcover.png");
  grassCover=loadImage("grass3.png")


  boy_burning=loadAnimation("boyburn1.png","boyburn2.png","boyburn3.png","boyburn4.png")

   

    fire1 = loadImage("fire1.png");
   fire2 = loadImage("fire2.png");
   // fire3 = loadImage("fire3.png");
   // fire4 = loadImage("fire4.png");

    gameOverImg = loadImage("gameOver.png");
  restartImg = loadImage("restart.png");
}

function setup(){
    createCanvas(800,600);

    
   


   backgroundCover=createSprite(400,300)
   backgroundCover.addImage("background",backImg)
   backgroundCover.scale=1.05


    ground = createSprite(400,612,800,50);
    ground.shapeColor="white"
    ground.x = ground.width/2;
    

    grass = createSprite(400,575);
    grass.addImage("grass",grassCover)
    //grass.x = grass.width/2;
   // grass.velocityX=-3
    grass.scale=0.1

    boy= createSprite(50,520,50,50);
    boy.addAnimation("running",boy_running);
    boy.addAnimation("burning",boy_burning);


    
    
    fireGroup = new Group();

   
   
       

}

function draw(){
background(255);


if (gameState===PLAY){

  ground.velocityX=-3
boy.changeAnimation("running",boy_running)

if(keyDown("space")&& boy.y >= 160) {
  boy.velocityY = -13;
}

boy.velocityY = boy.velocityY + 0.8

  if (ground.x < 0){
    ground.x = ground.width/2;
  }

 
  boy.collide(ground);  
      
      spawnFire();

     if(fireGroup.isTouching(boy)){
        gameState = END;
      }
      
    }
      else if   ( gameState===END){
        ground.velocityX = 0;

        fireGroup.setVelocityXEach(0);

     boy.changeAnimation("burning",boy_burning)

     fireGroup.setLifetimeEach(-1);

       }
      

     




  
  drawSprites();
}

function spawnFire(){
 if (frameCount % 60 === 0){
   var obstacle = createSprite(400,550 ,10,40);
   obstacle.velocityX = -6;

   
    // //generate random obstacles
    var rand = Math.round(random(1,2));
    switch(rand) {
      case 1: obstacle.addImage(fire1);
              break;
      case 2: obstacle.addImage(fire2);
              break;
      
      default: break;
    }
   
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.15;
    obstacle.lifetime = 300;
 
   fireGroup.add(obstacle);
 
 }
  
}

