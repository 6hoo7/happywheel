# Base image
FROM node:20

# Set working directory
WORKDIR /server

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy rest of the files
COPY . .

# Expose port
EXPOSE 3000

# Start app
CMD ["npm", "start"]
