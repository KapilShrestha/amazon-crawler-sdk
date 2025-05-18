FROM node:18-slim

WORKDIR /app

# Copy package files

COPY amazon-crawler/package*.json ./
COPY amazon-crawler/tsconfig.json ./

COPY ./amazon-sdk/ /amazon-sdk/

# Install dependencies
RUN npm install

# Copy source code
COPY ./amazon-crawler/ .

# Build TypeScript code
RUN npm run build || echo "No build script found"

# Command to run the crawler
CMD ["node", "dist/keyword-crawler/keyword-crawler.js"] 