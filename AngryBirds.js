const {Engine, World, Mouse, MouseConstraint, Events} = Matter;

let engine, world, bird, ground, redImg, boxImg, bckGroundImg, slingshotImg, pigImg, boxes = [], pigs=[];
let mouseConstraint, slingshot; 

let slingshotTexture;

function preload() {
  slingshotTexture = loadImage('slingshot.png');
  redImg = loadImage('red.png');
  boxImg = loadImage('box.png');
  bckGroundImg = loadImage('background.png');
  pigImg = loadImage('pig.png');
  slingshotImg = loadImage('slingshot.png');
}

function setup() {
  const canvas = createCanvas(1200, 600);
  
  engine = Engine.create();
  world = engine.world;
  
  const mouse = Mouse.create(canvas.elt);
  mouse.pixelRatio = pixelDensity();
  
  mouseConstraint = MouseConstraint.create(engine, {
    mouse: mouse,
    collisionFilter: {mask: 2}
  });
  World.add(world, mouseConstraint);
  
  bird = new Bird(150, 375, 25, 5, redImg);

  slingshot = new SlingShot(bird, slingshotImg);

  Events.on(engine, 'afterUpdate', 
    () => slingshot.fly(mouseConstraint));
  
  ground = new Ground(width/2, height - 10, width, 20);
  
  for (let i=0; i<16; i++){
    if(i%2==0){
      boxes[i] = new Box(width * 3 / 4.0, 10, 50, 50, boxImg);
    }
    else{
      boxes[i] = new Box(width * 4 / 4.3, 0, 50, 50, boxImg);
    }
  }
  for (let i=0; i<3; i++){
    pigs[i] = new Pig(width * random(2.8,3.6) / 4.0+100, 50*(i+1), 28, 1, pigImg);
  }
}

function draw() {
  background(bckGroundImg);
  Engine.update(engine);
  
  slingshot.show();
  bird.show();
  image(slingshotImg,80,360,140,220);
  ground.show();
  
  for (const box of boxes) {
    box.show();
  }

  for (const pig of pigs) {
    pig.show();
  }
}

function keyPressed(){
  if (key == ' ' && !slingshot.hasBird()) {
    World.remove(world, bird.body);
    bird = new Bird(150, 375, 25, 5, redImg);
    slingshot.attach(bird);
  }
  if(key == 'r'){
    setup();
  }
}
