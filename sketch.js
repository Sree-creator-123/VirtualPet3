var database;
var foodStock;
var foodS;
var dog, dogImg1, dogImg2;
var feedButton, addButton;
var foodObj;
var fedTime;
var currentTime;
var lastFed;
var gameState;
var readState;
var changeState;
var bedroom, garden, washroom;

function preload() {
  dogImg1 = loadImage("images/dogImg.png");
  dogImg2 = loadImage("images/dogImg1.png");

  bedroom = loadImage("images/bedRoom.png");
  garden = loadImage("images/garden.png");
  washroom = loadImage("images/washRoom.png");
}

function setup() {
	createCanvas(1000, 500);
  database = firebase.database();
  console.log(database);
 
  foodObj = new Food()
  dog = createSprite(700,250,10,10);
  dog.addImage(dogImg1);
  dog.scale = 0.15;
  
 

  var foodStock = database.ref('Food');
  foodStock.on("value", readPosition, showError);

  feedButton = createButton("FEED BEN");
  feedButton.position(500, 100);
  feedButton.mousePressed(feedDog);

  addButton = createButton("ADD FOOD");
  addButton.position(600, 100);
  addButton.mousePressed(addFood);

  readState = database.ref('gameState');
  readState.on("value", function(data) {
    gameState = data.val();
  });

} 



function draw(){
  background(46,139,87);

  fedTime = database.ref("fedTime");
  fedTime.on("value", function(data) {
    lastFed = data.val();
  })

  currentTime = hour();
  if(currentTime == (lastFed + 1)) {
    update("Playing");
    foodObj.garden();
  } else if(currentTime == (lastFed + 2)) {
    update("Sleeping");
    foodObj.bedRoom();
  } else if(currentTime > (lastFed + 2) && currentTime <= (lastFed + 4)) {
    update("Bathing");
    foodObj.washRoom();
  } else {
    update("Hungry");
    foodObj.display();
  }

  if(gameState != "Hungry") {
    feedButton.hide();
    addButton.hide();
    dog.remove();
  } else {
    feedButton.show();
    addButton.show();
    dog.addImage(dogImg2);
    //console.log(dog);
  }

  fill("yellow");
  stroke(4);
  textSize(25);

  if(lastFed >= 12){
  
    text("Last Fed : " + lastFed % 12 + " PM", 750, 50);
  } else if(lastFed === 0) {
  
    text("Last Fed : 12 AM", 750, 65)
  } else {
  
    text("Last Fed : " + lastFed + " AM", 750, 50);
  }

  //console.log(currentTime);
  //console.log(lastFed);

  drawSprites();
}

function readPosition(data){

  foodS = data.val();
  foodObj.updateFoodStock(foodS);
  
}

function showError(){
  console.log("Error");
}

function writePosition(x){
  if(x > 0){
    x = x - 1
  } else {
    x = 0
  }

  database.ref('/').set({
    Food: x
  })

}
function addFood(){
  foodS ++;

  database.ref('/').update({
    Food: foodS
  })
}

function feedDog(){

  foodObj.updateFoodStock(foodObj.getFoodStock() - 1);
  database.ref('/').set({
    Food: foodObj.getFoodStock(),
    fedTime: hour()
  })
}

function update(state) {
  database.ref('/').update({
    'gameState': state
  })
}
