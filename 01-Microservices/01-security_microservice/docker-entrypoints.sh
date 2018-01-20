#!/bin/sh

if [ -z "$USERNAME" ]
then
      echo "username not set, default jphan set"
else
      # Setup config
		sed -i "s/jphan/${USERNAME}/g" config.js
fi

if [ -z "$PASSWORD" ]
then
      echo "password not set, default someyoungguy set"
else
      # Setup config
		sed -i "s/someyoungguy/${PASSWORD}/g" config.js
fi

if [ -z "$URL" ]
then
      echo "SECRET not set, default securitysex set"
else
      # Setup config
		defaultip=192.168.99.100
		sed -i -e 's/'$defaultip'\b/'$URL'/g' config.js
fi

if [ -z "$PORT" ]
then
      echo "port not set, default 27017 set"
else
      # Setup config
		sed -i "s/27017/${PORT}/g" config.js
fi

if [ -z "$SECRET" ]
then
      echo "SECRET not set, default securitysex set"
else
      # Setup config
		sed -i "s/securitysex/${SECRET}/g" config.js
fi

npm update
npm start

# Start service
