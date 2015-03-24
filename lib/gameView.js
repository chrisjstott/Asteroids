(function() {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var GameView = Asteroids.GameView = function (game, ctx) {
    this.game = game;
    this.drawing = ctx;
  };

  GameView.prototype.start = function() {
    var that = this;
    setInterval(function() {
      that.game.draw(that.drawing);
      that.game.step();
    }, 20);
  };

})();
