import { buildSearchUrl } from '@utils/build-search-url';
import { RequestService } from '@utils/request';
import { KeywordSearchOptions, KeywordSearchResult } from './types';
import { AmazonDefaultSelectors } from '@constants';
import { parse } from 'node-html-parser';
import { LoggerService } from '@utils/logger';

export class KeywordService {
    private requestService: RequestService;
    private logger: LoggerService;

    constructor() {
        this.requestService = new RequestService();
        this.logger = LoggerService.getInstance();
    }
    async searchDemo(keyword: string){
        return {
            title : 'demo-title',
            price : 123
        }
    }

    async search(keyword: string, options: KeywordSearchOptions = {}): Promise<KeywordSearchResult[]> {
        try {
            this.validateInput(keyword);
            
            const url = buildSearchUrl(keyword, options);
            this.logger.info('Searching Amazon products', { keyword, options, url });

            const response = await this.requestService.get(url);

            if (response.status !== 200) {
                this.logger.error('Search request failed', { 
                    status: response.status,
                    keyword,
                    options
                });
                throw new Error(`Search failed with status: ${response.status}`);
            }

            const results = this.parseSearchResults(response.data);
            this.logger.info('Search completed successfully', { 
                keyword, 
                resultsCount: results.length 
            });

            return results;
        } catch (error) {
            this.logger.error('Error during keyword search', { 
                error,
                keyword,
                options
            });
            throw error;
        }
    }

    private validateInput(keyword: string): void {
        if (!keyword || keyword.trim().length === 0) {
            this.logger.error('Invalid keyword provided', { keyword });
            throw new Error('Keyword is required');
        }
        this.logger.debug('Input validation passed', { keyword });
    }

    private parseSearchResults(html: string): KeywordSearchResult[] {
        const root = parse(html);
        
        // Check if container selector exists
        if (!AmazonDefaultSelectors.product.container) {
            this.logger.warn('Container selector is missing', { 
                selectors: AmazonDefaultSelectors.product 
            });
            return [{
                title: 'runn',
                price: 'runn'
            }];
        }

        const products = root.querySelectorAll(AmazonDefaultSelectors.product.container);
        this.logger.debug('Found products in HTML', { count: products.length });

        return Array.from(products).map(product => {
            // Check each selector before using it
            const hasAllSelectors = 
                AmazonDefaultSelectors.product.title &&
                AmazonDefaultSelectors.product.price;

            if (!hasAllSelectors) {
                this.logger.warn('Missing required selectors', { 
                    selectors: AmazonDefaultSelectors.product 
                });
                return {
                    title: 'runn',
                    price: 'runn'
                };
            }

            const result = {
                title: product.querySelector(AmazonDefaultSelectors.product.title)?.textContent?.trim() || 'runn',
                price: product.querySelector(AmazonDefaultSelectors.product.price)?.textContent?.trim() || 'runn'
            };

            if (result.title === 'runn' || result.price === 'runn') {
                this.logger.warn('Failed to extract some product data', { result });
            }

            return result;
        });
    }
}