#!/bin/bash

if [ "$1" == "-f" ]; then
  FORCE=true
fi

PORT=4103
PWD=`pwd`
APP=`basename $PWD`
git stash
GIT=`git pull`
echo $GIT
if [ "$FORCE" != "true" -a "$GIT" == "Already up to date." ]; then
  exit 0
fi

npm install --legacy-peer-deps
npm run build
rm /var/www/html/$APP/css/*
rm /var/www/html/$APP/js/*
cp -R dist/* /var/www/html/$APP
if [ -f "src/server.js" ]; then
  SERVER=`ps -ef | grep server.js | grep $PORT | awk {'print $2'}`
  if [ "$SERVER" != "" ]; then
    kill -9 $SERVER
  fi
fi
sleep 5
node /usr/apps/maykind/src/server.js 4103 "May Kind" /usr/apps/logs/maykind.log &

rm -rf node_modules/.cache
rm -rf dist

exit 0
