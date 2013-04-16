(function() {
  var requireJS,
    _this = this,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  requireJS = require('requirejs');

  requireJS(["../shared/core.js"], function(sharedGlabCore) {
    var glabServer, server;
    glabServer = (function(_super) {

      __extends(glabServer, _super);

      function glabServer() {
        _this.init = __bind(_this.init, this);        this.db = this.www = this.sockServer = {};
        glabServer.__super__.constructor.apply(this, arguments);
      }

      glabServer.prototype.init = function() {
        var modulesToLoad,
          _this = this;
        modulesToLoad = {
          'settings': 'classes/settings.js',
          'www': 'classes/www.js',
          'db': 'classes/db.js',
          'sockServer': 'classes/sockServer.js'
        };
        return this.loadModules(modulesToLoad, function() {
          _this.settings = new _this.modules['settings'];
          if (_this.settings.db != null) {
            _this.db = new _this.modules['db'](_this.settings.db);
            _this.db.init();
          }
          if (_this.settings.www != null) {
            _this.www = new _this.modules['www'](_this.settings.www);
            _this.www.init();
          }
          if (_this.settings.sockServer != null) {
            _this.sockServer = new _this.modules['sockServer'](_this.settings.sockServer);
            return _this.sockServer.init();
          }
        });
      };

      return glabServer;

    })(sharedGlabCore);
    server = new glabServer();
    return server.init();
  });

}).call(this);
