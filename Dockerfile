# Use an official Node.js runtime as a base image
FROM node:18.12.0

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the application files to the working directory
COPY . .

# Expose the port your app runs on
EXPOSE 3000

# Start the application
CMD ["node", "index.js"]
