var path,mainCyclist;
var pathImg,mainRacerImg1,mainRacerImg2;

var END =0;
var PLAY =1;
var gameState = PLAY;

var distance=0;
var pink,pinkImg,pinkImg2,pinkCG,yellow,yellowImg,yellowImg2, yellowCG,redL,redImg,redImg2,redCG,pinkE,redE,yellow,yellowImg,yellowImg2,yellowE,yellowCG;

var cycleBell;
var gameOverImg;


var obstaclesGroup, obstacle1, obstacle2;

function preload(){
  pathImg = loadImage("images/Road.png");
  mainRacerImg1 = loadAnimation("images/mainPlayer1.png","images/mainPlayer2.png");
 
   mainRacerImg2= loadAnimation("images/mainPlayer3.png");
  
  pinkImg = loadImage("opponent1.png");
  pinkImg2 = loadImage("opponent2.png");
  pinkE = loadImage("opponent3.png");
  

  
  redImg = loadImage("opponent7.png");
  redImg2 = loadImage("opponent8.png");
  redE = loadImage("opponent9.png");
  
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  gameOverImg = loadImage("gameOver.png")
  
  cycleBell=loadSound("sound/bell.mp3");
  
  yellowImg = loadImage("opponent4.png");
  yellowImg2 = loadImage("opponent5.png");
  yellowE = loadImage("opponent6.png");
  
  
  
  
  
}

function setup(){
  
createCanvas(500,300);
  
// Moving background
path=createSprite(100,150);
path.addImage(pathImg);
path.velocityX = -(5+4*distance/150);

//creating boy running
mainCyclist  = createSprite(70,150,20,20);
mainCyclist.addAnimation("SahilRunning",mainRacerImg1);
  mainCyclist.addAnimation("player.png",mainRacerImg2);
mainCyclist.scale=0.07;
  mainCyclist.setCollider("circle",20,100,10)
  mainCyclist.debug = false;
  

  pinkCG = createGroup();
  yellowCG = createGroup();
  redCG = createGroup();
  yellowCG = createGroup();
  obstaclesGroup = createGroup();
  
  gameOver = createSprite(300,150,20,20);
  gameOver.addImage(gameOverImg);
  gameOver.scale = 0.3;
  
    gameOver.visible = false;
  
  
}

function draw() {
  background(0);
  
  drawSprites();
  textSize(20);
  fill(255);
  text("Distance: "+ distance,350,30);
  
  if(gameState===PLAY){
  
   mainCyclist.y = World.mouseY;
    
    Obstacles();
    
    if(keyDown("space")){
      cycleBell.play()
    }
    
   
  
   edges= createEdgeSprites();
   mainCyclist .collide(edges);
  
  //code to reset the background
  if(path.x < 0 ){
    path.x = width/2;
  }
    
    
    distance = distance+Math.round(getFrameRate()/50);
    
    var select_oppPlayer = Math.round(random(1,3));
    if(World.frameCount%150==0){
      if(select_oppPlayer==1){
         pinkCyclists();
         }else if(select_oppPlayer==2){
           redCyclists();
         }else {
           yellowCyclists();
         }
    
    }
 }
  
  if(pinkCG.isTouching(mainCyclist)){
    gameState = END;
    
 mainCyclist.changeAnimation("player.png",mainRacerImg2)    
    
    }
  
  if(redCG.isTouching(mainCyclist)){
    gameState = END;
    
    
    mainCyclist.changeAnimation("player.png",mainRacerImg2)
    

   
    
   }
  
  if(yellowCG.isTouching(mainCyclist)){
    gameState = END;
    
     mainCyclist.changeAnimation("player.png",mainRacerImg2)
    
    
    
  }
  if(obstaclesGroup.isTouching(mainCyclist)){
    gameState= END;
    pinkCG.destroyEach();
    redCG.destroyEach();
    yellowCG.destroyEach();
    
      mainCyclist.changeAnimation("player.png",mainRacerImg2);
    
    
    
    
    
  }
  if(gameState===END){
    gameOver.visible = true;
     path.velocityX = 0;
    textSize(20);
    text("press up arrow to restart",200,200);
    path.velocityX = 0;
    yellowCG.destroyEach();
    yellowCG.setVelocityXEach(0);
    yellowCG.setLifetimeEach(-1);
    
     redCG.destroyEach();
     redCG.setVelocityXEach(0);
     redCG.setLifetimeEach(-1);
    
    pinkCG.destroyEach();
    pinkCG.setVelocityXEach(0);
    pinkCG.setLifetimeEach(-1);
    
    
    mainCyclist.velocityX = 0;
    
          
   
   
    

   
    obstaclesGroup.setVelocityEach(0);
    obstaclesGroup.destroyEach();
    
    
    if(keyDown("UP_ARROW")){
      mainCyclist.changeAnimation("SahilRunning",mainRacerImg1);
      
  
      reset();
    }
  }
  
}
function reset(){
  gameState = PLAY;
  pinkCG.destroyEach();
   redCG.destroyEach();
  obstaclesGroup.destroyEach();
  distance =0
  path.velocityX = -(5+4*distance/150);
  
  gameOver.visible = false;
  
  
  
}
function pinkCyclists(){
  pink =         createSprite(1100,Math.round(random(50,250),10,10));
  pink.scale = 0.07;
    pink.addAnimation("opponent1.png","opponent2.png",pinkImg,pinkImg2);
  pink.setLifetime = 170;
  pink.velocityX = -(6+2*distance/150);
  pinkCG.add(pink);
  
}



function redCyclists(){
  redL = createSprite(1100,Math.round(random(50,250),10,10));
  redL.scale = 0.07;
  redL.velocityX = -(6+3*distance/150);
  redL.addAnimation("opponent7.png","opponent8.png",redImg,redImg2);
  redL.setLifetime = 170;
  pinkCG.add(redL);
  
}

function yellowCyclists(){
  yellow =         createSprite(1100,Math.round(random(50,250),10,10));
  yellow.scale = 0.07;
    yellow.addAnimation("opponent4.png","opponent5.png",yellowImg,yellowImg2);
  yellow.setLifetime = 170;
  yellow.velocityX = -(1+2*distance/150);
  pinkCG.add(yellow);
  
}
function Obstacles(){
 if (frameCount % 60 === 0){
   var obstacle = createSprite(600,165,10,40);
   obstacle.velocityX = -(8 +3* distance/100);
   
   
   
    //generate random obstacles
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      default: break;
    }
   
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.08;
    obstacle.lifetime = 300;
   
   //add each obstacle to the group
    obstaclesGroup.add(obstacle);
 }
}






