(function() {
  if (typeof Pinatas === "undefined") {
    window.Pinatas = {};
  }

  var GameView = Pinatas.GameView = function (game, ctx) {
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
