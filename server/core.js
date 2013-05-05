(function() {
  var _this = this,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };



  define(["../shared/core.js"], function(sharedGlabCore) {
    var glabServer;
    return glabServer = (function(_super) {
      __extends(glabServer, _super);

      function glabServer(settings) {
        this.settings = settings;
        _this.init = __bind(_this.init, this);
        this.db = this.www = this.sockServer = {};
        glabServer.__super__.constructor.apply(this, arguments);
      }

      glabServer.prototype.init = function(callback) {
        var modulesToLoad,
          _this = this;
        modulesToLoad = {
          'www': this.settings.root + '/gamelab.js/server/classes/www.js',
          'db': this.settings.root + '/gamelab.js/server/classes/db.js',
          'sockServer': this.settings.root + '/gamelab.js/server/classes/sockServer.js',
          'gameServer': this.settings.root + '/gamelab.js/server/classes/gameServer.js'
        };
        return this.loadModules(modulesToLoad, function() {
          _this.db = new _this.modules['db'](_this.settings.db);
          _this.db.init(function() {});
          _this.sockServer = new _this.modules['sockServer'](_this, _this.settings.sockServer);
          _this.sockServer.init(function() {});
          _this.www = new _this.modules['www'](_this, _this.settings.www, _this.settings.clientSettings);
          _this.www.init(function() {});
          _this.gameServer = new _this.modules['gameServer'](_this, _this.settings.gameSettings);
          return _this.gameServer.init(function() {
            return callback();
          });
        });
      };

      return glabServer;

    })(sharedGlabCore);
    /*
    	server = new glabServer()
    	server.init()
    */

  });

}).call(this);
