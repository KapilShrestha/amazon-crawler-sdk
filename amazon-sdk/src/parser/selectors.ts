export interface AmazonSelectors {
  productContainer: string;    // Selector for product container
  title: string;              // Selector for product title
  price: string;              // Selector for product price
  asin: string;               // Selector for ASIN
  image: string;              // Selector for product image
  rating: string;             // Selector for product rating
  url: string;                // Selector for product URL
}

// Default selectors for Amazon
export const defaultAmazonSelectors: AmazonSelectors = {
  productContainer: '.s-result-item[data-asin]',
  title: 'h2 a span',
  price: '.a-price .a-offscreen',
  asin: 'data-asin',
  image: 'img.s-image',
  rating: '.a-icon-alt',
  url: 'h2 a'
};
