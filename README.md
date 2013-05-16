Gamelab.js
========

A game engine based on node.js and three.js by Seandon Mooy

To great a new project

`./gamelab.js/server/gamelab.sh myAwesomeProject`

Starting the server!

`cd myAwesomeProject/server/`

`./init.js`

That will fail because you're missing something, so try

`./gamelab.js/server/install.sh`

;P

Take a look in client/core.coffee in your new project as well as the scene it changes to, client/scenes/example.coffee.

Remember, init.js will stay open, running the web server, socket server, and compiling your coffeescript. Keep an eye on it for coffeescript compile errors, or server runtime errors!

Gamelab is not meant to be monolithic - in fact it's a small set of scripts hobbled together to create a boilerplate for creating all sorts of javascript applications.

Please feel free to hack at gamelab.js/client/core, shared/core, etc!

Good luck!
