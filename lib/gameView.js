(function() {
  if (typeof Pinatas === "undefined") {
    window.Pinatas = {};
  }

  var GameView = Pinatas.GameView = function (ctx) {
    this.ctx = ctx;
    this.level = 1;
    this.game = new Pinatas.Game();
  };
  
  GameView.prototype.menu = function() {
    this.bindKeyHandlers('menu');
    var image = new Image();
    image.onload = (function() {
      this.ctx.drawImage(
        image,
        175,
        100
      );
    }).bind(this);
    image.src = 'lib/Title.png';
    this.ctx.fillStyle = "Black";
    this.ctx.font = "20pt Tahoma";
    Pinatas.Util.centerText("Press Space to Start", 350, this.ctx);
    this.ctx.font = "14pt Tahoma";
    Pinatas.Util.centerText("Arrow keys to move, space to swing", 390, this.ctx);
    Pinatas.Util.centerText("You need at least 1 candy to swing", 415, this.ctx);
  };
  
  
  GameView.prototype.start = function(level) {
    this.bindKeyHandlers('play');
    this.game.startLevel(1);
    setInterval((function() {
      if (this.game.gameOver === false) {
        this.game.draw(this.ctx);
        this.game.step();
        this.game.keepScore();
        if (this.game.won === true) {
          this.level += 1;
          this.game.won = false;
          this.game.startLevel(this.level);
        }
      } else {
        ctx.clearRect(0, 0, this.game.DIM_X, this.game.DIM_Y);
        this.gameOver(this.game.player.points);
      }
    }).bind(this), 20);
    
  };
  
  GameView.prototype.gameOver = function(finalScore) {
    this.bindKeyHandlers('menu');
    this.ctx.fillStyle = "Black";
    this.ctx.font = "40pt Tahoma";
    Pinatas.Util.centerText("Game Over", 200, this.ctx);
    this.ctx.font = "20pt Tahoma";
    Pinatas.Util.centerText("Final Score: " + finalScore, 300, this.ctx);
    Pinatas.Util.centerText("Press space to restart", 330, this.ctx);
  };

  GameView.prototype.bindKeyHandlers = function(gameState) {
    if (gameState === "play") {
      var player = this.game.player;
      key.unbind('space');
      key('up', function() { player.power('up') });
      key('down', function() { player.power('down') });
      key('left', function() { player.power('left') });
      key('right', function() { player.power('right') });
      key('space', function() { player.swing() });
    } else if (gameState === 'menu') {
      key.unbind('space');
      key('space', function() { this.start(1) }.bind(this));
    }
  };

})();
