import { buildSearchUrl } from '../url';

describe('buildSearchUrl', () => {
    test('should build basic search URL with just keyword', () => {
        const url = buildSearchUrl('laptop');
        expect(url).toBe('https://www.amazon.com/s?k=laptop');
    });

    test('should build URL with page number', () => {
        const url = buildSearchUrl('laptop', { page: 2 });
        expect(url).toBe('https://www.amazon.com/s?k=laptop&page=2');
    });

    test('should build URL with sorting', () => {
        const url = buildSearchUrl('laptop', { sort: 'price-asc' });
        expect(url).toBe('https://www.amazon.com/s?k=laptop&sort=price-asc');
    });

    test('should build URL with price range', () => {
        const url = buildSearchUrl('laptop', { minPrice: 100, maxPrice: 500 });
        expect(url).toBe('https://www.amazon.com/s?k=laptop&low-price=100&high-price=500');
    });

    test('should build URL with all options', () => {
        const url = buildSearchUrl('laptop', {
            page: 2,
            sort: 'price-asc',
            minPrice: 100,
            maxPrice: 500
        });
        expect(url).toBe('https://www.amazon.com/s?k=laptop&page=2&sort=price-asc&low-price=100&high-price=500');
    });

    test('should not add page parameter for page 1', () => {
        const url = buildSearchUrl('laptop', { page: 1 });
        expect(url).toBe('https://www.amazon.com/s?k=laptop');
    });
});