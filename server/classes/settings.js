(function() {
  var _this = this;

  define(function() {
    var settings;
    return settings = (function() {

      function settings() {
        var debug;
        debug = 1;
        this.db = {
          'type': 'mongodb'
        };
        this.www = {
          'debug': debug,
          'port': 8080,
          'docRoot': '../client/'
        };
        this.sockServer = {
          'port': 8081
        };
      }

      return settings;

    })();
  });

}).call(this);
