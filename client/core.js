(function() {
  var requireJS,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  requireJS = requirejs;

  $(document).ready(function() {
    var _this = this;
    return requireJS(["../shared/core.js"], function(sharedGlabCore) {
      var glabClient;
      return glabClient = (function(_super) {

        __extends(glabClient, _super);

        function glabClient() {
          console.log('sdfsd client core start');
          glabClient.__super__.constructor.apply(this, arguments);
        }

        return glabClient;

      })(sharedGlabCore);
    });
  });

}).call(this);
