export const REQUEST_CONSTANTS = {
    DEFAULT_HEADERS: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
        'Connection': 'keep-alive',
        'Upgrade-Insecure-Requests': '1'
    },
    DEFAULT_RETRY_CONFIG: {
        maxRetries: 5,
        backoff: 1000,
        maxBackoff: 10000
    },
    DEFAULT_TIMEOUT: 30000,
    DEFAULT_PROXY: {
        protocol: 'http',
        host: 'localhost',
        port: 8080,
        auth: {
            username: '',
            password: ''
        }
    }
} as const;