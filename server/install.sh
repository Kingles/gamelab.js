#!/bin/sh
echo "Installing NPM modules"

npm install coffee-script
npm install iced-coffee-script
npm install requirejs
#npm install binaryjs
#npm install sqlite3
npm install socket.io
npm install watch
#npm install sleep

echo "----------------------"
echo ""
echo "README"
echo ""
echo "If you have an 'EROFS' error on a writable fs,"
echo "you need to tell VirtualBox to allow Symlinks on shared directories."
echo "See: https://www.virtualbox.org/ticket/10085#comment:12"
echo ""
echo "Installation complete, have a great day and happy hacking! - Eru"