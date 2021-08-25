var towerImg, tower;
var doorImg,doorsGroup;
var climberImg, climbersGroup;
var ghost, ghostImg,ghostAnimation;
var invisibleBlockGroup;
var edges;
var gameState = "play";

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadAnimation("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
  ghostAnimation = loadAnimation("ghost-jumping.png","ghost-standing.png");
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  
  doorsGroup = new Group();
  climbersGroup = new Group();
  invisibleBlockGroup = new Group();

  ghost = createSprite(200,200,50,50);
  ghost.addAnimation("jumping",ghostAnimation);
  ghost.addAnimation("standing",ghostImg);
  ghost.scale = 0.3;

  edges = createEdgeSprites();

}

function draw() {
  background("black");

  if (gameState === "play") {

      if (keyDown(LEFT_ARROW)) {
          ghost.x = ghost.x-3;
      }
    
      if (keyDown(RIGHT_ARROW)) {
        ghost.x = ghost.x +3;
      }
    
      if (keyDown("space")) {
        ghost.velocityY = -5;
      }
    
      ghost.velocityY = ghost.velocityY+0.8;
    
      if (climbersGroup.isTouching(ghost)) {
        ghost.velocityY = 0;
      }

      if(tower.y > 400){
        tower.y = 300;
      }
   
      spawnDoors();

      if (invisibleBlockGroup.isTouching(ghost) || ghost.y>600 ) {
        ghost.destroy();
        gameState = "end";
      }
    
      ghost.collide(edges[0]);
      ghost.collide(edges[1]);

      drawSprites();
  }
  else if (gameState === "end") {
    stroke("yellow");
    fill("yellow");
    textSize(30);
    text ("Game Over",230,250);


  }
  
  

}

function spawnDoors() {
  if (frameCount % 240 == 0 ) {
    var door = createSprite(200,-50);
    door.addImage("door",doorImg);
    door.velocityY = tower.velocityY;

    door.x = Math.round(random(120,400));

    door.lifetime = 600;
    doorsGroup.add(door);

    var climber = createSprite(200,10);
    climber.addImage("climber",climberImg);
    climber.velocityY = door.velocityY;
    climber.x = door.x;
    climber.lifetime = 600;
    climbersGroup.add(climber);

    door.depth = ghost.depth;
    ghost.depth += 1;

    var invisibleBlock = createSprite(200,15)
    invisibleBlock.width = climber.width; 
    invisibleBlock.height = 2;
    invisibleBlock.x = door.x;
    invisibleBlock.velocityY = door.velocityY;
    invisibleBlock.lifetime = 600;
    invisibleBlockGroup.add(invisibleBlock);
  }
}
