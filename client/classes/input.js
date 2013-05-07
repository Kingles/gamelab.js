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
          console.log(_this.mouse.x, _this.mouse.y);
          if (_this.mouse.onGui) {
            return false;
          } else {
            e.preventDefault();
          }
          switch (e.which) {
            case 1:
              return _this.mouse.l = true;
            case 3:
              return _this.mouse.r = true;
          }
        });
        return $(window).mouseup(function(e) {
          if (e.which === 1) {
            _this.mouse.l = false;
          }
          if (e.which === 3) {
            return _this.mouse.r = false;
          }
        });
      };

      Input.prototype.bindMouseWheel = function() {
        var _this = this;
        return $(window).bind('mousewheel', function(e, delta, dX, dY) {
          if (delta < 0) {
            if (!(_this.mouse.scroll < 1)) {
              return _this.mouse.scroll -= 1;
            }
          } else {
            if (!(_this.mouse.scroll >= 8)) {
              return _this.mouse.scroll += 1;
            }
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
