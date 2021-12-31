FROM node:16

# Create app directory
WORKDIR /usr/src/app

# Install dependencies
COPY package*.json ./
RUN npm install

# Bundle app source
COPY . .

# start the watcher
CMD [ "node", "--experimental-wasm-threads", "index.js" ]