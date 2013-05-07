#!/usr/bin/node
// Init.js v2
// Init script for GameLib servers. Written by Seandon Mooy.
// in 'dev' mode, watches a directory and compiles coffeescript, then restarting the server core process
// in 'prod' mode, starts server core and TODO alarms an email / system if process dies.
(function() {
  var environmentMode = 'dev';
  var fs = require('fs');
  var system = require('sys');
  var child_process = require('child_process');
  var spawn = child_process.spawn;
  var compiler = require('iced-coffee-script');
  var watch = require('watch');
  var rjs = require('requirejs');
  var http = require('http');
  var coreFile = 'core.js';
  var settingsFile = 'settings.js'
  var directoryToWatch = '../.'
  var red   = '\033[31m';
  var blue  = '\033[34m';
  var reset = '\033[0m';
  var output, startDaemon, stopDaemon, restart, coffee2js, p, httpUpdate, settings, uri;
  // Format STDOUT
  output = function(msg) {
      if (msg.length > 0) {
        msg = msg.toString('utf8');
        if (msg.length > 0) return console.log(msg.replace("\n", ''));
      }
  };
  // Spawn and bind process
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
  };
  stopDaemon = function() {
      p.kill();
  };
  restart = function() {
      date = new Date();
      console.log(date.toString().substr(0, 24), '--> init.js called '+red+'restart()'+reset);
      stopDaemon();
      startDaemon();
  };
  // Takes a .coffee and a callback, compiles the .coffee to .js and returns cb(filename, jsCode)
  coffee2js = function(f, callback) {
    fs.exists(f, function(ok){
      if(!ok){
        console.log("COMPILE: file '"+f+"' not found!");
        process.exit();
      }else{
        date = new Date();
        console.log(date.toString().substr(0, 24), red+'compiling'+reset, f)
        coffeeCode = fs.readFileSync(f, 'ascii');
        js = compiler.compile(coffeeCode);
        jsfile = f.replace('.coffee', '.js');
        fs.unlink(jsfile, function() {
          fs.writeFile(jsfile, js, function() {
            callback(jsfile, js);
          });
        });
      }
    });
  };
  httpUpdate = function(msg, callback){
    var options = {
      host: "127.0.0.1", // TODO: why doesnt localhost work here?
      port: settings.www.port,
      path: '/fileUpdate/'+msg
    };
    http.get(options, function(response){
      response.on('data', function(chunk){
        var reply = chunk.toString();
        if(reply != "OK"){
          console.log('httpUpdate: webserver said', reply);
          if(callback !== null){
            callback();
          }
        }
      });
    }).on("error", function(err){
      console.log("httpUpdate error:", err)
    });
  };
  coffee2js(settingsFile.replace('.js', '.coffee'), function(){ // Compile the settings file
    rjs([ settingsFile ], function(settingsKlass){ // read settings
      settings = new settingsKlass();
      if (environmentMode == 'prod') {
        startDaemon(); // in 'prod' mode, don't watch the directory.
      } else {
        watch.watchTree(directoryToWatch, function(f, curr, prev) { // Watch for changes in this dir
          var js, jsfile;
          if (typeof f === 'object' && prev === null && curr === null) { // initial scan, run once
            startDaemon();
          } else if (prev === null) {} else if (curr.nlink === 0) {} else {
            // coffee compiling
            if (f.indexOf('.coffee') !== -1) {
              if (f.indexOf('node_modules') !== -1) { // skip node_modules
                //console.log('node module changed, not restarting');
              } else if (f.indexOf('gamelabClient') !== -1){ // Ignore paths in client's symlinks
                //console.log('in symlink');
              } else if (f.indexOf('gamelabShared') !== -1){
                //console.log('in symlink');
              } else if (f.indexOf('/client/') !== -1){
                coffee2js(f, function(){
                  //restart();
                  httpUpdate(f)
                });
              } else {
                // Fallback compile and restart
                try {
                  coffee2js(f, function(){
                    restart();
                  });
                } catch (e) {
                  console.log('Compile error:', e);
                }
              }
            } else if ((f.indexOf('.png') !== -1) || f.indexOf('.jpg') !== -1) {
              // image changed - tell the server about it!
              console.log('an image changed, etc');
            }
          }
        });
      }
    });
  });
}).call(this);