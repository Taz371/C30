const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

let engine;
let world;

var canvas, angle, tower, ground, cannon;

var balls = [];

function preload() {
  backgroundImg = loadImage("./assets/background.gif");
  towerImage = loadImage("./assets/tower.png");
}


function setup() {
  canvas = createCanvas(1200,600);

  engine = Engine.create();
  world = engine.world;
  angle = -PI/4;

  rectMode(CENTER);
  ellipseMode(RADIUS);
  ground = new Ground(0, height - 1, width * 2, 1);
  tower = new Tower(150, 350, 160, 310);
  cannon = new Cannon(180, 120, 100, 50, angle);
  cannonBall = new CannonBall(cannon.x + 30, cannon.y + 10);
}

function draw() 
{
  background(189);
  image(backgroundImg, 0, 0, width, height);

  for (var i = 0; i < balls.length; i++)
  {
    showCannonBalls(balls[i], i);
  }

  Engine.update(engine);
  ground.display();
  tower.display();
  cannon.display();
  cannonBall.display();
}

function keyPressed()
{
  if (keyCode === DOWN_ARROW)
  {
    var cannonBall = new CannonBall(cannon.x, cannon.y);
    balls.push(cannonBall);
    cannonBall.shoot();
  }
}

function showCannonBalls(ball, index)
{
  ball.display();
  if (ball.body.position.x >= width || ball.body.position.y >= height - 50)
  {
    Matter.World.remove(world, ball.body);
    balls.splice(index, 1);
  }
}
