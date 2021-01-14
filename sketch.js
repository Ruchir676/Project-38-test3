var backImage,backgr;

var ground,roof;

var spaceship, spaceship_img;

var banana ,bananaImage, astroid, astroid_img;

var FoodGroup,obstacleGroup;

var survivalTime=0;

function preload(){
  backImage=loadImage("images/space.png");
  
  spaceship_img = loadImage("images/spaceship.png");

  bananaImage = loadImage("images/banana.png");
  astroid_img = loadImage("images/astroid.png"); 
  
}

function setup() {
  canvas = createCanvas(displayWidth,displayHeight);
  
  backgr=createSprite(displayWidth/2,displayHeight/2,displayWidth*1000,displayHeight);
  backgr.addImage(backImage);
  backgr.scale = 2;
  backgr.velocityX=-2;
  
  ground = createSprite(400,700,800,160);
  ground.visible=false;
  
  roof = createSprite(400,-20,800,160);
  roof.visible=false; 
 
  
  spaceship = createSprite(200,300);
  spaceship.addImage("spaceship",spaceship_img);
  spaceship.scale=.5;    
  
  FoodGroup=createGroup();
  obstacleGroup=createGroup();
}

function draw() {
  
  background(255); 

  if(backgr.x<600){
    backgr.x=backgr.width/2;
  }
  
  spaceship.collide(ground);
  spaceship.collide(roof);
  
  if(keyDown("UP_ARROW")) {
    spaceship.velocityY=-6;    
  }
  if(keyDown("DOWN_ARROW")) {
    spaceship.velocityY=6;    
  }
  
  if(FoodGroup.isTouching(spaceship)) {
    FoodGroup.destroyEach();
    
  }
  
  if(obstacleGroup.isTouching(spaceship)) {
    spaceship.scale=0.1;
  }
  
  
  food();
  spawnObstacle();
  
  drawSprites();
  
  stroke("white");
  textSize(20);
  fill("white");
  survivalTime = Math.ceil(frameCount / frameRate())
  text("Survival Time:  "+ survivalTime,500,50);
  
}
function food() {
  if(World.frameCount%80===0){
    banana = createSprite(800,0,10,10);
    banana.addImage(bananaImage);
    banana.scale=0.05;
    banana.velocityX=-4;
    banana.y = Math.round(random(120,200));
    banana.lifetime=200;
    FoodGroup.add(banana); 
  }
}

function spawnObstacle() {
  if(camera.position.x === backgr.x) {
    astroid = createSprite(800,300,10,10);
    astroid.addImage(astroid_img);
    astroid.scale=0.25;
    astroid.velocityX=-6;
    astroid.lifetime=133;
    obstacleGroup.add(astroid);
  }
}
