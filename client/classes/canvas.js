(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };



  define(function() {
    var Canvas;
    return Canvas = (function() {
      function Canvas(gameLab) {
        var windowSize;
        this.gameLab = gameLab;
        this.windowSize = __bind(this.windowSize, this);
        this.renderer = new THREE.WebGLRenderer(this.gameLab.settings.renderSettings);
        document.body.appendChild(this.renderer.domElement);
        windowSize = this.windowSize();
        this.renderer.setSize(windowSize.w, windowSize.h);
      }

      Canvas.prototype.windowSize = function() {
        this.h = window.innerHeight;
        this.w = window.innerWidth;
        return {
          h: this.h,
          w: this.w,
          a: this.w / this.h
        };
      };

      return Canvas;

    })();
  });

}).call(this);
