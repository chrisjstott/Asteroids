(function() {
  if (typeof Pinatas === "undefined") {
    window.Pinatas = {};
  }

  var Game = Pinatas.Game = function () {
    this.DIM_X = 800;
    this.DIM_Y = 482;
    this.player = new Pinatas.Player({ pos: [this.DIM_X/2, this.DIM_Y/2], vel: [0,0], game: this });
    this.pinatas = [];
    this.candies = [];
    this.pendingCandy = 0;
    this.gameOver = false;
  };
  
  Game.prototype.startLevel = function(level) {
    this.won = false;
    this.player.pos = [this.DIM_X/2, this.DIM_Y/2];
    this.player.vel = [0,0];
    this.addPinatas(level + 4);
    this.addCandies(level + 2);
  };

  Game.prototype.addPinatas = function(n) {
    for (var i = 0; i < n; i++) {
      this.pinatas.push(new Pinatas.Pinata({ pos: this.randomPosition(), game: this }));
    }
  };
  
  Game.prototype.addCandies = function(n) {
    for(var i = 0; i < n; i++) {
      this.candies.push(new Pinatas.Candy({ pos: this.randomPosition(), game: this }));
    }
  };
  
  Game.prototype.increaseSpeed = function(n) {
    for (var i = 0; i < this.pinatas.length; i++) {
      this.pinatas[i].vel[0] *= Math.pow(1.15, n);
      this.pinatas[i].vel[1] *= Math.pow(1.15, n);
    }
  };
  
  Game.prototype.giveCandies = function() {
    var allCandies = this.candies.length + this.player.candies + this.pendingCandy;
    if (allCandies === 0 && this.player.swinging === false) {
      this.pendingCandy = 1;
      var game = this;
      setTimeout(function () {
        game.addCandies(1);
        game.pendingCandy = 0;
      }, 5000);
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
    ctx.fillText(this.player.lives + " lives " + this.player.candies + " candies " + this.player.points + ' points', 5,28);
  };

  Game.prototype.checkStatus = function() {
    if (this.candies.length === 0 && this.pinatas.length === 0) {
      this.player.points += (this.player.candies * 10);
      this.player.candies = 0;
      this.won = true;
    }
  };

  Game.prototype.step = function() {
    this.moveObjects();
    this.checkCollisions();
    this.giveCandies();
    this.checkStatus();
  };

})();
