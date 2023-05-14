FROM node:18.15.0-slim
LABEL MAINTAINER="Jacopo Costantini <jacopocostantini32@gmail.com>"

# expose the port
EXPOSE 4200

# Working directory
WORKDIR /node

COPY package*.json ./

RUN chown -R node:node .
USER node

RUN npm install && npm cache clean --force

WORKDIR /node/app

COPY --chown=node:node . .

# Start the server using ng
CMD [ "npm", "run", "start" ]
