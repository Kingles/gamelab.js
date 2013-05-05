#!/bin/sh

# emerge --sync
# emerge -av v8 nodejs sqlite3
# npm-update -gi

echo "Installing NPM modules"

npm install coffee-script
npm install iced-coffee-script
npm install requirejs
npm install binaryjs
npm install sqlite3
npm install socket.io
npm install watch
#npm install sleep
#npm install nodemon - Deprecated - now using coughy.js

echo "----------------------"
echo ""
echo "Setting up database file... SKIPPED FOR NOW"
#touch db/e13.db
echo ""
echo "README"
#echo ""
#echo "If you are new to coffeescript, or this is your first e13 run"
#echo "it is highly recommended to run 'sudo npm install -g coffee-script iced-coffee-script'"
echo ""
echo "If you have a SQLITE3 installation error,"
echo "you need to install dev-db/sqlite, or equiv. Gentoo users consider global 'sqlite3' USE flag"
echo "also make sure that you're using Python2.7 to build Sqlite3. 'eselect python list'"
# We now support node-current! (v0.10.5)
#echo "If you have build errors, you're probably using a version of node we don't support yet."
#echo "add '>=net-libs/nodejs-0.9.0' to your package.masks, or downgrade manually"
echo ""
echo "If you have an 'EROFS' error on a writable fs,"
echo "you need to tell VirtualBox to allow Symlinks on shared directories."
echo "See: https://www.virtualbox.org/ticket/10085#comment:12"
echo ""
# We now keep settings in the game pojects
#echo "If you havn't already, you'll need to open settings.js in /shared/classes and edit it accordingly"
#echo "NOTE: Please do _NOT_ add settings.js to git! Thanks!"
#echo ""
echo "Installation complete, have a great day and happy hacking! - Eru"
echo ""
