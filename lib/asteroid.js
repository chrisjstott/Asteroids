(function() {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Asteroid = Asteroids.Asteroid = function(options) {
    this.COLOR = 'brown';
    this.RADIUS = 20;

    Asteroids.MovingObject.call(this, {
      color: this.COLOR,
      radius: this.RADIUS,
      pos: options["pos"],
      vel: Asteroids.Util.randomVec(5)
      });
  };

  Asteroids.Util.inherits(Asteroid, Asteroids.MovingObject);

})();
