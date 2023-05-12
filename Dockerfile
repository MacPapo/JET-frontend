FROM node:18.15.0-slim
LABEL MAINTAINER="Jacopo Costantini <jacopocostantini32@gmail.com>"

# Create a non-root user to run the application
RUN addgroup --system --gid 1001 frontend && \
    adduser --system --uid 1001 --home /home/frontend --shell /bin/bash --ingroup frontend frontend

# Working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install packages as a separate layer
RUN npm ci --quiet --no-cache --no-progress

# Copy the rest of the application files
COPY . .

# Set the correct ownership for the application files
RUN chown -R frontend:frontend /app
USER frontend

# expose the port
EXPOSE 4200

# Start the server using ng
CMD [ "npm", "run", "start" ]
