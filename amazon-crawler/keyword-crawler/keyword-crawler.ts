import { buildSearchUrl, KeywordService } from 'amazon-sdk';

const url = buildSearchUrl('laptop', {
  page: 2,
  sort: 'price-asc',
  minPrice: 100,
  maxPrice: 500
});

(async () => {
  const keywordService = new KeywordService();
  const results = await keywordService.search('laptop', {
    page: 2,
    sort: 'price-asc',
    minPrice: 100,
    maxPrice: 500
  });

  console.log(results);
})();