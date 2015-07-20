(function() {
  if (typeof Pinatas === "undefined") {
    window.Pinatas = {};
  }

  var Player = Pinatas.Player = function(options) {

    Pinatas.MovingObject.call(this, options);
    this.image = new Image();
    this.image.src = 'lib/spin.png';
    this.drawWidth = 100;
    this.drawHeight = 100;
    this.xOffset = 0;
    this.yOffset = 0;
    this.width = 14;
    this.height = 70;
    this.candies = 0;
    this.lives = 5;
    this.frame = 0;
    this.maxSpeed = 4;
    this.points = 0;
    this.swinging = false;

    this.power = function(impulse) {
       switch(impulse) {
        case 'up':
          if (this.vel[1] > -(this.maxSpeed) && this.vel[1] <= 0) {
            this.vel[1] += -(this.maxSpeed/4.0);
          } else if (this.vel[1] > 0) {
            this.vel[1] += -(this.maxSpeed/2);
          }
          break;
        case 'down':
          if (this.vel[1] < this.maxSpeed && this.vel[1] >= 0) {
            this.vel[1] += (this.maxSpeed/4.0);
          } else if (this.vel[1] < 0) {
            this.vel[1] += (this.maxSpeed/2);
          }
          break;
        case 'left':
          if (this.vel[0] > -this.maxSpeed && this.vel[0] <= 0) {
            this.vel[0] += -(this.maxSpeed/4.0);
          } else if (this.vel[0] > 0) {
            this.vel[0] += -(this.maxSpeed/2);
          }
          break;
        case 'right':
          if (this.vel[0] < this.maxSpeed && this.vel[0] >= 0) {
            this.vel[0] += (this.maxSpeed/4.0);
          } else if (this.vel[0] < 0) {
            this.vel[0] += (this.maxSpeed/2);
          }
          break;
      }
    };

    this.swing = function() {
      if (this.candies >= 1) {
        this.spin();
        this.swinging = true;
        this.width = 60;
        this.candies -= 1;
        var player = this;
        setTimeout(function() {
          player.swinging = false;
          player.width = 14;
        }, 401);
      }
    };
    
    this.spin = function() {
      var player = this;
      player.frame = 9;
      var increaseFrame = function() {
        player.frame = (player.frame + 1) % 8;
      };
      for (var i = 0; i < 16; i++){
        setTimeout(increaseFrame, (25 * i));
      }
      setTimeout(function() {
        player.frame = 0;
      }, 401);
    };
    
    this.blink = function() {
      var player = this;
      var j = 0;
      var setFrame = function() {
        if (player.frame === 9) {
          player.frame = 0;
        } else if (player.frame === 0) {
          player.frame = 9;
        }
      };
      
      for (var i = 0; i < 16; i++){
        setTimeout(setFrame, (200 * i));
      }
      
      setTimeout(function() {
        player.frame = 0;
      }, 3201);

    };

    this.collide = function(pinata) {
      if (this.swinging) {
        pinata.remove();
        this.game.addCandies(5);
        this.points += 10;
        // this.maxSpeed += 2;
        // this.game.increaseSpeed();
      } else if (!this.invincible) {
        this.die();
        this.points -= 10;
      }
    };
    
    this.collect = function(candy) {
      this.candies += 1;
      this.points += 5;
      candy.remove();
    };

    this.die = function() {
      this.pos = [this.game.DIM_X/2, this.game.DIM_Y/2];
      this.vel = [0,0];
      this.makeInvincible();
      this.lives--;
      if (this.candies > 0) {
        this.candies--;
      }
      if (this.lives <= 0) {
        this.game.gameOver = true;
      }
    };

    this.makeInvincible = function() {
      this.invincible = true;
      this.blink();
      var player = this;
      setTimeout(function() { player.invincible = false; }, 3000 );
    };

  };


  Pinatas.Util.inherits(Player, Pinatas.MovingObject);

})();
