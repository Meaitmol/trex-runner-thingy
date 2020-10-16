
var restart, restartimg
var gameOver, gameOverimg
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var trex, trexrun, trexded;
var ground, invisibleGround, groundimg;
var Obstacles,Obstacles1,Obstacles2,Obstacles3,Obstacles4,Obstacles5,Obstacles6;
var Clouds, CloudsImg;
var ObstaclesGroup,CloudsGroup;
var count = 0
function preload() {
  groundimg = loadImage("ground2.png")
  trexrun = loadAnimation("trex1.png", "trex3.png", "trex4.png")
  trexded = loadImage("trex_collided.png")
  Obstacles1 = loadImage("obstacle1.png")
   Obstacles2 = loadImage("obstacle2.png")
   Obstacles3 = loadImage("obstacle3.png")
   Obstacles4 = loadImage("obstacle4.png")
   Obstacles5 = loadImage("obstacle5.png")
   Obstacles6 = loadImage("obstacle6.png")
   CloudsImg = loadImage("cloud.png")
  restartimg = loadImage("restart.png")
    gameOverimg = loadImage("gameOver.png")
}

function setup() {
  createCanvas(600, 200);
  trex = createSprite(50, 180, 20, 50);
  trex.scale = 0.5
  trex.addAnimation("runtrex", trexrun);
  trex.addAnimation("dedtrex", trexded);
  ground = createSprite(200, 180, 200, 20);
  ground.addImage("ground2", groundimg);
  ground.x = ground.width / 2;
   ground.velocityX = -(6 + 3*count/100);
  //invisible Ground to support Trex
  invisibleGround = createSprite(200, 185, 400, 5);
  invisibleGround.visible = false;
ObstaclesGroup = new Group();
CloudsGroup = new Group();
 gameOver = createSprite(300,100);
  gameOver.addImage("gameOver",gameOverimg)
 restart = createSprite(300,140);
  restart.addImage("restart",restartimg)
  gameOver.scale = 0.5;
restart.scale = 0.5;
gameOver.visible = false;
restart.visible = false;
  
  
}

function draw() {
  background(180); 
  text("Score: "+ count, 500, 100);
   if(gameState === PLAY){
     count = count + Math.round(getFrameRate()/60);
   ground.velocityX = -(6 + 3*count/100);
  trex.collide(invisibleGround)
 spawnClouds();
  spawnObstacles();
  if (keyDown("space") && trex.y >= 159) {
    trex.velocityY = -12;
  }
  trex.velocityY = trex.velocityY + 0.8;
     
  if (ground.x < 0) {
    ground.x = ground.width / 2;
  }
     if(ObstaclesGroup.isTouching(trex)){

      gameState = END;

    }
}
    else if(gameState === END) {
    gameOver.visible = true;
    restart.visible = true;
    
    //set velcity of each game object to 0
    ground.velocityX = 0;
    trex.velocityY = 0;
    ObstaclesGroup.setVelocityXEach(0);
    CloudsGroup.setVelocityXEach(0);
    
    //change the trex animation
    trex.changeAnimation("dedtrex", trexded);
    
    //set lifetime of the game objects so that they are never destroyed
    ObstaclesGroup.setLifetimeEach(-1);
    CloudsGroup.setLifetimeEach(-1);
    if(mousePressedOver(restart)) {
    reset();
  }
    
  }
  
  
  drawSprites()
}
function reset(){
  CloudsGroup.destroyEach();
ObstaclesGroup.destroyEach();
 gameState = PLAY;
 gameOver.visible = false;
restart.visible = false;
trex.changeAnimation("runtrex",trexrun);
count = 0
  
}
function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(600,165,10,40);
  
     obstacle.velocityX = -(6 + 3*count/100);
    //generate random obstacles
    var rand = Math.round(random(1,6));
switch(rand){
    case 1:obstacle.addImage(Obstacles1);
           break;
    case 2:obstacle.addImage(Obstacles2);
           break;
    case 3:obstacle.addImage(Obstacles3);
           break;
    case 4:obstacle.addImage(Obstacles4);
           break;
    case 5:obstacle.addImage(Obstacles5);
           break;
    case 6:obstacle.addImage(Obstacles6);
           break;
    default:break
}
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 100;
    //add each obstacle to the group
    ObstaclesGroup.add(obstacle);
  }
  }
function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var cloud = createSprite(600,120,40,10);
    cloud.y = Math.round(random(80,120));
    cloud.addImage("Clouds", CloudsImg);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 200;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    //add each cloud to the group
    CloudsGroup.add(cloud);
  }
}
