(function() {
  if (typeof Pinatas === "undefined") {
    window.Pinatas = {};
  }

  var Candy = Pinatas.Candy = function(options) {

    Pinatas.MovingObject.call(this, options);
    this.vel = [0,0];
    this.image = new Image();
    this.image.src = 'lib/candy.png';
    this.drawWidth = 30;
    this.drawHeight = 30;
    this.xOffset = 5;
    this.yOffset = 0;
    this.width = 45;
    this.height = 45;
    this.frame = 0;

    this.remove = function() {
      this.game.removeCandy(this);
    };
    
  };

  Pinatas.Util.inherits(Candy, Pinatas.MovingObject);

})();
