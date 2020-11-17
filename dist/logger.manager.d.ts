import { Log } from "./entities/log";
import { LoggerConfig } from "./entities/LoggerConfig";
/**
 * @class LoggerManager
 * @classdesc Class LoggerManager representing logging queue manager
 * @description Create new instance of logging queue manager
 */
export declare class LoggerManager {
    /**
     * @member {LoggerConfig} config
     * @memberOf LoggerManager
     * @description Configuration object
     * @public
     */
    config: LoggerConfig;
    /**
     * @member {number} bufferSize
     * @memberOf LoggerManager
     * @description Logger manager buffer size
     * @default 0
     * @private
     */
    private bufferSize;
    /**
     * @member {number} addLogStream
     * @memberOf LoggerManager
     * @description Logger manager logs stream
     * @private
     */
    private addLogStream;
    /**
     * @member {Subscription} logStreamSubscription
     * @memberOf LoggerManager
     * @description Logger manager logs stream subscription object
     * @private
     */
    private logStreamSubscription;
    /**
     * @member {Observable<HTTPResponse>} logBulkObs$
     * @memberOf LoggerManager
     * @description Logs bulk observable instance
     * @private
     */
    private logBulkObs$;
    /**
     * @member {Subject<boolean>} pauser$
     * @memberOf LoggerManager
     * @description Logger manager queue pauser subject
     * @default new Subject<boolean>()
     * @private
     */
    private pauser$;
    /**
     * @member {Subject<any>} flush$
     * @memberOf LoggerManager
     * @description Logger manager queue flush subject
     * @default new Subject<any>()
     * @private
     */
    private flush$;
    /**
     * @member {Promise<void>} flushed
     * @memberOf LoggerManager
     * @description internal state for when the logs were flushed
     * @private
     */
    private flushedPromise;
    /**
     * @member {Promise<void>} () => void
     * @memberOf LoggerManager
     * @description a resolver for when the flush promise is fulfilled
     * @private
     */
    private flushPromiseFulfilled;
    /**
     * @description Initialize new instance of LoggerManager object
     */
    constructor();
    /**
     * @method waitForFlush
     * @description waits for all the currently pending to be written to the Coralogix backend
     * @memberOf LoggerManager
     * @public
     * @returns {Promise} returns a promise that settles when all the pending logs have been written
     */
    waitForFlush(): Promise<void>;
    /**
     * @method addLogline
     * @description Add log line to logger manager queue
     * @memberOf LoggerManager
     * @param {Log} log - Log line object instance
     * @public
     */
    addLogline(log: Log): void;
    /**
     * @method close
     * @description Close logger manager and flush queue
     * @memberOf LoggerManager
     * @public
     */
    close(): void;
    /**
     * @method flush
     * @description Flush logger manager queue
     * @memberOf LoggerManager
     * @public
     */
    flush(): void;
    /**
     * @method subscribe
     * @description Subscribe on logger manager observable events
     * @memberOf LoggerManager
     * @public
     */
    subscribe(): void;
    /**
     * @method sendBulk
     * @description Send logs buffer to Coralogix
     * @memberOf LoggerManager
     * @param {Log[]} buffer - Logs buffer
     * @private
     */
    private sendBulk(buffer);
    /**
     * @method cleanAfterSend
     * @description On buffer send completed (success of failed) free the buffer size
     * @memberOf LoggerManager
     * @param {Log[]} sentBuffer - Logs buffer
     * @private
     */
    private cleanAfterSend(sentBuffer);
    /**
     * @method cleanAfterSend
     * @description Return an on error observable that will retry
     *              for "HTTP_SEND_RETRY_COUNT" with a delay
     *              of "HTTP_SEND_RETRY_INTERVAL" after the max retry
     *              times are exceed will throw an error
     * @memberOf LoggerManager
     * @param errors$ - Errors list
     * @private
     * @returns {Observable<T>} Logger manager observable object
     */
    private retryObservable(errors$);
}
