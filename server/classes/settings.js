(function() {
  var _this = this;

  define(function() {
    var settings;
    return settings = (function() {

      function settings() {
        var clientSettings, debug;
        debug = 1;
        this.db = {
          'type': 'mongodb'
        };
        this.www = {
          'debug': debug,
          'port': 8080,
          'docRoot': '/home/eru/projects/gamelab.js/',
          'encoding': 'utf-8',
          'mimes': {
            '.js': 'text/javascript',
            '.css': 'text/css',
            '.png': 'image/png',
            '.ico': 'image/vnd.microsoft.icon',
            '.swf': 'application/x-shockwave-flash',
            '.html': 'text/html',
            '.htm': 'text/html'
          }
        };
        this.sockServer = {
          'port': 8081
        };
        clientSettings = {
          'debug': debug,
          'www': {
            'port': this.www.port
          },
          'game': {
            'port': this.sockServer.port
          }
        };
        this.clientSettings = JSON.stringify(clientSettings);
      }

      return settings;

    })();
  });

}).call(this);
