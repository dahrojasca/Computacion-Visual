class Bird {
  constructor(x, y, r, m, img){
    this.body = Matter.Bodies.circle(x, y, r, {
      restitution: 0.5,
      collisionFilter: {
        category: 2
      }
    });
    Matter.Body.setMass(this.body, m);
    Matter.World.add(world, this.body);
    this.img = img;
  }
  
  show() {
    push();
    translate(this.body.position.x, this.body.position.y);
    rotate(this.body.angle);
    fill(255);
    //ellipse(0, 0, 2*this.body.circleRadius, 2*this.body.circleRadius);
    imageMode(CENTER);
    image(this.img, 0, 0, 2*this.body.circleRadius, 2*this.body.circleRadius);
    pop();
  } 
}

class Box {
  constructor(x, y, w, h, img, options={}) {
    this.body = Matter.Bodies.rectangle(x, y, w, h, options);
    this.w = w;
    this.h = h;
    this.img = img;
    Matter.World.add(world, this.body);
  }
  
  show() {
    push();
    translate(this.body.position.x, this.body.position.y);
    rotate(this.body.angle);
    if (this.img) {
      imageMode(CENTER);
      image(this.img, 0, 0, this.w, this.h);
    } else {
      fill(50, 200, 0);
      noStroke();
      rectMode(CENTER);
      rect(0, 0, this.w, this.h);
    }
    pop();
  } 
}

class Ground extends Box {
  constructor(x, y, w, h){
    super(x, y, w, h, null, {isStatic: true});
  }
  
}

class SlingShot {
  construntor(x, y, body, img){
    const options = {
      pointA: {
        x: x,
        y: y
      },
      bodyB: body,
      stiffness: 0.02,
      length: 40
    }
    this.sling = Matter.Constraint.create(options);
    Matter.World.add(world, this.sling);
  }
  fly(){
    this.sling.bodyB = null;
  }
  show(){
    if (this.sling.bodyB){
      stroke(0);
      strokeWeight(4);
      const posA = this.sling.pointA;
      const posB = this.sling.bodyB.position;
      line(posA.x, posA.y, posB.x, posB.y);
    }
  }

  attach(body){
    this.sling.bodyB = body;
  }
}

class Pig extends Box{
  constructor(x, y, w, h, img){
    super(x, y, w, h, img);
    this.body = Matter.Bodies.circle(x, y, w, h);
    Matter.World.add(world, this.body);

    this.img = img;
  }
  show() {
    push();
    translate(this.body.position.x, this.body.position.y);
    rotate(this.body.angle);
    if (this.img) {
      imageMode(CENTER);
      image(this.img, 0, 0, this.w, this.h);
    } else {
      noStroke();
      rectMode(CENTER);
      rect(0, 0, this.w, this.h);
    }
    pop();
  }
}
