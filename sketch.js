var monkey, monkey_running
var banana, bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score=0;
var ground
var survivalTime
var background,bkg;
var health=0;
var gameState="play";
var end;
var gameOver,gameOverImage;
function preload() {
  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png")
  forest=loadImage("forest.jpg")
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
//bkg=loadImage("jungle.jpg");
  gameOverImage=loadImage("game_over_PNG57.png");
}



function setup() {
  createCanvas(displayWidth/1.5, displayHeight/1.8);
  monkey = createSprite(80, 315, 20, 20);
  monkey.addAnimation("running", monkey_running);
  monkey.scale = 0.13;
  monkey.y = 520;
  ground = createSprite(200, 560, 100000000000000, 20);
  obstacleGroup = createGroup();
  bananaGroup = createGroup();
  ground.visible=true;
  //background=createSprite(200,200,20,20);
 // background.addImage(bkg);
  
}


function draw() {
  background("lime")
  if(gameState==="play"){
  background.velocityX=-5;
  
  if (keyDown("space") && monkey.y ==510.09) {
    monkey.velocityY = -20;
  }
  if(keyDown("right")){
    monkey.velocityX=5;
    
  }
  if(keyWentUp("right")){
    monkey.velocityX=0;
    
    
  }
  image(forest,0,-displayHeight*3,displayWidth,displayHeight*5)
  ground.x=displayWidth/2;
   
    if (keyDown("space") && monkey.y ==529.31) {
    monkey.velocityY = -20;
  }
    if (keyDown("space") && monkey.y ==528.51) {
    monkey.velocityY = -20;
  }
    
 if (background.x < 100){
      background.x = background.width/2;
    }
  console.log(monkey.y);
  background.depth=monkey.depth;
  background.depth=background.depth-1;
  if (monkey.isTouching(obstacleGroup)) {
  health=health-1;
  }
  if(health===-31){
    
    gameState=end;
    
  }
  camera.position.x=monkey.x;
  
  monkey.velocityY = monkey.velocityY + 0.8;
  monkey.collide(ground);
  obstacleS();
  bannanaS();
  if (monkey.isTouching(bananaGroup)) {
    bananaGroup.destroyEach();
    monkey.scale=0.13;
    score = score + 2;
  }
  }
  if(health===-54){
    gameState=end;
  }
  if(gameState===end){
    background.velocityX=0;
     obstacleGroup.velocityX=0;
    bananaGroup.velocityX=0;
     bananaGroup.destroyEach();
     obstacleGroup.destroyEach();
    gameOver=createSprite(200,200);
    textSize(50);
    text("Game Over",camera.position.x,camera.position.y)
    gameOver.scale=0.4;
  }
  console.log(health);
  drawSprites();
  
  stroke("black");
  textSize(20);
  fill("black");
  text("Score:" + score, camera.position.x-50, 50);


  function obstacleS() {
    if (frameCount % 300 === 0) {
      obstacle = createSprite(camera.position.x+500, 520, 50, 50);
      obstacle.addImage(obstaceImage);
      obstacle.scale = 0.2;
      obstacle.velocityX = 0;
      obstacle.setLifetime = 200;
      obstacle.debug = true;
      obstacle.setCollider("circle", 0, 0, 200);
      obstacleGroup.add(obstacle);
    }
  }

  function bannanaS() {
    if (frameCount % 80 === 0) {
      banana = createSprite(camera.position.x+300, 250, 30, 30);
      banana.velocityX = 0;
      banana.addImage(bananaImage);
      banana.scale = 0.2;
      banana.setLifetime = 200;
      banana.y = Math.round(random(240, 400));
      bananaGroup.add(banana);
    }
  }

}


