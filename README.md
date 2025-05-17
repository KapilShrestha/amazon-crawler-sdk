
## Quick Start

### 1. Clone and Setup SDK
```bash
# Clone the repository
git clone https://github.com/KapilShrestha/amazon-crawler-sdk.git
cd amazon-crawler-sdk

# Install and build the SDK
cd amazon-sdk
npm install
npm run build
```

### 2. Implement in Your Crawler
```bash
# Navigate to your crawler directory
cd ../amazon-crawler

# Install dependencies
npm install

# Start using the SDK in your crawler
```

### 3. Using the SDK in Your Code
```typescript
import { buildSearchUrl } from 'amazon-sdk';

// Example: Create a search URL
const url = buildSearchUrl('laptop', {
    page: 1,
    sort: 'price-asc',
    minPrice: 100,
    maxPrice: 500
});
```

### 4. Run Your Crawler
```bash
# Run keyword crawler
npm run keyword

# Run vendor crawler
npm run vendor

# Run item ID crawler
npm run item-id

# Run category crawler
npm run category
```

## Development

To make changes to the SDK:
```bash
cd amazon-sdk
npm run build
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.