var center, exec, fs, install_list, modules, npm_install, puts, puts_console, sys, util;

util = require('util');

sys = require('sys');

exec = require('child_process').exec;

fs = require('fs');

puts_console = function(error, stdout, stderr, callback) {
  sys.puts(stdout);
  if (callback) {
  	callback();
  }
};

puts = function(obj) {
  return util.puts(obj);
};

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
    if (global === null) {
      global = "";
    }
    else if (global === true) {
    	global = "-g";
    }
    else if (global === false) {
    	global = "";
    }
    else {
    	global = "";
    }
    center("Installing " + module, "!", 10);
    puts("npm install " + module + " "+ callback)
    exec("npm install " + module, callback());
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
  if (index <= Object.keys(list).length) {
    npm_install(Object.keys(list)[index], list[index], install_list(list, index + 1));
  }
};

install_list(modules, 0);

center("Done", "-", 10);

puts("README\n\nIf you have an 'EROFS' error on a writable fs,\nyou need to tell VirtualBox to allow Symlinks on shared directories.\nSee https://www.virtualbox.org/ticket/10085#comment:12 for details\n\nInstallation Complete! Have a great day and happy hacking! - Gamelab");
