//create our main state that will contain the game
var mainState = {
  preload: function() {
    //This funt¥ction will be executed in the beggining
    //Thats were we load stuff

    //load the bird sprite
    game.load.image('bird', 'assets/bird.png');
  },
  create: function() {
    //Called after preload
    //Set up display ,sprite ect

    //change background blue
    game.stage.backgroundColor = '#44abe0';

    //set physics system
    game.physics.startSystem(Phaser.Physics.ARCADE)

    //display the bird at the position x=100 y =245
    this.bird = game.add.sprite(100, 245, 'bird');

    //add physics to bird
    //for movements, gravity , collisions, etc.
    game.physics.arcade.enable(this.bird);

    //add gravity 2 bird
    this.bird.body.gravity.y = 1000;

    //call jump when space is hit
    var spaceBar = game.input.keyboard.addkey(Phaser.Keyboard.SPACEBAR);
    spaceBar.onDown.add(this.jump, this);
  },
  update: function() {
    //This is called 60 times per second
    //It contains logic

    //If the bird is out oof scrreeen call game restart
    if(this.bird.y <0 || this.bird.y >490)
      this.restartGame();
  },

  //makes the bird jump
  jump: function() {
    //add a verticaal velocity 2 bird
    this.bird.body.velocity.y = -350;
  },

  //rstart the game
  restartGame: function(){
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
