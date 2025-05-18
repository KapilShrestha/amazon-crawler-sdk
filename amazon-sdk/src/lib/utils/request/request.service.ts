import { RequestOptions, RequestResponse, RequestError } from './types';
import { REQUEST_CONSTANTS } from '@constants';

export class RequestService {
    async get(url: string, options: RequestOptions = {}): Promise<RequestResponse> {
        try {
            const gotOptions = {
                headers: {
                    ...REQUEST_CONSTANTS.DEFAULT_HEADERS,
                    ...options.headers
                },
                timeout: {
                    request: options.timeout || REQUEST_CONSTANTS.DEFAULT_TIMEOUT
                },
                retry: {
                    retries: REQUEST_CONSTANTS.DEFAULT_RETRY_CONFIG.maxRetries,
                    methods: ['GET'],
                    statusCodes: [408, 413, 429, 500, 502, 503, 504]
                },
                
            };

            const res = await fetch(url, gotOptions);
            const response =  await res.text();

            return {
                status: res.status,
                data: response,
            };
        } catch (error) {
            throw error;
        }
    }
}