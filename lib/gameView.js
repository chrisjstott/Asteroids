(function() {
  if (typeof Pinatas === "undefined") {
    window.Pinatas = {};
  }

  var GameView = Pinatas.GameView = function (game, ctx) {
    this.game = game;
    this.drawing = ctx;
    this.background = new Image();
    this.background.src = 'lib/BigTree.jpg';
  };

  GameView.prototype.start = function() {
    var gameView = this;
    this.bindKeyHandlers();
      setInterval(function() {
        gameView.game.draw(gameView.drawing);
        gameView.game.step();
        gameView.game.keepScore();
      }, 20);
  };

  GameView.prototype.bindKeyHandlers = function() {
    var player = this.game.player
    key('up', function() { player.power('up') });
    key('down', function() { player.power('down') });
    key('left', function() { player.power('left') });
    key('right', function() { player.power('right') });
    key('space', function() { player.swing() });
  };

})();
