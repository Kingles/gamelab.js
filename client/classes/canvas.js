(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };



  define(function() {
    var Canvas;
    return Canvas = (function() {
      function Canvas(scene, settings) {
        this.scene = scene;
        this.settings = settings;
        this.tick = __bind(this.tick, this);
        this.unload = __bind(this.unload, this);
        this.render = __bind(this.render, this);
        this.initRender = __bind(this.initRender, this);
        this.boilerplate = __bind(this.boilerplate, this);
      }

      Canvas.prototype.boilerplate = function() {
        var SCREEN_HEIGHT, SCREEN_WIDTH,
          _this = this;
        SCREEN_WIDTH = window.innerWidth;
        SCREEN_HEIGHT = window.innerHeight;
        this.scene.scene = new THREE.Scene();
        this.scene.camera = new THREE.PerspectiveCamera(45, SCREEN_WIDTH / SCREEN_HEIGHT, 1, 10000);
        this.scene.camera.position.z = 300;
        this.scene.scene.add(this.scene.camera);
        this.scene.renderer = new THREE.WebGLRenderer({
          antialias: true
        });
        this.scene.renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
        this.scene.renderer.domElement.style.position = "relative";
        this.scene.renderer.autoClear = false;
        $('body').append(this.scene.renderer.domElement);
        this.scene.renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
        $(window).resize(function() {
          SCREEN_WIDTH = window.innerWidth;
          SCREEN_HEIGHT = window.innerHeight;
          return _this.scene.renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
        });
        return this;
      };

      Canvas.prototype.initRender = function() {
        var interval;
        this.clock = new Date;
        this.fpsFilter = 4;
        this.frames = 0;
        this.render();
        if (this.scene.tickCalls != null) {
          interval = 30;
          return setInterval(this.tick, 1000 / interval);
        }
      };

      Canvas.prototype.render = function() {
        var thisLoop, thisTime;
        thisLoop = (thisTime = new Date) - this.clock;
        this.frames += (thisLoop - this.frames) / this.fpsFilter;
        this.clock = thisTime;
        if (this.scene.scene && this.scene.camera) {
          if (!this.scene.paused) {
            this.scene.renderer.render(this.scene.scene, this.scene.camera);
          }
        }
        return window.requestAnimationFrame(this.render);
      };

      Canvas.prototype.unload = function() {
        $(window).unbind('resize');
        return $('body').html('');
      };

      Canvas.prototype.tick = function() {
        var tock, _i, _len, _ref, _results;
        _ref = this.scene.tickCalls;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          tock = _ref[_i];
          _results.push(tock());
        }
        return _results;
      };

      return Canvas;

    })();
  });

}).call(this);
