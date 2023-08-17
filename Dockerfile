# Use the latest slim version of nodejs
FROM node:current-slim

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the application code to the container
COPY . .

# Expose the port that your application will run on
EXPOSE 3000

# Command to start your application
CMD ["npm", "start"]
