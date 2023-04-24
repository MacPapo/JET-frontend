FROM node:18.15.0-slim
LABEL MAINTAINER="Jacopo Costantini <jacopocostantini32@gmail.com>"

# Install angular, angular-cli, material with npm
RUN npm install -g @angular/cli @angular/material @angular/cdk @angular/animations

# Copy the project files to the container
ADD . /app

# Set the working directory
WORKDIR /app

# expose the port
EXPOSE 4200

# Run the app
CMD ng serve --verbose --watch --host 0.0.0.0
