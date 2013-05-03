(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(["/gamelabShared/core.js"], function(sharedGlabCore) {
    var glabClient;
    return glabClient = (function(_super) {

      __extends(glabClient, _super);

      function glabClient(settings) {
        this.settings = settings;
        this.init = __bind(this.init, this);
        glabClient.__super__.constructor.apply(this, arguments);
      }

      glabClient.prototype.init = function() {
        var modulesToLoad,
          _this = this;
        modulesToLoad = {
          'socket': '/gamelabClient/classes/socket.js'
        };
        return this.loadModules(modulesToLoad, function() {
          return _this.socket = new _this.modules['Socket'](_this);
        });
      };

      return glabClient;

    })(sharedGlabCore);
  });

}).call(this);
