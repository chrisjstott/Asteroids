(function(){
  if (typeof Pinatas === "undefined") {
    window.Pinatas = {};
  }

  var MovingObject = Pinatas.MovingObject = function(options) {
    this.pos = options["pos"];
    this.vel = options["vel"];
    this.game = options["game"]
  };

  MovingObject.prototype.move = function() {
    var pos2 = [this.pos[0] + this.vel[0], this.pos[1] + this.vel[1]];
    this.pos = this.wrap(pos2);
  };

  MovingObject.prototype.collide = function() {
    var object = this
    this.game.remove(object);
  };

  MovingObject.prototype.draw = function(ctx) {
    ctx.drawImage(this.image,
                  this.pos[0] - (this.drawWidth/2),
                  this.pos[1] - (this.drawHeight/2),
                  this.drawWidth,
                  this.drawHeight)
  };

  MovingObject.prototype.wrap = function(pos) {
    var x = pos[0];
    var y = pos[1];

    if (x > (this.game.DIM_X + this.drawWidth/2) || x < -(this.drawWidth/2)) {
      x = -(x - this.game.DIM_X);
    }
    if (y > (this.game.DIM_Y + this.drawHeight/2) || y < -(this.drawHeight/2)) {
      y = -(y - this.game.DIM_Y);
    }

    return [x, y];
  };


})();
