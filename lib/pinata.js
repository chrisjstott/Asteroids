(function() {
  if (typeof Pinatas === "undefined") {
    window.Pinatas = {};
  }

  var Pinata = Pinatas.Pinata = function(options) {
    this.COLOR = 'lightgray';
    this.RADIUS = 30;

    Pinatas.MovingObject.call(this, options);
    this.color = this.COLOR;
    this.radius = this.RADIUS;
    this.vel = Pinatas.Util.randomVec(2);
    this.pinata = new Image();
    this.pinata.src = 'lib/Pinata.png';

    this.draw = function(ctx) {
      ctx.drawImage(this.pinata, this.pos[0] - 30, this.pos[1] - 43, 70, 86)
    };
  };

  Pinatas.Util.inherits(Pinata, Pinatas.MovingObject);

})();
