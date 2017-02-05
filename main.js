//create our main state that will contain the game
var mainState = {
  preload: function() {
    //This funt¥ction will be executed in the beggining
    //Thats were we load stuff

    //load the bird sprite
    game.load.image('bird', 'assets/bird.png');

    //load pipe
    game.load.image('pipe', 'assets/pipe.png');

    //load sound effetc fo yump
    game.load.audio('bounce', 'assets/bounce.wav');
    //load backgroud sound fo playerz
    game.load.audio('music', 'assets/undertaleDummy.mp3');
  },
  create: function() {
    //Called after preload
    //Set up display ,sprite ect

    //background musiic
    this.music = game.add.audio('music');
    this.music.play();
    
    //change background blue
    game.stage.backgroundColor = '#44abe0';

    //set physics system
    game.physics.startSystem(Phaser.Physics.ARCADE)

    //create an empty group
    this.pipes = game.add.group();
    //display the bird at the position x=100 y =245
    this.bird = game.add.sprite(100, 245, 'bird');

    //bonce sound
    this.bounceSound = game.add.audio('bounce');

    //add physics to bird
    //for movements, gravity , collisions, etc.
    game.physics.arcade.enable(this.bird);

    //change ancor for bird to middle back
    this.bird.anchor.setTo(-0.2, 0.5);

    //add gravity 2 bird
    this.bird.body.gravity.y = 1000;

    //call jump when space is hit
    var spaceBar = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    spaceBar.onDown.add(this.jump, this);

    //timer add row of pipes every 1.5 seconds
    this.timer = game.time.events.loop(1500, this.addRowOfPipes, this);

    //this keeps score
    this.score = 0;
    this.labelScore = game.add.text(20, 20, "0",
      { font: "30px Arial", fill: "#ffffff"});
  },
  update: function() {
    //This is called 60 times per second
    //It contains logic

    //the anglewill cjange as the jump happenz
    if(this.bird.angle < 20)
      this.bird.angle += 3

    //If the bird is out oof scrreeen call game restart
    if(this.bird.y <0 || this.bird.y >490)
      this.restartGame();

    //restart if touch pip
    game.physics.arcade.overlap(
      this.bird, this.pipes, this.hitPipe, null, this);
  },

  //makes the bird jump
  jump: function() {
    //dont yump when deed
    if(this.bird.alive == false){
      return;
    }

    //bounce sound
    this.bounceSound.play();

    //add a verticaal velocity 2 bird
    this.bird.body.velocity.y = -350;

    //add angl to juymp and add animation
    var animation = game.add.tween(this.bird);

    //chang angl to -20 degreez for 100 milsecondz
    animation.to({angle: -20}, 100);

    //start anime
    animation.start();

    //here is another way to wright angle animation
    //game.add.tween(this.bird).to({angle: -20}, 100).start();
  },

  addOnePipe: function(x,y) {
    //create a pipe at a position x, y
    var pipe = game.add.sprite(x, y,'pipe');

    //add pipe 2 pipe gruop
    this.pipes.add(pipe);

    //enable physics on pipe
    game.physics.arcade.enable(pipe);

    //add velocity 2 pipe
    pipe.body.velocity.x = -200;

    //aouto kill pipe when no scrreeen
    pipe.checkWorldBounds = true;
    pipe.outOfBoundsKill = true;
  },

  addRowOfPipes: function() {
    //random pick # btween 1,5. this bbe hole pos.
    var hole = Math.floor(Math.random()*5)+1;
    for (var i = 0; i < 8; i++) {
      if (i != hole && i !=hole+1) {
        this.addOnePipe(400, i * 60 +10);
      }
    }
    this.score += 1;
    this.labelScore.text = this.score;
  },

  //animation of DEATH!
  hitPipe: function (){
    //if the bird is dead do nothin
    if (this.bird.alive == false){
      return;
    }

    //make bird deed
    this.bird.alive = false;

    //stop timer; stop pips
    game.time.events.remove(this.timer);

    //STOP ZE pips that er on zcreen
    this.pipes.forEach(function(lol){
        lol.body.velocity.x = 0;
    }, this);


  },

  //rstart the game
  restartGame: function (){
    //start main state
    game.state.start('main');
  }
};
//


//initialize phazer, and create 400px by 490px game
var game = new Phaser.Game(400, 490);

//add the mainState and call it main
game.state.add('main', mainState);

//Start the state to actually start the game
game.state.start('main');
