(function() {
  var _this = this,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  define(function() {
    var gameServer;
    return gameServer = (function() {

      function gameServer(glabCore, settings) {
        this.glabCore = glabCore;
        this.settings = settings;
        _this.init = __bind(_this.init, this);
      }

      gameServer.prototype.init = function(callback) {
        return callback();
      };

      return gameServer;

    })();
  });

}).call(this);
