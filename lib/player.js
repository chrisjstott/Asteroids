(function() {
  if (typeof Pinatas === "undefined") {
    window.Pinatas = {};
  }

  var Player = Pinatas.Player = function(options) {

    Pinatas.MovingObject.call(this, options);
    this.image = new Image();
    this.image.src = 'lib/young_warrior.png';
    this.drawWidth = 80;
    this.drawHeight = 140;
    this.xOffset = 14;
    this.yOffset = -13;
    this.width = 40;
    this.height = 110;
    this.candies = 20;
    this.lives = 5;

    this.power = function(impulse) {
       switch(impulse) {
        case 'up':
          if (this.vel[1] > -8 && this.vel[1] <= 0) {
            this.vel[1] += -2
          } else if (this.vel[1] > 0) {
            this.vel[1] += -4
          }
          break;
        case 'down':
          if (this.vel[1] < 8 && this.vel[1] >= 0) {
            this.vel[1] += 2
          } else if (this.vel[1] < 0) {
            this.vel[1] += 4
          }
          break;
        case 'left':
          if (this.vel[0] > -8 && this.vel[0] <= 0) {
            this.vel[0] += -2
          } else if (this.vel[0] > 0) {
            this.vel[0] += -4
          }
          break;
        case 'right':
          if (this.vel[0] < 8 && this.vel[0] >= 0) {
            this.vel[0] += 2
          } else if (this.vel[0] < 0) {
            this.vel[0] += 4
          }
          break;
      }
    };

    this.swing = function() {
      if (this.candies >= 2) {
        // this.spin();
        this.swinging = true;
        var player = this;
        setTimeout(function() { player.swinging = false; }, 1000);
        this.candies -= 2;
      }
    };

    this.collide = function(pinata) {
      if (this.swinging) {
        pinata.smash();
      } else if (!this.invincible) {
        this.die();
      }
    };

    this.die = function() {
      this.pos = [this.game.DIM_X/2, this.game.DIM_Y/2];
      this.vel = [0,0];
      this.makeInvincible();
      this.lives--;
      if (this.lives <= 0) {
        this.game.gameOver = true;
      }
    }

    this.makeInvincible = function() {
      this.invincible = true;
      // this.blink();
      var player = this;
      setTimeout(function() { player.invincible = false; }, 3000 );
    }

  };


  Pinatas.Util.inherits(Player, Pinatas.MovingObject);

})();
