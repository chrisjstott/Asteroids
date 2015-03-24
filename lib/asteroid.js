(function() {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Asteroid = Asteroids.Asteroid = function(options) {
    this.COLOR = 'brown';
    this.RADIUS = 20;

    Asteroids.MovingObject.call(this, options);
    this.color = this.COLOR;
    this.radius = this.RADIUS;
    this.vel = Asteroids.Util.randomVec(5);

  };

  Asteroids.Util.inherits(Asteroid, Asteroids.MovingObject);

})();
