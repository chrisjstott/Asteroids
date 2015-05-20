(function() {
  if (typeof Pinatas === "undefined") {
    window.Pinatas = {};
  }

  var Game = Pinatas.Game = function () {
    this.DIM_X = 1024;
    this.DIM_Y = 482;
    this.NUM_PINATAS = 5;
    this.player = new Pinatas.Player({ pos: [this.DIM_X/2, this.DIM_Y/2], vel: [0,0], game: this });
    this.pinatas = [];
    this.candies = [];
    this.pendingCandies = 0;
    this.addPinatas();
    this.addCandies(2);
    this.gameOver = false;
  };

  Game.prototype.addPinatas = function() {
    for (var i = 0; i < this.NUM_PINATAS; i++) {
      this.pinatas.push(new Pinatas.Pinata({ pos: this.randomPosition(), game: this }));
    }
  };
  
  Game.prototype.addCandies = function(n) {
    for(var i = 0; i < n; i++) {
      this.candies.push(new Pinatas.Candy({ pos: this.randomPosition(), game: this }));
    }
  };
  
  Game.prototype.increaseSpeed = function() {
    for (var i = 0; i < this.pinatas.length; i++) {
      this.pinatas[i].vel[0] *= 1.5;
      this.pinatas[i].vel[1] *= 1.5;
    }
  };
  
  Game.prototype.giveCandies = function() {
    var allCandies = this.candies.length + this.player.candies + this.pendingCandies;
    if (allCandies < 2) {
      this.pendingCandies = 2 - allCandies;
      var game = this;
      var addCandies = function () {
        game.addCandies(1);
        game.pendingCandies -= 1;
      };
      for (var q = 1; q <= this.pendingCandies; q++) {
        setTimeout(addCandies, 5000 * q);
      }
    }
  };

  Game.prototype.allObjects = function() {
    return this.candies.concat(this.pinatas).concat([this.player]);
  };

  Game.prototype.checkCollisions = function() {
    for (var i = 0; i < this.pinatas.length; i++) {
      if (this.player.isTouching(this.pinatas[i])) {
        this.player.collide(this.pinatas[i]);
      }
    }
    for (var j = 0; j < this.candies.length; j ++) {
      if (this.player.isTouching(this.candies[j])) {
        this.player.collect(this.candies[j]);
      }
    }
  };

  Game.prototype.draw = function(ctx) {
    ctx.clearRect(0, 0, this.DIM_X, this.DIM_Y);

    this.allObjects().forEach(function(object) {
      object.draw(ctx);
    });
  };

  Game.prototype.moveObjects = function() {
    this.allObjects().forEach(function(object) {
      object.move();
    });
  };

  Game.prototype.randomPosition = function() {
    var pinata = new Pinatas.Pinata({pos: 0});
    var wBuffer = (this.player.width + pinata.width) * 2;
    var randX = ((Math.random() * (this.DIM_X - wBuffer)) + (this.DIM_X + wBuffer)/2) % this.DIM_X;
    var randY = Math.random() * this.DIM_Y;
    return [randX, randY];
  };

  Game.prototype.removePinata = function(pinata) {
    var index = this.pinatas.indexOf(pinata);
    this.pinatas.splice(index, 1);
  };
  
  Game.prototype.removeCandy = function(candy) {
    var index = this.candies.indexOf(candy);
    this.candies.splice(index, 1);
  };

  Game.prototype.keepScore = function() {
    ctx.fillStyle = "black";
    ctx.font = "25pt Arial";
    ctx.fillText(this.player.lives + " lives " + this.player.candies + " candies", 5,28);
  };


  Game.prototype.step = function() {
    this.moveObjects();
    this.checkCollisions();
  };

})();
