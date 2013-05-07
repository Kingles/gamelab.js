#!/bin/bash

PROJECT=$1
SCRIPTDIR=`realpath $0`
GAMELABDIR="`dirname $SCRIPTDIR`/.."
mkdir $PROJECT
PROJECTDIR=`realpath $PROJECT`

cd $PROJECTDIR
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
