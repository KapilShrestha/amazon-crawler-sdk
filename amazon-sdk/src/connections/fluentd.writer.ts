import * as FluentLogger from 'fluent-logger';

export interface FluentdConfig {
    tag: string;
    host?: string;
    port?: number;
    timeout?: number;
    reconnectInterval?: number;
    requireAckResponse?: boolean;
}

export interface FluentdData {
    [key: string]: any;
}

export class FluentdWriter {
    private static instance: FluentdWriter;
    private logger: any;
    private isInitialized: boolean = false;
    private defaultTag: string = 'amazon-sdk';

    private constructor() {}

    static getInstance(): FluentdWriter {
        if (!FluentdWriter.instance) {
            FluentdWriter.instance = new FluentdWriter();
        }
        return FluentdWriter.instance;
    }

    /**
     * Initialize the Fluentd writer
     * @param config Fluentd configuration
     */
    initialize(config: FluentdConfig): void {
        if (this.isInitialized) {
            return;
        }

        try {
            this.defaultTag = config.tag;
            this.logger = FluentLogger.createFluentSender(config.tag, {
                host: config.host || 'localhost',
                port: config.port || 24224,
                timeout: config.timeout || 3.0,
                reconnectInterval: config.reconnectInterval || 600000,
                requireAckResponse: config.requireAckResponse || false
            });

            this.isInitialized = true;
            this.addData('system', { 
                message: 'FluentdWriter initialized',
                config: {
                    ...config,
                    // Don't log potential sensitive data
                    host: config.host || 'localhost',
                    port: config.port || 24224
                }
            });
        } catch (error) {
            console.error('Failed to initialize FluentdWriter:', error);
            throw error;
        }
    }

    /**
     * Add data to Fluentd stream
     * @param label Data label/category (will be appended to tag)
     * @param data Data to stream
     * @param timestamp Optional timestamp (defaults to current time)
     * @returns Promise that resolves when data is written
     */
    async addData(label: string, data: FluentdData, timestamp?: number): Promise<boolean> {
        if (!this.isInitialized) {
            throw new Error('FluentdWriter not initialized. Call initialize() first.');
        }

        try {
            // Prepare the data with metadata
            const enrichedData = {
                ...data,
                _metadata: {
                    timestamp: timestamp || Date.now(),
                    label,
                    tag: `${this.defaultTag}.${label}`
                }
            };

            // Return promise for write operation
            return new Promise((resolve, reject) => {
                this.logger.emit(label, enrichedData, (error: any) => {
                    if (error) {
                        console.error('Failed to write to Fluentd:', error);
                        reject(error);
                        return;
                    }
                    resolve(true);
                });
            });
        } catch (error) {
            console.error('Error writing to Fluentd:', error);
            throw error;
        }
    }
    /**
     * Check connection to Fluentd
     * @returns Promise that resolves to true if connected
     */
    async checkConnection(): Promise<boolean> {
        if (!this.isInitialized) {
            return false;
        }

        try {
            await this.addData('health', { 
                status: 'checking',
                timestamp: Date.now()
            });
            return true;
        } catch (error) {
            console.error('Fluentd connection check failed:', error);
            return false;
        }
    }

    /**
     * Close the Fluentd connection
     */
    async close(): Promise<void> {
        if (this.isInitialized && this.logger) {
            try {
                await this.addData('system', { 
                    message: 'FluentdWriter shutting down',
                    timestamp: Date.now()
                });
                await new Promise<void>((resolve) => {
                    this.logger.end(() => {
                        this.isInitialized = false;
                        resolve();
                    });
                });
            } catch (error) {
                console.error('Error closing Fluentd connection:', error);
                throw error;
            }
        }
    }
}