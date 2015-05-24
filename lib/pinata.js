(function() {
  if (typeof Pinatas === "undefined") {
    window.Pinatas = {};
  }

  var Pinata = Pinatas.Pinata = function(options) {

    Pinatas.MovingObject.call(this, options);
    this.vel = Pinatas.Util.randomVec(2);
    this.image = new Image();
    this.image.src = 'lib/Pinata.png';
    this.drawWidth = 76;
    this.drawHeight = 96;
    this.xOffset = this.yOffset = 0;
    this.width = this.drawWidth;
    this.height = this.drawHeight;
    this.frame = 0;

    this.remove = function() {
      this.game.removePinata(this);
    };
    
  };

  Pinatas.Util.inherits(Pinata, Pinatas.MovingObject);

})();
