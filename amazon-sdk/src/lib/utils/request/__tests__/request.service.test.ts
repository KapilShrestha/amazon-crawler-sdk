import { RequestService } from '../request.service';

describe('RequestService', () => {
    let requestService: RequestService;

    beforeEach(() => {
        requestService = new RequestService();
    });

    it('should make a successful GET request', async () => {
        const response = await requestService.get('https://httpbin.org/json');

        expect(response.status).toBe(200);
        expect(response.data).toBeDefined();
    });

    it('should handle errors correctly', async () => {
        await expect(
            requestService.get('https://httpbin.org/status/404')
        ).rejects.toThrow();
    });
});
