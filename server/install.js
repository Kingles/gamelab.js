(function() {
  var center, exec, fs, install_list, modules, npm_install, os, puts, puts_console, sys, util, we_done_now,
    _this = this;



  util = require('util');

  sys = require('sys');

  fs = require('fs');

  os = require('os');

  exec = require('child_process').exec;

  puts_console = function(error, stdout, stderr, callback) {
    sys.puts(stdout);
    return callback;
  };

  puts = function(obj) {
    return util.puts(obj);
  };

  if (os.platform() === "win32") {
    puts(" Hello there stranger, you seem to be using Windows to run this here highly optimized server platform. This is not reccomended or supported at this time!\nif you'd like to run GameLab, please visit VirtualBox.com, virtualize a Linux distribution, and install this package again! We'll be waiting patiently until you do :)");
  }

  center = function(string, delim, times) {
    var a, b, i;
    a = (function() {
      var _i, _ref, _results;
      _results = [];
      for (i = _i = 0, _ref = times / 2; 0 <= _ref ? _i <= _ref : _i >= _ref; i = 0 <= _ref ? ++_i : --_i) {
        _results.push(delim);
      }
      return _results;
    })();
    b = (function() {
      var _i, _ref, _results;
      _results = [];
      for (i = _i = 0, _ref = times / 2; 0 <= _ref ? _i <= _ref : _i >= _ref; i = 0 <= _ref ? ++_i : --_i) {
        _results.push(delim);
      }
      return _results;
    })();
    return puts(a.join("") + string + b.join(""));
  };

  npm_install = function(module, global, callback) {
    if (fs.exists("" + __dirname + "/node_modules")) {
      return puts("module " + module + " is already installed locally! Check the '" + __dirname + "/node_modules' folder if you have issues");
    } else if (fs.exists("" + process.cwd + "/node_modules")) {
      return puts("module " + module + " is already installed locally! Check the '" + process.cwd + "/node_modules' folder if you have issues");
    } else {
      switch (global) {
        case null:
          global = "";
          break;
        case true:
          global = "-g";
          break;
        case false:
          global = "";
          break;
        default:
          global = "";
      }
      center("Installing " + module, "!", 10);
      return exec("npm install " + module + " " + global, function(stdout, stderr, error) {
        sys.print(stdout);
        sys.print(stderr);
        if (error) {
          console.log(error);
        }
        return callback();
      });
    }
  };

  center("Installing NPM Modules!", "!", 10);

  modules = {
    "coffee-script": true,
    "iced-coffee-script": true,
    "requirejs": false,
    "socket.io": false,
    "watch": false
  };

  install_list = function(list, index) {
    if (index < Object.keys(list).length) {
      npm_install(Object.keys(list)[index], list[index], function() {
        return install_list(list, index + 1);
      });
    }
    if (index === Object.keys(list).length) {
      return we_done_now();
    }
  };

  we_done_now = function() {
    center("Done", "-", 10);
    return puts("README\n\nIf you have an 'EROFS' error on a writable fs,\nyou need to tell VirtualBox to allow Symlinks on shared directories.\nSee https://www.virtualbox.org/ticket/10085#comment:12 for details\n\nInstallation Complete! Have a great day and happy hacking! - Gamelab");
  };

  install_list(modules, 0);

}).call(this);
