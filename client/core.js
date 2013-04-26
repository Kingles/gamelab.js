(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(["/shared/core.js"], function(sharedGlabCore) {
    var glabClient;
    return glabClient = (function(_super) {

      __extends(glabClient, _super);

      function glabClient(settings) {
        this.settings = settings;
        this.init = __bind(this.init, this);
        glabClient.__super__.constructor.apply(this, arguments);
      }

      glabClient.prototype.init = function() {
        return console.log(this.settings);
      };

      return glabClient;

    })(sharedGlabCore);
  });

}).call(this);
