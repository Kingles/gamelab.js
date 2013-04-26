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
          fileList.push(modulePath);
        }
        try {
          return require(fileList, function() {
            var klass, _i, _len;
            for (_i = 0, _len = arguments.length; _i < _len; _i++) {
              klass = arguments[_i];
              _this.modules[klass.name] = klass;
            }
            return callback();
          });
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
        var json, parts, style;
        if (this.events[route] != null) {
          return this.runRoute(route, metadata);
        } else {
          style = route.substr(0, 1);
          if (style === '/') {
            parts = route.split('/');
            parts.shift();
            if (metadata == null) metadata = {};
            metadata.route = parts;
            return this.runRoute(parts.shift(), metadata);
          } else if (style === '{') {
            try {
              if (typeof route === "Object") {
                return json = route;
              } else {
                return json = JSON.parse(route);
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
            return this.log('Unknown route style', style);
          }
        }
      };

      return sharedGlabCore;

    })();
  });

}).call(this);
