import * as FluentLogger from 'fluent-logger';

export interface LoggerConfig {
    tag: string;
    host?: string;
    port?: number;
    timeout?: number;
    reconnectInterval?: number;
}

export class LoggerService {
    private static instance: LoggerService;
    private logger: any;
    private isInitialized: boolean = false;

    private constructor() {}

    static getInstance(): LoggerService {
        if (!LoggerService.instance) {
            LoggerService.instance = new LoggerService();
        }
        return LoggerService.instance;
    }

    /**
     * Initialize the Fluentd logger
     * @param config Logger configuration
     */
    initialize(config: LoggerConfig): void {
        if (this.isInitialized) {
            return;
        }

        try {
            this.logger = FluentLogger.createFluentSender(config.tag, {
                host: config.host || 'localhost',
                port: config.port || 24224,
                timeout: config.timeout || 3.0,
                reconnectInterval: config.reconnectInterval || 600000
            });

            this.isInitialized = true;
            this.info('Logger initialized successfully', { config });
        } catch (error) {
            console.error('Failed to initialize logger:', error);
            throw error;
        }
    }

    /**
     * Log info level message
     * @param message Log message
     * @param data Additional data to log
     */
    info(message: string, data?: any): void {
        this.log('info', message, data);
    }

    /**
     * Log error level message
     * @param message Error message
     * @param error Error object or additional data
     */
    error(message: string, error?: any): void {
        this.log('error', message, error);
    }

    /**
     * Log debug level message
     * @param message Debug message
     * @param data Additional data to log
     */
    debug(message: string, data?: any): void {
        this.log('debug', message, data);
    }

    /**
     * Log warning level message
     * @param message Warning message
     * @param data Additional data to log
     */
    warn(message: string, data?: any): void {
        this.log('warn', message, data);
    }

    /**
     * Internal logging method
     */
    private log(level: string, message: string, data?: any): void {
        if (!this.isInitialized) {
            console.warn('Logger not initialized. Using console fallback.');
            console.log(`[${level.toUpperCase()}] ${message}`, data || '');
            return;
        }

        const logData = {
            level,
            message,
            timestamp: new Date().toISOString(),
            ...(data && { data })
        };

        this.logger.emit(level, logData, (error: any) => {
            if (error) {
                console.error('Failed to send log to Fluentd:', error);
                console.log(`[${level.toUpperCase()}] ${message}`, data || '');
            }
        });
    }
} 