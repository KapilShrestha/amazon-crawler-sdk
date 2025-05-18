import { buildSearchUrl } from '@utils/build-search-url';
import { RequestService } from '@utils/request';
import { KeywordSearchOptions, KeywordSearchResult } from './types';
import {AmazonDefaultSelectors} from '@constants'
import { parse } from 'node-html-parser';

export class KeywordService {
    private requestService: RequestService;

    constructor() {
        this.requestService = new RequestService();
    }

    async search(keyword: string, options: KeywordSearchOptions = {}): Promise<KeywordSearchResult[]> {
        try {
            this.validateInput(keyword);

            const url = buildSearchUrl(keyword, options);

            const response = await this.requestService.get(url);

            if (response.status !== 200) {
                throw new Error(`Search failed with status: ${response.status}`);
            }

            return this.parseSearchResults(response.data);
        } catch (error) {
            console.error('Error during keyword search:', error);
            throw error;
        }
    }

    private validateInput(keyword: string): void {
        if (!keyword || keyword.trim().length === 0) {
            throw new Error('Keyword is required');
        }
    }

    private parseSearchResults(html: string): KeywordSearchResult[] {
        const root = parse(html);
        const products = root.querySelectorAll(AmazonDefaultSelectors.product.container);

        return Array.from(products).map(product => ({
            title: product.querySelector(AmazonDefaultSelectors.product.title)?.textContent?.trim() || '',
            price: product.querySelector(AmazonDefaultSelectors.product.price)?.textContent?.trim() || null,
        }));
    }
}