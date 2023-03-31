import Phaser from "phaser";


const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: "arcade",
    arcade: {
      gravity: {y:450 },
      debug: true
    }
  },
  scene:{
    preload,
    create,
    update
  }
}

const FlapVelocity = 300;
const PipeSpawnTime = 3000;

let bird = null;
let pipe = null;
let pipeTimecount = 0;

function preload(){
  this.load.image("sky", "assets/sky.png");
  this.load.image("bird", "assets/bird.png");
  this.load.image("pipe", "assets/pipe.png");
}

function create(){
  this.add.image(0, 0, "sky").setOrigin(0);
  bird = this.add.sprite(100, config.height / 2, "bird");
  this.physics.add.existing(bird);
  this.input.keyboard.on("keydown-SPACE", flap);
}

function update(time, delta){
  pipeTimecount += delta;
  if(pipeTimecount >= PipeSpawnTime){
    spawnPipe(this);
    pipeTimecount = 0;
    
  }
}

function flap(){
  bird.body.velocity.y = -FlapVelocity;  
}

function spawnPipe(game){
  let yPosition = (Math.random() * 100);
  
  pipe = game.add.sprite(config.width,config.height-622 + yPosition, "pipe")

  game.physics.add.existing(pipe);
  
  pipe.body.allowGravity = false;
  pipe.body.immovable = true; 
  pipe.body.velocity.x = -100;
  spawnPipe2(game, yPosition);
}

function spawnPipe2(game, y){
 
  
  pipe = game.add.sprite(config.width ,config.height+y, "pipe")
 
  game.physics.add.existing(pipe);
  pipe.body.allowGravity = false;
  pipe.body.immovable = true; 
  pipe.body.velocity.x = -100;
}


new Phaser.Game(config);