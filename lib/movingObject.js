(function(){
  if (typeof Pinatas === "undefined") {
    window.Pinatas = {};
  }

  var MovingObject = Pinatas.MovingObject = function(options) {
    this.pos = options["pos"];
    this.vel = options["vel"];
    this.radius = options["radius"];
    this.color = options["color"];
    this.game = options["game"]
    this.pinata = new Image();
    this.pinata.src = 'lib/Pinata.png'
  };

  MovingObject.prototype.move = function() {
    var pos2 = [this.pos[0] + this.vel[0], this.pos[1] + this.vel[1]];
    this.pos = this.game.wrap(pos2);
  };

  MovingObject.prototype.isCollidedWith = function(otherObject) {
    var minDistance = this.radius + otherObject.radius;
    var xDistance = this.pos[0] - otherObject.pos[0];
    var yDistance = this.pos[1] - otherObject.pos[1];
    var distance = Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
    return distance <= minDistance;
  };

  MovingObject.prototype.collideWith = function(otherObject) {
    this.game.remove(otherObject);
    this.game.remove(this);
  };

})();
