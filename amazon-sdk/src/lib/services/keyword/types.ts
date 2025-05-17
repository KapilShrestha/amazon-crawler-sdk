export interface KeywordSearchOptions {
    page?: number;
    sort?: 'price-asc' | 'price-desc' | 'relevance' | 'newest';
    minPrice?: number;
    maxPrice?: number;
    marketplace?: string;
}

export interface KeywordSearchResult {
    url: string;
    keyword: string;
    options: KeywordSearchOptions;
}