(function() {
  var _this = this,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  define(function() {
    var www;
    return www = (function() {

      function www(settings) {
        var debug, fs, http, path,
          _this = this;
        this.settings = settings;
        _this.init = __bind(_this.init, this);
        fs = require('fs');
        http = require('http');
        path = require('path');
        debug = this.settings.debug;
        this.server = http.createServer(function(request, response) {
          var file, mime, parts;
          request.url = request.url.replace('..', '');
          if (request.url === '/') {
            file = _this.settings.docRoot + '/client/index.html';
          } else if (request.url.substr(0, 8) === '/shared/') {
            parts = request.url.split('/');
            parts.shift();
            parts.shift();
            file = _this.settings.docRoot + '/shared/' + parts.join('/');
          } else {
            file = _this.settings.docRoot + '/client/' + request.url;
            parts = file.split('?');
            if (parts.length > 1) file = parts[0];
          }
          switch (path.extname(file)) {
            case '.js':
              mime = 'text/javascript';
              break;
            case '.css':
              mime = 'text/css';
              break;
            case '.png':
              mime = 'image/png';
              break;
            case '.ico':
              mime = 'image/vnd.microsoft.icon';
              break;
            case '.swf':
              mime = 'application/x-shockwave-flash';
              break;
            case '.coffee':
              file = '404';
              break;
            default:
              mime = 'text/html';
          }
          return fs.exists(file, function(ok) {
            if (ok) {
              if (debug > 3) console.log('200 OK', file);
              return fs.readFile(file, function(error, data) {
                if (error) {
                  _this.e13.log('500: ', '"' + file + '"', error);
                  response.writeHead(500);
                  return response.end();
                } else {
                  response.writeHead(200, {
                    'Content-Type': mime
                  });
                  return response.end(data, 'utf-8');
                }
              });
            } else {
              if (debug > 1) console.log('404 Not Found', file);
              response.writeHead(404, {
                'Content-Type': 'text/html'
              });
              return response.end('404', 'utf-8');
            }
          });
        });
      }

      www.prototype.init = function() {
        return this.server.listen(this.settings.port);
      };

      return www;

    })();
  });

}).call(this);
