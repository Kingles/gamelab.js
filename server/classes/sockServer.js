(function() {
  var _this = this,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };



  define(function() {
    var sockServer;
    return sockServer = (function() {
      function sockServer(glabCore, settings) {
        this.glabCore = glabCore;
        this.settings = settings;
        _this.init = __bind(_this.init, this);
        _this.send = __bind(_this.send, this);
        _this.broadcast = __bind(_this.broadcast, this);
        _this.fileUpdate = __bind(_this.fileUpdate, this);
        _this.runRoute = __bind(_this.runRoute, this);
        _this.findRoute = __bind(_this.findRoute, this);
        _this.addRoute = __bind(_this.addRoute, this);
        this.socketio = require('socket.io');
        this.socket = {};
        this.connections = [];
      }

      sockServer.prototype.addRoute = function(route, callback) {
        return this.glabCore.addRoute(route, callback);
      };

      sockServer.prototype.findRoute = function(route, metadata) {
        return this.glabCore.findRoute(route, metadata);
      };

      sockServer.prototype.runRoute = function(route, metadata) {
        return this.glabCore.runRoute(route, metadata);
      };

      sockServer.prototype.fileUpdate = function(file) {
        return this.broadcast('/update/' + file);
      };

      sockServer.prototype.broadcast = function(msg) {
        var con, i, _ref, _results;
        _ref = this.connections;
        _results = [];
        for (i in _ref) {
          con = _ref[i];
          if ((con != null) && (con.send != null)) {
            _results.push(con.send(msg));
          } else {
            _results.push(void 0);
          }
        }
        return _results;
      };

      sockServer.prototype.send = function(connId, msg) {
        if (this.connections[connId] == null) {
          return false;
        }
        return this.connections[connId].send(msg);
      };

      sockServer.prototype.init = function(callback) {
        var _this = this;
        this.socket = this.socketio.listen(this.settings.port, {
          'log level': 1
        });
        this.socket.sockets.on('connection', function(sock) {
          _this.connections[sock.id] = sock;
          sock.on('message', function(data) {
            return _this.findRoute(data, sock.id);
          });
          return sock.on('disconnect', function() {
            return _this.connections[sock.id] = null;
          });
        });
        return callback();
      };

      return sockServer;

    })();
  });

}).call(this);
