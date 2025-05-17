import { SearchResult } from '../types';

export abstract class SearchAdaptor {
    protected constructor() {}

    abstract search(query: string, options?: unknown): Promise<SearchResult>;

    protected createEmptyResult(): SearchResult {
        return {
            totalResults: 0,
            products: [],
            currentPage: 1
        };
    }

    protected validateQuery(query: string): boolean {
        return Boolean(query && query.trim().length > 0);
    }

    protected handleError(error: any): never {
        console.error(`Search error: ${error.message}`);
        throw error;
    }
}