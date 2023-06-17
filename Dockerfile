FROM node:18.15.0-slim
LABEL MAINTAINER="Jacopo Costantini <jacopocostantini32@gmail.com>"

# expose the port
EXPOSE 4200

RUN npm i npm@latest -g

RUN mkdir /opt/node_app && chown node:node /opt/node_app
WORKDIR /opt/node_app

USER node
COPY --chown=node:node package.json package-lock.json* ./
RUN npm install && npm cache clean --force
ENV PATH /opt/node_app/node_modules/.bin:$PATH

WORKDIR /opt/node_app/app
COPY --chown=node:node . .

# Start the server using ng
CMD [ "npm", "run", "start" ]
