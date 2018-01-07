FROM node:carbon

# Create app directory - Kubernetes template will load from github the code.
WORKDIR /usr/src/app

RUN npm install
# If you are building your code for production
RUN npm install --only=production

EXPOSE 8080
CMD [ "npm", "start" ]