FROM node:18-alpine

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy source code
COPY . .

# Build the SDK
RUN npm run build

# Keep container running for development
CMD ["tail", "-f", "/dev/null"]