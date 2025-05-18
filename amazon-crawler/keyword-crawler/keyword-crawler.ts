import { buildSearchUrl, KeywordService, FluentdWriter } from 'amazon-sdk';

const url = buildSearchUrl('laptop', {
  page: 2,
  sort: 'price-asc',
  minPrice: 100,
  maxPrice: 500
});

(async () => {
  const fluentLogger = FluentdWriter.getInstance()
  const logs = fluentLogger.initialize(
    {
      tag: 'amazon-sdk',
      host: 'localhost',
      port: 24224,
      timeout: 3000,
      reconnectInterval: 1000,
      requireAckResponse: true
    }
  );

  const keywordService = new KeywordService();
//   const results = await keywordService.search('laptop', {
//     page: 2,
//     sort: 'price-asc',
//     minPrice: 100,
//     maxPrice: 500
//   });
  const result2 = await keywordService.searchDemo('laptop');



  // console.log(results);
  console.log(result2)
  await fluentLogger.addData('keyword-crawler', {
    keyword: 'laptop',
    result: result2
  })
  await fluentLogger.close();
})();

