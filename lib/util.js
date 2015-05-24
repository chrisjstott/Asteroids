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
    var x = (Math.random() * 2 * length) - length;
    var rand = Math.floor(Math.random() * 2) * 2 - 1;
    var y = Math.sqrt(length * length - x * x) * rand;

    return [x, y];
  };
  
})();
