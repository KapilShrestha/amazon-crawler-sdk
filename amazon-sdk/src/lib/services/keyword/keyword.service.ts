import { buildSearchUrl } from '@utils/build-search-url';
import { KeywordSearchOptions, KeywordSearchResult } from './types';

export class KeywordService {
    /**
     * Builds a search URL for the given keyword and options
     */
    buildSearchUrl(keyword: string, options: KeywordSearchOptions = {}): KeywordSearchResult {
        this.validateSearchParams(keyword, options);
        
        const url = buildSearchUrl(keyword, options);

        return {
            url,
            keyword,
            options
        };
    }

    /**
     * Validates the search parameters
     */
    private validateSearchParams(keyword: string, options: KeywordSearchOptions): void {
        if (!keyword || keyword.trim().length === 0) {
            throw new Error('Keyword is required');
        }

        if (options.page && options.page < 1) {
            throw new Error('Page number must be greater than 0');
        }

        if (options.minPrice && options.maxPrice && options.minPrice > options.maxPrice) {
            throw new Error('Minimum price cannot be greater than maximum price');
        }
    }
}