#!/bin/bash

PROJECT=$1
GAMELABDIR=$2

mkdir $PROJECT

cd $PROJECT
mkdir shared client server
cp $GAMELABDIR/.gitignore .
echo $PROJECT > README
ln -s $GAMELABDIR gamelab.js
cd client
mkdir scenes
ln -s $GAMELABDIR/client gamelabClient
ln -s $GAMELABDIR/shared gamelabShared
cp $GAMELABDIR/server/example/clientCore.coffee core.coffee
iced -c core.coffee
cp $GAMELABDIR/client/index.html index.html
cd scenes
cp $GAMELABDIR/server/example/scene.coffee example.coffee
iced -c example.coffee
cd ..
cp -r $GAMELABDIR/client/libs .
cp -r $GAMELABDIR/client/static .
cd ..
cd server
mkdir classes
cp $GAMELABDIR/server/init.js .
cp $GAMELABDIR/server/example/settings.coffee .
cp $GAMELABDIR/server/example/serverCore.coffee core.coffee
iced -c core.coffee
cd ../../

echo "ONE LAST BIT"
echo "You'll need to edit $PROJECT/server/settings.coffee"
echo "with the corret root path (or patch this installer to do this for you)"
echo "And compile it with 'iced -c settings.coffee'"
