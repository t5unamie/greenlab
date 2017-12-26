# Security Microservices
This is a security microservice. It will authenticate all comunications between microservices and frontend. 

# Setup guide

Note: I use docker-toolbopx on my mac.

# Setup Mongodb - https://hub.docker.com/_/mongo/

docker run --name secure_app -d -p 27017:27017 -d mongo --auth --bind_ip=0.0.0.0

Add the following user for the example to work.

docker exec -it secure_app mongo admin

connecting to: admin


db.createUser({ user: 'jphan', pwd: 'someyoungguy', roles: [ "readWriteAnyDatabase", "dbAdminAnyDatabase", "userAdminAnyDatabase" ] });


testing account by downloading robomongo and connecting to the instance from that.

To start app run 

npm start

To create user for login testing hit this URL.

localhost:3001/setup

JWT auth model examples used.

https://scotch.io/tutorials/authenticate-a-node-js-api-with-json-web-tokens

Prerequisites

Setup user account - http://developer.zoopla.com/member/register/


