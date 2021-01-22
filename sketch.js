var balloon;
var database;
var position;

function preload(){
  bg = loadImage("BG.jpg");
  hab = loadImage("Hot Air Ballon-02.png");
}
function setup() {
  createCanvas(1000,800);
  database = firebase.database();

  balloon = createSprite(400, 200, 50, 50);
  balloon.addImage(hab);
  balloon.scale = 0.3;
  console.log(balloon.x);
  console.log(balloon.y);

  var balloonPosRef = database.ref('Balloon/position');
  balloonPosRef.on("value", readPos, showError);
}

function draw() {
  background(bg);
  
  textSize(25);
  strokeWeight(2);
  stroke("darkviolet");
  fill("black");
  text("Press Arrow keys to move the balloon", 50, 50);
  text("Press Enter key to increase the size of the balloon", 50, 90);
  text("Press Shift key to decrease the size of the balloon", 50, 130);
  
  if(keyDown(LEFT_ARROW)){
    balloon.x = balloon.x - 5;
    updateHeight(-5,0);
  }

  if(keyDown(RIGHT_ARROW)){
    balloon.x +=5;
    updateHeight(+5,0);
  }

  if(keyDown(UP_ARROW)){
    balloon.y -=5;
    updateHeight(0,-5);
  }

  if(keyDown(DOWN_ARROW)){
    balloon.y +=5;
    updateHeight(0,+5);
  }

  if(keyDown(SHIFT)){
    balloon.scale = balloon.scale - 0.01;
  }

  if(keyDown(ENTER)){
    balloon.scale = balloon.scale + 0.01;
  }

  drawSprites();
}

function readPos(data){
  position = data.val();
  balloon.x = position.x;
  balloon.y = position.y;
}

function showError(){
  console.log("error");
}

function updateHeight(x,y){
  database.ref('Balloon/position').set({
   'x': position.x + x,
   'y': position.y + y
  })
}

function readHeight(data){
  height = data.val();
  balloon.x = height.x,
  balloon.y = height.y
}
