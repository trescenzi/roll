FROM node:10

# Set the default working directory
WORKDIR /usr/src

# Install dependencies
COPY package.json yarn.lock ./
RUN yarn

# Copy the src to the working directory
COPY . .

# Build and export the app
RUN yarn build-docker
