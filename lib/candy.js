(function() {
  if (typeof Pinatas === "undefined") {
    window.Pinatas = {};
  }

  var Candy = Pinatas.Candy = function(options) {

    Pinatas.MovingObject.call(this, options);
    this.vel = [0,0];
    this.image = new Image();
    this.image.src = 'lib/candy.png';
    this.drawWidth = 60;
    this.drawHeight = 60;
    this.xOffset = this.yOffset = 0;
    this.width = 70;
    this.height = 70;
    this.frame = 0;

    this.remove = function() {
      this.game.removeCandy(this);
    };
    
  };

  Pinatas.Util.inherits(Candy, Pinatas.MovingObject);

})();
