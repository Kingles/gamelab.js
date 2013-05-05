#!/usr/bin/node
// Init script for GameLib servers. Written by Seandon Mooy.
// in 'dev' mode, watches a directory and compiles coffeescript, then restarting the server core process
// in 'prod' mode, starts server core and TODO alarms an email / system if process dies.
(function() {
  var child_process, compiler, coreFile, environmentMode, fs, output, p, pRunning, restart, spawn, startDaemon, stopDaemon, system, watch;
  environmentMode = 'dev';
  fs = require('fs');
  system = require('sys');
  child_process = require('child_process');
  spawn = child_process.spawn;
  coreFile = 'core.js';
  directoryToWatch = '../.'
  output = function(msg) {
      if (msg.length > 0) {
        msg = msg.toString('utf8');
        if (msg.length > 0) return console.log(msg.replace("\n", ''));
      }
  };
  startDaemon = function() {
    p = spawn("node", [coreFile]);
    p.on('close', function(code, signal) {
      var processRunning;
      return processRunning = false;
    });
    p.stdout.on('data', function(something) {
      return output(something);
    });
    p.stderr.on('data', function(something) {
      return output(something);
    });
    return pRunning = true;
  };
  stopDaemon = function() {
      p.kill();
      pRunning = false;
  };
  restart = function() {
      stopDaemon();
      startDaemon();
  };
  if (environmentMode == 'prod') {
    startDaemon();
  } else {
    compiler = require('iced-coffee-script');
    watch = require('watch');
    p = false;
    pRunning = false;
    watch.watchTree(directoryToWatch, function(f, curr, prev) {
      var js, jsfile;
      if (typeof f === 'object' && prev === null && curr === null) {
        startDaemon();
      } else if (prev === null) {} else if (curr.nlink === 0) {} else {
        if (f.indexOf('node_modules') !== -1) {
          //console.log('node module changed, not restarting');
        } else if (f.indexOf('gamelabClient') !== -1){
          //console.log('in symlink');
        } else if (f.indexOf('gamelabShared') !== -1){
          //console.log('in symlink');
        } else {
          if (f.indexOf('.coffee') !== -1) {
            console.log('Changed:', f, 'compiling');
            try {
              coffeeCode = fs.readFileSync(f, 'ascii');
              js = compiler.compile(coffeeCode);
              jsfile = f.replace('.coffee', '.js');
              fs.unlink(jsfile, function() {
                fs.writeFile(jsfile, js, function() {
                  restart();
                });
              });
            } catch (e) {
              console.log('Compile error:', e);
            }
          }
        }
      }
    });
  }
}).call(this);