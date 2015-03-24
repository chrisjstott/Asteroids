(function() {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Game = Asteroids.Game = function () {
    this.DIM_X = 500;
    this.DIM_Y = 500;
    this.NUM_ASTEROIDS = 20;
    this.asteroids = [];
    this.addAsteroids();
  }

  Game.prototype.addAsteroids = function() {
    for (var i = 0; i < this.NUM_ASTEROIDS; i++) {
      this.asteroids.push(new Asteroids.Asteroid({ pos: this.randomPosition(), game: this }));
    }
  };

  Game.prototype.randomPosition = function() {
    var randX = Math.random() * this.DIM_X;
    var randY = Math.random() * this.DIM_Y;
    return [randX, randY];
  };

  Game.prototype.draw = function(ctx) {
    ctx.clearRect(0, 0, this.DIM_X, this.DIM_Y);

    this.asteroids.forEach(function(asteroid) {
      asteroid.draw(ctx);
    });
  };

  Game.prototype.moveObjects = function() {
    this.asteroids.forEach(function(asteroid) {
      asteroid.move();
    });
  };

  Game.prototype.wrap = function(pos) {
    var x = pos[0];
    var y = pos[1];

    if (x > this.DIM_X || x < 0) {
      x = this.DIM_X - Math.abs(x);
    }
    if (y > this.DIM_Y || y < 0) {
      y = this.DIM_Y - Math.abs(y);
    }

    return [x, y];
  };

  Game.prototype.checkCollisions = function() {
    for (var i = 0; i < this.asteroids.length; i++) {
      for (var j = i + 1; j < this.asteroids.length; j++) {
        if (this.asteroids[i].isCollidedWith(this.asteroids[j])) {
          this.asteroids[i].collideWith(this.asteroids[j]);
        }
      }
    }
  };

  Game.prototype.step = function() {
    this.moveObjects();
    this.checkCollisions();
  };

  Game.prototype.remove = function(asteroid) {
    var index = this.asteroids.indexOf(asteroid);
    this.asteroids.splice(index, 1);
  };

})();
