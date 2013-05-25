(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };



  define(function() {
    var Input;
    return Input = (function() {
      function Input(gameLab) {
        this.gameLab = gameLab;
        this.unload = __bind(this.unload, this);
        this.bindMouseWheel = __bind(this.bindMouseWheel, this);
        this.bindMouse = __bind(this.bindMouse, this);
        this.mouse = {
          x: 0,
          y: 0,
          l: false,
          r: false,
          scroll: 0,
          onGui: false
        };
        this.keyboard = KeyboardJS;
        this.bindMouse();
      }

      Input.prototype.bindMouse = function() {
        var _this = this;
        $(window).mousedown(function(e) {
          _this.mouse.x = e.clientX;
          _this.mouse.y = e.clientY;
          if (_this.mouse.onGui) {
            return false;
          } else {
            e.preventDefault();
          }
          switch (e.which) {
            case 1:
              _this.mouse.l = true;
              break;
            case 3:
              _this.mouse.r = true;
          }
          if (_this.mouseDownEvent != null) {
            return _this.mouseDownEvent();
          }
        });
        return $(window).mouseup(function(e) {
          if (e.which === 1) {
            _this.mouse.l = false;
          }
          if (e.which === 3) {
            _this.mouse.r = false;
          }
          if (_this.mouseUpEvent != null) {
            return _this.mouseUpEvent();
          }
        });
      };

      Input.prototype.bindMouseWheel = function() {
        var _this = this;
        return $(window).bind('mousewheel', function(e, delta, dX, dY) {
          if (delta > 0) {
            _this.mouse.scroll -= 1;
          } else {
            _this.mouse.scroll += 1;
          }
          if (_this.mouseScrollEvent != null) {
            return _this.mouseScrollEvent();
          }
        });
      };

      Input.prototype.unload = function(callback) {
        return callback();
      };

      return Input;

    })();
  });

}).call(this);
