(function() {
  var _this = this,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  define(function() {
    var db;
    return db = (function() {

      function db(settings) {
        this.settings = settings;
        _this.init = __bind(_this.init, this);
      }

      db.prototype.init = function() {};

      return db;

    })();
  });

}).call(this);
