(function() {
  if (typeof Pinatas === "undefined") {
    window.Pinatas = {};
  }

  var Game = Pinatas.Game = function () {
    this.DIM_X = 1000;
    this.DIM_Y = 500;
    this.NUM_PINATAS = 5;
    // this.ship = new Pinatas.Ship({ pos: this.randomPosition(), game: this });
    this.pinatas = [];
    this.addPinatas();
  }

  Game.prototype.addPinatas = function() {
    for (var i = 0; i < this.NUM_PINATAS; i++) {
      this.pinatas.push(new Pinatas.Pinata({ pos: this.randomPosition(), game: this }));
    }
  };

  Game.prototype.allObjects = function() {
    return this.pinatas //.concat([this.ship]);
  }

  Game.prototype.checkCollisions = function() {
    for (var i = 0; i < this.allObjects().length; i++) {
      for (var j = i + 1; j < this.allObjects().length; j++) {
        if (this.allObjects()[i].isCollidedWith(this.allObjects()[j])) {
          this.allObjects()[i].collideWith(this.allObjects()[j]);
        }
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
    var randX = Math.random() * this.DIM_X;
    var randY = Math.random() * this.DIM_Y;
    return [randX, randY];
  };

  Game.prototype.remove = function(pinata) {
    var index = this.pinatas.indexOf(pinata);
    this.pinatas.splice(index, 1);
  };

  Game.prototype.step = function() {
    this.moveObjects();
    // this.checkCollisions();
  };

  Game.prototype.wrap = function(pos) {
    var x = pos[0];
    var y = pos[1];

    if (x > this.DIM_X + 30 || x < -30) {
      x = -(x - this.DIM_X);
    }
    if (y > this.DIM_Y + 43 || y < -43) {
      y = -(y - this.DIM_Y);
    }

    return [x, y];
  };

})();
