export interface RequestOptions {
    headers?: Record<string, string>;
    timeout?: number;
    retries?: number;
    proxy?: {
        protocol: string;
        host: string;
        port: number;
        auth?: {
            username: string;
            password: string;
        };
    };
}

export interface RequestResponse {
    status: number;
    data: string;
}

export class RequestError extends Error {
    constructor(
        message: string,
        public status: number,
        public response: any
    ) {
        super(message);
        this.name = 'RequestError';
    }
}