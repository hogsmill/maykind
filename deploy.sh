#!/bin/bash

FORCE=false
NEW=false
while [ $1 ]
do
  echo $1
  if [ "$1" == "-f" ]; then
    FORCE=true
  fi
  shift
done

PORT=4103
REPO="https://github.com/hogsmill/maykind.git"
APP="maykind"
PROPERTYCOLLECTION="maykindProperties"
SITECOLLECTION="maykindSite"
APPNAME="May Kind"

echo "------------------------------------------------"
echo "Installing $APP ($SITECOLLECTION, $PROPERTYCOLLECTION, $PORT)"
echo "------------------------------------------------"

DIR="/usr/apps/$APP"
if [ ! -d $DIR ]; then
  git clone $REPO $DIR
fi

cd $DIR

rm $DIR/package-lock.json
rm -rf $DIR/node_modules

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
if [ ! -d /var/www/html/$APP/ ]; then
  mkdir /var/www/html/$APP
fi
if [ -d /var/www/html/$APP/css ]; then
  rm /var/www/html/$APP/css/*
else
  mkdir /var/www/html/$APP/css
fi
if [ -d /var/www/html/$APP/js ]; then
  rm /var/www/html/$APP/js/*
else
  mkdir /var/www/html/$APP/js
fi
cp -R dist/* /var/www/html/$APP
if [ -f "src/server.js" ]; then
  SERVER=`ps -ef | grep server.js | grep "/$APP/" | awk {'print $2'}`
  if [ "$SERVER" != "" ]; then
    kill -9 $SERVER
  fi
fi
if [ $i == 0 ]; then
  rm -rf $DIR/node_modules/.cache
else
  rm -rf node_modules
  ln -s ../$MAINAPP/node_modules node_modules
fi
rm -rf $DIR/dist

ps -ef | grep php | grep outdated
if [ $? -eq 1 ]; then
  php /usr/apps/monitor/src/lib/outdated.php &
fi
