(function() {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Asteroid = Asteroids.Asteroid = function(options) {
    this.COLOR = 'lightgray';
    this.RADIUS = 30;

    Asteroids.MovingObject.call(this, options);
    this.color = this.COLOR;
    this.radius = this.RADIUS;
    this.vel = Asteroids.Util.randomVec(2);
    // this.pinata = new Image();
    // this.pinata.src = 'lib/pinata.jpg'
  };

  Asteroid.prototype.draw = function(ctx) {
    // var pinata = new Image();
    // pinata.src = 'pinata.jpg'
    // pinata.onload = function() {
      // ctx.drawImage(pinata, this.pos[0], this.pos[1])
    // }
  };

  Asteroids.Util.inherits(Asteroid, Asteroids.MovingObject);

})();
