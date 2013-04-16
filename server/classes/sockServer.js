(function() {
  var _this = this,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  define(function() {
    var sockServer;
    return sockServer = (function() {

      function sockServer(settings) {
        this.settings = settings;
        _this.init = __bind(_this.init, this);
      }

      sockServer.prototype.init = function() {};

      return sockServer;

    })();
  });

}).call(this);
