import { AMAZON_CONSTANTS } from '@constants';
import { SearchOptions } from './types';

export function buildSearchUrl(keyword: string, options: SearchOptions = {}): string {
    const params = new URLSearchParams();
    
    params.append('k', keyword);
    
    if (options.page && options.page > 1) {
        params.append('page', options.page.toString());
    }
    
    if (options.sort) {
        params.append('sort', options.sort);
    }
    
    if (options.minPrice) {
        params.append('low-price', options.minPrice.toString());
    }
    if (options.maxPrice) {
        params.append('high-price', options.maxPrice.toString());
    }

    return `${AMAZON_CONSTANTS.BASE_URL}${AMAZON_CONSTANTS.ENDPOINTS.SEARCH}?${params.toString()}`;
}
