(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };



  define(["/gamelabShared/core.js"], function(sharedGlabCore) {
    var glabClient;
    return glabClient = (function(_super) {
      __extends(glabClient, _super);

      function glabClient(settings) {
        var _this = this;
        this.settings = settings;
        this.init = __bind(this.init, this);
        this.changeScene = __bind(this.changeScene, this);
        this.sceneTemplate = {
          'name': 'template',
          'unload': function() {
            return false;
          }
        };
        this.currentScene = this.sceneTemplate;
        this.loadedScenes = {};
        glabClient.__super__.constructor.apply(this, arguments);
      }

      glabClient.prototype.changeScene = function(scene, metadata) {
        var _this = this;
        this.currentScene.unload();
        if (this.loadedScenes[scene] != null) {
          return this.currentScene = new this.loadedScenes[scene](this, metadata);
        } else {
          return require(['scenes/' + scene], function(sceneClass) {
            _this.loadedScenes[scene] = sceneClass;
            return _this.currentScene = new _this.loadedScenes[scene](_this, metadata);
          });
        }
      };

      glabClient.prototype.init = function(callback) {
        var modulesToLoad,
          _this = this;
        modulesToLoad = {
          'socket': '/gamelabClient/classes/socket.js',
          'input': '/gamelabClient/classes/input.js',
          'canvas': '/gamelabClient/classes/canvas.js'
        };
        return this.loadModules(modulesToLoad, function() {
          _this.socket = new _this.modules['Socket'](_this);
          _this.input = new _this.modules['Input'](_this);
          return callback();
        });
      };

      return glabClient;

    })(sharedGlabCore);
  });

}).call(this);
