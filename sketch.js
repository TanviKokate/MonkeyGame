var PLAY = 1;
var END = 0;
var gameState = PLAY;
var monkey, monkey_running;
var ground;
var score = 0;
var survivalTime = 0;
var banana, banana_Image;
var obstacle, obstacle_Image;
var over_Monkey, overMonkey_Image;

function preload() {
  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png");
  banana_Image = loadImage("banana.png");
  obstacle_Image = loadImage("obstacle.png");
  //to assume the monkey as collided when the game is over 
  overMonkey_Image = loadImage("sprite_6.png");
}

function setup() {
  createCanvas(400, 400);
  monkey = createSprite(50, 340);
  monkey.addAnimation("running", monkey_running);
  monkey.scale = 0.13;

  ground = createSprite(200, 380, 800, 6);
  ground.velocityX = -3;
  ground.x = ground.width / 2;

  bananaGroup = new Group();
  obstacleGroup = new Group();

  //To make the monkey visible as stopped
  over_Monkey = createSprite(50, 340);
  over_Monkey.addImage("over", overMonkey_Image);
  over_Monkey.scale = 0.13;

}

function draw() {
  background(220);
 // A decorative Background
  for (var i = 0; i < 400; i = i + 5) {
    stroke(0);
    strokeWeight(0.2);
    text("ooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo", i, i);

  }

  if (gameState === PLAY) {
    if (keyDown("space") && monkey.y > 200) {
      monkey.velocityY = -8;
    }
    monkey.velocityY = monkey.velocityY + 0.5;
    monkey.visible = true;
    over_Monkey.visible = false;
    Obstacles();
    Banana();
    if (monkey.isTouching(bananaGroup)) {
      bananaGroup.destroyEach();
      score = score + 2;
    }
    if (monkey.isTouching(obstacleGroup)) {
      gameState = END;
    }

  } else if (gameState === END) {
    monkey.visible = false;
    over_Monkey.visible = true;
    obstacleGroup.destroyEach();
    bananaGroup.destroyEach();
    bananaGroup.setVelocityEach(0);
    obstacleGroup.setVelocityEach(0);
    ground.velocityX = 0;

    stroke(0);
    strokeWeight(15);
    fill(255);
    textFont("Baskerville Old Face");
    textSize(55);
    text("!!GAME OVER!!", 10, 200);
  }
  if (ground.x < 0) {
    ground.x = ground.width / 2;
  }
  monkey.collide(ground);
  //score
  stroke(0);
  strokeWeight(2);
  fill(100);
  textSize(20);
  textFont("Algerian");
  text("Score : " + score, 300, 18);
  // Survival Time 
  stroke(0);
  strokeWeight(2);
  fill(100);
  textSize(20);
  textFont("Algerian");
  survivalTime = Math.ceil(frameCount / frameRate());
  text("Survival Time : " + survivalTime, 20, 18);
  drawSprites();
}

function Banana() {
  if (frameCount % 80 === 0) {
    banana = createSprite(400, Math.round(random(140, 220)));
    banana.addImage(banana_Image);
    banana.scale = 0.12;
    banana.velocityX = -(5 + (score / 2));
    banana.lifetime = 80;
    bananaGroup.add(banana);
  }
}

function Obstacles() {
  if (frameCount % 100 === 0) {
    obstacle = createSprite(400, 350);
    obstacle.addImage(obstacle_Image);
    obstacle.scale = 0.15;
    obstacle.velocityX = -(8 + (score / 8));
    obstacle.lifetime = 50;
    obstacleGroup.add(obstacle);
  }
}