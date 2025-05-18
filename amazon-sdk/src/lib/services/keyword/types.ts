export interface KeywordSearchOptions {
    page?: number;
    sort?: 'price-asc' | 'price-desc' | 'relevance' | 'newest';
    minPrice?: number;
    maxPrice?: number;
}

export interface KeywordSearchResult {
    title: string;
    price: string | null;
}