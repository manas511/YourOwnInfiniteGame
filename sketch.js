var PLAY = 1;
var END = 0;
var gameState = PLAY;
var mainCar, obstacleCar1 ,obstacleCar2 , obstacleCar3, obstacleCar4, mainCarDamaged , obstacleCarGroup ;
var mainCarImg, obstacleCar1Img, obstacleCar2Img , obstacleCar3Img , obstacleCar4Img;
var groundImg;
var score , edeges , ground;
 var car1 , car2 , car3 , car4;
var stars ; starsImag;
var Star1;
var gameOver; gameOverImg;
var spawnCars;
var score;
var obstgroup , starsGrp;

function preload(){
    mainCarImg = loadImage("4.png");
    obstacleCar1Img = loadImage("5.png");
    obstacleCar2Img = loadImage("1.png");
    obstacleCar3Img= loadImage("2.png");
    obstacleCar4Img= loadImage("3.png");
    groundImg = loadImage("manas.jpeg");
    starsImag = loadImage("star_PNG1597.png");
    gameOverImg = loadImage("game_over_PNG56.png");

}

function setup() {
  
    createCanvas(1500,500);
    ground = createSprite(700,150)
    ground.addImage(groundImg);
    ground.scale=3;
    ground.velocityX = -10;

    mainCar = createSprite(100,80,10,10);
    mainCar.addImage( mainCarImg);
    mainCar.scale =0.35;
    obstgroup = createGroup();
    starsGrp = createGroup();
   gameOver= createSprite(750,250,20,20);
    gameOver.addImage(gameOverImg);

   score = 0;

}

function draw() {
    background(0);
    score = score + Math.round(getFrameRate()/60);
    if(ground.x < 0 ){
        ground.x = width/2;
      }
    edges = createEdgeSprites();
    mainCar.bounceOff(edges);
   
   if ( gameState === PLAY){
       gameOver.visible = false
    if (keyDown("w")){
        mainCar.velocityY = -6;
    }

    if (keyDown("a")){
       mainCar.velocityX = -6;
   }

   if (keyDown("s")){
       mainCar.velocityY = 6;
   }

   if (keyDown("d")){
       mainCar.velocityX = 6;
   }
   if (mainCar.isTouching(starsGrp)){
       score=score+50;
       starsGrp.visible =false
   }
   if ( mainCar.isTouching(obstgroup)){
        gameState === END;
        gameOver.visible = true
        mainCar.velocityX =0;
        if(mousePressedOver(gameOver)){
            reset();
        }
    }
    

    if(gameState === END){
        gameOver.visible = true
        mainCar.velocityX =0;
       

    }
 stars();

 spawnCars();
 }
 

     
 
    drawSprites();
    text("Score: " + score, 1400,50);
    
}

function stars (){
    if (frameCount % 80 ===0){
        star1 = createSprite(Math.round(random(200,1220)),Math.round(random(100,400)),40,40);
       star1.addImage(starsImag);
        star1.velocityX = -11
        star1.scale = 0.15;
        starsGrp.add(star1);
}

}


function spawnCars(){
    if (frameCount % 80 ===0){
        var obst = createSprite(Math.round(random(400,1400)),Math.round(random(50,450)),40,40);
        obst.velocityX = -20;
        obst.scale = 0.35;
        var rand = Math.round(random(1,3));
        switch(rand) {
            case 1: obst.addImage(obstacleCar3Img);
            break;
            case 2 : obst.addImage(obstacleCar2Img);
            break;
            case 3 : obst.addImage(obstacleCar4Img);
            break;
            default : break;
        } 
        obst.lifetime = 300;
        obstgroup.add(obst);
    }
}

function reset(){
   gameState = PLAY; 
 score = 0;
 obstgroup.destroyEach();
   starsGrp.destroyEach();
  
}

