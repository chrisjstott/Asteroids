(function() {
  if (typeof Pinatas === "undefined") {
    window.Pinatas = {};
  }

  var Util = Pinatas.Util = function () {};

  Util.inherits = function(ChildClass, ParentClass) {
    function Surrogate() {}
    Surrogate.prototype = ParentClass.prototype;
    ChildClass.prototype = new Surrogate();
  };

  Util.randomVec = function (length) {
    var posOrNeg = function(n) {
      return (Math.floor(Math.random() * 2) * 2 - 1) * n;
    };
    
    var min = 0.5;
    var max = Math.sqrt(3.75);
    
    var x = posOrNeg(Math.random() * (max - min) + min);
    var y = posOrNeg(Math.sqrt(length * length - x * x));

    return [x, y];
  };
  
  Util.centerText = function(text, height, ctx) {
    return ctx.fillText(text, (800 - ctx.measureText(text).width) / 2, height);
  };
  
})();
