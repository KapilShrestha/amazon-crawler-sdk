const AmazonDefaultSelectors = {
    product: {
        container: 'div[data-component-type="s-search-result"]',
        title: 'h2 a span',
        price: '.a-price .a-offscreen',
        asin: 'data-asin',
        image: 'img.s-image',
        rating: '.a-icon-star-small .a-icon-alt',
        url: 'h2 a'
    },
    pagination: {
        totalResults: '#search .s-breadcrumb .a-section .a-color-state',
        currentPage: '.s-pagination-item.s-pagination-selected'
    }
} as const;

export { AmazonDefaultSelectors }; 
