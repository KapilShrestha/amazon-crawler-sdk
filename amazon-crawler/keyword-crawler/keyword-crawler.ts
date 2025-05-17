import { buildSearchUrl } from 'amazon-sdk';

const url = buildSearchUrl('laptop', {
  page: 2,
  sort: 'price-asc',
  minPrice: 100,
  maxPrice: 500
});

console.log(url);