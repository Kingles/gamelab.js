(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  define(function() {
    var Socket;
    return Socket = (function() {

      function Socket(gameLab) {
        var uri,
          _this = this;
        this.gameLab = gameLab;
        this.send = __bind(this.send, this);
        this.socketEnd = __bind(this.socketEnd, this);
        window.WEB_SOCKET_SWF_LOCATION = '/libs/WebSocketMain.swf';
        if (this.gameLab.settings.uri != null) {
          uri = 'ws://' + this.gameLab.settings.uri + ':' + this.gameLab.settings.game.port;
        } else {
          uri = 'ws://' + window.location.hostname + ':' + this.gameLab.settings.game.port;
        }
        if (this.gameLab.settings.debug > 2) console.log('connecting to', uri);
        this.socket = io.connect(uri);
        this.socket.on('connect', function() {
          _this.socket.on('message', function(message) {
            return _this.gameLab.findRoute(message);
          });
          return _this.socket.on('disconnect', function() {
            return _this.socketEnd();
          });
        });
      }

      Socket.prototype.socketEnd = function() {
        var restart, timer, uri,
          _this = this;
        if (this.gameLab.settings.debug > 1) {
          console.log('Server down - restarting');
        }
        if (this.gameLab.settings.uri != null) {
          uri = 'http://' + this.gameLab.settings.uri + ':' + this.gameLab.settings.www.port;
        } else {
          uri = 'http://' + window.location.hostname + ':' + this.gameLab.settings.www.port;
        }
        timer = false;
        restart = function() {
          clearInterval(timer);
          return window.location = uri;
        };
        return timer = setInterval(restart, 1000);
      };

      Socket.prototype.send = function(line) {
        if (this.gameLab.settings.debug > 2) console.log('Sending ', line);
        return this.socket.send(line);
      };

      return Socket;

    })();
  });

}).call(this);
