(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };



  define(function() {
    var Socket;
    return Socket = (function() {
      function Socket(gameLab) {
        var uri,
          _this = this;
        this.gameLab = gameLab;
        this.unload = __bind(this.unload, this);
        this.send = __bind(this.send, this);
        this.socketEnd = __bind(this.socketEnd, this);
        this.refresh = true;
        window.WEB_SOCKET_SWF_LOCATION = '/libs/WebSocketMain.swf';
        if (this.gameLab.settings.uri != null) {
          uri = 'ws://' + this.gameLab.settings.uri + ':' + this.gameLab.settings.game.port;
        } else {
          uri = 'ws://' + window.location.hostname + ':' + this.gameLab.settings.game.port;
        }
        if (this.gameLab.settings.debug > 2) {
          console.log('connecting to', uri);
        }
        this.socket = io.connect(uri);
        this.socket.on('connect', function() {
          _this.socket.on('message', function(message) {
            if (_this.gameLab.settings.debug > 2) {
              console.log('Getting ', message);
            }
            return _this.gameLab.findRoute(message);
          });
          return _this.socket.on('disconnect', function() {
            if (_this.refresh) {
              return _this.socketEnd();
            }
          });
        });
      }

      Socket.prototype.socketEnd = function() {
        var restart, timer,
          _this = this;
        if (this.gameLab.settings.debug > 2) {
          console.log('Server down');
        }
        timer = false;
        restart = function() {
          clearInterval(timer);
          return window.location = _this.gameLab.getURI();
        };
        return timer = setInterval(restart, 500);
      };

      Socket.prototype.send = function(line) {
        if (this.gameLab.settings.debug > 2) {
          console.log('Sending ', line);
        }
        return this.socket.send(line);
      };

      Socket.prototype.unload = function(callback) {
        return window.location = this.gameLab.getURI();
      };

      return Socket;

    })();
  });

}).call(this);
