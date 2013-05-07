(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };



  define(function() {
    var sharedGlabCore;
    return sharedGlabCore = (function() {
      function sharedGlabCore() {
        this.runRoute = __bind(this.runRoute, this);
        this.findRoute = __bind(this.findRoute, this);
        this.addRoute = __bind(this.addRoute, this);
        this.loadModules = __bind(this.loadModules, this);
        this.log = __bind(this.log, this);
        this.modules = {};
        this.moduleFilesLoaded = {};
        this.events = {};
      }

      sharedGlabCore.prototype.log = function() {
        return Function.apply.call(console.log, console, arguments);
      };

      sharedGlabCore.prototype.loadModules = function(moduleList, callback) {
        var error, fileList, module, moduleName, modulePath, _i, _len,
          _this = this;
        fileList = [];
        for (moduleName in moduleList) {
          modulePath = moduleList[moduleName];
          fileList.push(modulePath);
        }
        try {
          if (fileList.length > 0) {
            for (_i = 0, _len = fileList.length; _i < _len; _i++) {
              module = fileList[_i];
              require.undef(module);
            }
            return require(fileList, function() {
              var klass, _j, _len1;
              for (_j = 0, _len1 = arguments.length; _j < _len1; _j++) {
                klass = arguments[_j];
                _this.modules[klass.name] = klass;
              }
              return callback();
            });
          } else {
            return callback();
          }
        } catch (_error) {
          error = _error;
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
        var error, json, parts, style;
        if (this.events[route] != null) {
          return this.runRoute(route, metadata);
        } else {
          style = route.substr(0, 1);
          if (style === '/') {
            parts = route.split('/');
            parts.shift();
            if (metadata == null) {
              metadata = {};
            }
            metadata.route = parts;
            return this.runRoute(parts.shift(), metadata);
          } else if (style === '{') {
            try {
              json = route;
              if (typeof route === "Object") {
                return json = route;
              } else {
                return json = JSON.parse(route);
              }
            } catch (_error) {
              error = _error;
              this.log('JSON parse error');
              throw error;
            } finally {
              for (route in json) {
                metadata = json[route];
                this.findRoute(route, metadata);
              }
            }
          } else {
            return this.log('Unknown route style', style);
          }
        }
      };

      sharedGlabCore.prototype.runRoute = function(route, metadata) {
        if (this.events[route] == null) {
          return false;
        }
        return this.events[route].callback(metadata);
      };

      return sharedGlabCore;

    })();
  });

}).call(this);
