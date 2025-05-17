export interface SearchOptions {
    page?: number;
    sort?: 'price-asc' | 'price-desc' | 'relevance' | 'newest';
    minPrice?: number;
    maxPrice?: number;
}