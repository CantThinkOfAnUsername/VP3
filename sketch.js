var dB;
var dog, happyDog,foodS,foodStock,sadDog,park,bed,wash
var lastFed 
var gameState
var readState
var currentTime

function preload()
{
  sadDog = loadImage("images/dogImg.png")
  happyDog = loadImage("images/dogImg1.png")
  park = loadImage("images/Garden.png") 
  bed = loadImage("images/Bed Room.png")
  wash = loadImage("images/Wash Room.png")
}

function setup() {
	createCanvas(1000, 1000);
  dB = firebase.database();
  dog = createSprite(10,80);
  dog.addImage(sadDog);
  dog.scale=0.5

  foodObj = new food();
  foodObj.getFoodStock();

  feed=createButton("feed the dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);
  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

  getState();
  console.log(gameState)
}

function draw() {  
  background(46,139,87);

  foodObj.display()
  foodObj.getLastFed()

  drawSprites();

  //add styles here
  fill(255,255,254);
  textSize(15);
  if(lastFed>=12){
    text("Last Feed: ", lastFed%12 + "PM",350,30);
  }else if(lastFed==0){
    text("Last Feed: 12 AM", 350, 30)
  }else{
    text("Last feed: " + lastFed + "AM", 350,30)
  }

  if(gameState!= "Hungry"){
    feed.hide()
    addFood.hide()
    dog.remove()
  }
  else{
    feed.show()
    addFood.show()
    dog.addImage(sadDog)
  }

  currentTime = hour();
  if(currentTime==(lastFed+1)){
    updateState("Playing");
    foodObj.garden();
  }
  else if(currentTime==(lastFed+2)){
    updateState("Sleeping");
    foodObj.bedroom()
  }
  else if(currentTime>(lastFed+2)&&currentTime<=(lastFed+4)){
    updateState("Bathing")
    foodObj.washroom()
  }
  else {
    updateState("Hungry")
    foodObj.display();
  }


}


function writeStock(x){
  if(x<=0){
    x=0;
  }else {
    x=x-1
  }
  dB.ref('/').update({
    'Food': x
  })
}


function feedDog(){
  dog.addImage(happyDog);
  foodObj.getFoodStock();
  foodObj.updateFoodStock(foodStock);
}


function addFoods(){
  foodStock++;
  dB.ref('/').update({
    'Food': foodStock
  })
}

function getState(){
  readState=dB.ref('gameState');
  readState.on("value",(data)=>{
    gameState=data.val();
  });
}

function updateState(newState){
  dB.ref('/').update({
    gameState: newState 
  });

}