(function() {
  if (typeof Pinatas === "undefined") {
    window.Pinatas = {};
  }

  var Pinata = Pinatas.Pinata = function(options) {

    Pinatas.MovingObject.call(this, options);
    this.vel = Pinatas.Util.randomVec(2);
    this.image = new Image();
    this.image.src = 'lib/Pinata.png';
    this.drawWidth = 51;
    this.drawHeight = 64;
    this.xOffset = 5;
    this.yOffset = -5;
    this.width = 43;
    this.height = 53;
    this.frame = 0;

    this.remove = function() {
      this.game.removePinata(this);
    };
    
  };

  Pinatas.Util.inherits(Pinata, Pinatas.MovingObject);

})();
