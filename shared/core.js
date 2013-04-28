(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  define(function() {
    var sharedGlabCore;
    return sharedGlabCore = (function() {

      function sharedGlabCore() {
        this.findRoute = __bind(this.findRoute, this);
        this.addRoute = __bind(this.addRoute, this);
        this.loadModules = __bind(this.loadModules, this);
        this.log = __bind(this.log, this);        this.modules = {};
        this.moduleFilesLoaded = {};
        this.events = {};
      }

      sharedGlabCore.prototype.log = function() {
        return Function.apply.call(console.log, console, arguments);
      };

      sharedGlabCore.prototype.loadModules = function(moduleList, callback) {
        var fileList, moduleName, modulePath,
          _this = this;
        fileList = [];
        for (moduleName in moduleList) {
          modulePath = moduleList[moduleName];
          if (this.moduleFilesLoaded[modulePath] == null) {
            this.moduleFilesLoaded[modulePath] = true;
            fileList.push(modulePath);
          }
        }
        try {
          if (fileList.length > 0) {
            return require(fileList, function() {
              var klass, _i, _len;
              for (_i = 0, _len = arguments.length; _i < _len; _i++) {
                klass = arguments[_i];
                _this.modules[klass.name] = klass;
              }
              return callback();
            });
          } else {
            return callback();
          }
        } catch (error) {
          this.log("loadModules error");
          throw error;
        }
      };

      sharedGlabCore.prototype.addRoute = function(route, callback) {
        var eventName, parts;
        if (route.substr(0, 1) === '/') {
          parts = route.split('/');
          parts.shift();
          eventName = parts.shift();
          if (parts.length > 0) {
            return this.events[eventName] = {
              map: parts,
              callback: callback
            };
          } else {
            return this.events[eventName] = {
              callback: callback
            };
          }
        } else {
          return this.events[route] = {
            callback: callback
          };
        }
      };

      sharedGlabCore.prototype.findRoute = function(route, metadata) {
        var json, parts, style,
          _this = this;
        if (this.events[route] != null) {
          this.runRoute(route, metadata);
        } else {
          style = route.substr(0, 1);
          if (style === '/') {
            parts = route.split('/');
            parts.shift();
            if (metadata == null) metadata = {};
            metadata.route = parts;
            this.runRoute(parts.shift(), metadata);
          } else if (style === '{') {
            try {
              json = route;
              if (typeof route === "Object") {
                json = route;
              } else {
                json = JSON.parse(route);
              }
            } catch (error) {
              this.log('JSON parse error');
              throw error;
            } finally {
              for (route in json) {
                metadata = json[route];
                this.findRoute(route, metadata);
              }
            }
          } else {
            this.log('Unknown route style', style);
          }
        }
        return {
          runRoute: function(route, metadata) {
            if (_this.events[route] == null) return false;
            return _this.events[route].callback(metadata);
          }
        };
      };

      return sharedGlabCore;

    })();
  });

}).call(this);
