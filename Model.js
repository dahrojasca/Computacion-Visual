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

class SlingShot{
  constructor(body, img){
    const options = {
      pointA :{
        x : body.body.position.x,
        y : body.body.position.y
      },
      bodyB: body.body,
      length : 5 ,
      stiffness: 0.05
    }
    this.sling = Matter.Constraint.create(options);
    Matter.World.add(world, this.sling);
    this.img = img;
  }
  show(){
    if(this.sling.bodyB != null){
      
      stroke(37,17,12);
      //texture(letherImg);
      strokeWeight(5);
      stroke(this.sling.pointA.x , this.sling.pointA.y,
      this.sling.bodyB.position.x, this.sling.bodyB.position.y);
      console.log("entra");
      image(this.img)
      fill(255);
      
    }
  }
  fly(mConstraint){
    //mouse.button == -1 : si está presionado el click izquierdo
    if(this.sling.bodyB != null && mConstraint.mouse.button == -1
      && this.sling.bodyB.position.x > 150){
        console.log("entra al otro");
         bird.body.collisionFilter.category = 2;
         this.sling.bodyB = null;
         
      }
  }
  attach(body){
    this.sling.bodyB = body;
  }
}

class Pig {
  constructor(x, y, r, m, img){
    //super(x, y, w, h, img);
    this.body = Matter.Bodies.circle(x, y, r, m);
    Matter.Body.setMass(this.body, m);
    Matter.World.add(world, this.body);

    this.img = img;
    this.r = r;
  }
  // show() {
  //   push();
  //   translate(this.body.position.x, this.body.position.y);
  //   rotate(this.body.angle);
  //   if (this.img) {
  //     imageMode(CENTER);
  //     image(this.img, 0, 0, this.r, this.m);
  //   } else {
  //     noStroke();
  //     rectMode(CENTER);
  //     rect(0, 0, this.w, this.h);
  //   }

  show() {
    const pos = this.body.position; // Obtén la posición del cuerpo del cerdo
    const angle = this.body.angle;

    push();
    translate(pos.x, pos.y);
    rotate(angle);
    imageMode(CENTER);
    image(this.img, 0, 0, this.r * 2, this.r * 2); // Usa el radio para el tamaño de la imagen
    pop();
  }
}
