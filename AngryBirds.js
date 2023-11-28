const {Engine, World, Mouse, MouseConstraint, Events} = Matter;

let engine, world, bird, ground, redImg, boxImg, bckGroundImg, pigImg, boxes = [];
let mouseConstraint, slingshot; 

let slingshotTexture;

function preload() {
  slingshotTexture = loadImage('slingshot.png');
  redImg = loadImage('red.png');
  boxImg = loadImage('box.png');
  bckGroundImg = loadImage('background.png');
  pigImg = loadImage('pig.png');
}

function setup() {
  const canvas = createCanvas(800, 600);
  
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

  slingshot = new SlingShot(150, 375, bird.body, slingshotTexture);

  Events.on(engine, 'afterUpdate', 
    () => slingshot.fly(mouseConstraint));
  
  ground = new Ground(width/2, height - 10, width, 20);
  
  for (let i=0; i<8; i++){
    boxes[i] = new Box(width * 3.0 / 4.0, 50*(i+1), 50, 50, boxImg);
  }
}

function draw() {
  background(bckGroundImg);
  Engine.update(engine);
  
  slingshot.show();
  bird.show();
  
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
}
