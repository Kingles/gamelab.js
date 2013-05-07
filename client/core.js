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
        this.bindFileUpdates = __bind(this.bindFileUpdates, this);
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

      glabClient.prototype.bindFileUpdates = function() {
        var _this = this;
        return this.addRoute('/update/', function(metadata) {
          var file, module, path, uri;
          path = metadata.route.pop();
          file = path.replace('.coffee', '');
          module = file.charAt(0).toUpperCase() + file.slice(1);
          if ((_this.modules[module] != null) && (_this.moduleList[module] != null) && (_this[file] != null)) {
            if (_this[file].unload != null) {
              _this[file].unload(function() {
                var newModuleList;
                newModuleList = {};
                newModuleList[module] = _this.moduleList[module];
                _this[file] = null;
                delete _this[file];
                return _this.loadModules(newModuleList, function() {
                  console.log('module', module, 'reloaded');
                  return _this[file] = new _this.modules[module](_this);
                });
              });
              return false;
            }
          }
          if (_this.settings.uri != null) {
            uri = 'http://' + _this.settings.uri + ':' + _this.settings.www.port;
          } else {
            uri = 'http://' + window.location.hostname + ':' + _this.settings.www.port;
          }
          return window.location = uri;
        });
      };

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
        var _this = this;
        this.bindFileUpdates();
        this.moduleList = {
          'Socket': '/gamelabClient/classes/socket.js',
          'Input': '/gamelabClient/classes/input.js',
          'Canvas': '/gamelabClient/classes/canvas.js'
        };
        return this.loadModules(this.moduleList, function() {
          _this.socket = new _this.modules['Socket'](_this);
          _this.input = new _this.modules['Input'](_this);
          return callback();
        });
      };

      return glabClient;

    })(sharedGlabCore);
  });

}).call(this);
