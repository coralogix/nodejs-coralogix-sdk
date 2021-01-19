/**
 * Logger manager file
 *
 * @file        This file contains logging queue manager
 * @author      Yoni Farin <farin99@gmail.com>
 * @author      Eldar Aliiev <eldar@coralogix.com>
 * @link        https://coralogix.com/
 * @copyright   Coralogix Ltd.
 * @licence     Apache-2.0
 * @version     1.0.0
 * @since       1.0.0
 */

import {Observable, Subject} from "rxjs";
import {Subscription} from "rxjs/Subscription";
import {Constants} from "./constants";
import {DebugLogger} from "./debug.logger";
import {Bulk} from "./entities/bulk";
import {Log, Severity} from "./entities/log";
import {LoggerConfig} from "./entities/LoggerConfig";
import {rxHelper} from "./helpers/rx.helper";
import {HttpHelper} from "./http.service";
import HTTPResponse = HttpHelper.HTTPResponse;
import {BufferPredicateOrObservableOperator} from "./rxOperators/buffer-predicate-or-observable.operator";

/**
 * @name sizeof
 * @constant {function}
 * @default
 */
const sizeof = require("object-sizeof");

/**
 * @class LoggerManager
 * @classdesc Class LoggerManager representing logging queue manager
 * @description Create new instance of logging queue manager
 */
export class LoggerManager {
    /**
     * @member {LoggerConfig} config
     * @memberOf LoggerManager
     * @description Configuration object
     * @public
     */
    public config: LoggerConfig;

    /**
     * @member {number} bufferSize
     * @memberOf LoggerManager
     * @description Logger manager buffer size
     * @default 0
     * @private
     */
    private bufferSize: number = 0;

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
    private logStreamSubscription: Subscription;

    /**
     * @member {Observable<HTTPResponse>} logBulkObs$
     * @memberOf LoggerManager
     * @description Logs bulk observable instance
     * @private
     */
    private logBulkObs$: Observable<HTTPResponse>;

    /**
     * @member {Subject<boolean>} pauser$
     * @memberOf LoggerManager
     * @description Logger manager queue pauser subject
     * @default new Subject<boolean>()
     * @private
     */
    private pauser$: Subject<boolean> = new Subject<boolean>();

    /**
     * @member {Subject<any>} flush$
     * @memberOf LoggerManager
     * @description Logger manager queue flush subject
     * @default new Subject<any>()
     * @private
     */
    private flush$: Subject<any> = new Subject<any>();

    /**
     * @member {Promise<void>} flushed
     * @memberOf LoggerManager
     * @description internal state for when the logs were flushed
     * @private
     */
    private flushedPromise: Promise<void>;

    /**
     * @member {Promise<void>} () => void
     * @memberOf LoggerManager
     * @description a resolver for when the flush promise is fulfilled
     * @private
     */
    private flushPromiseFulfilled: () => void;


    /**
     * @description Initialize new instance of LoggerManager object
     */
    constructor() {
        DebugLogger.d("starting log-manager");

        this.logBulkObs$ = Observable.create(observer => this.addLogStream = observer)
            .do(log => Log.fillDefaultValidValues(log))
            .do(log => {
                if (this.bufferSize >= Constants.MAX_LOG_BUFFER_SIZE) { 
                    this.addLogline(new Log({
                        severity: Severity.warning,
                        text: `Coralogix Logger reached maximum buffer size (${this.bufferSize})`
                    }));
                }
            })
            .filter(log => this.bufferSize < Constants.MAX_LOG_BUFFER_SIZE)
            .do(log => this.bufferSize += sizeof(log))
            .lift(new BufferPredicateOrObservableOperator<Log>(
                buffer => sizeof(buffer) > Constants.MAX_LOG_CHUNK_SIZE,
                Observable.merge(
                    this.flush$,
                    rxHelper.makePausable(Observable.interval(Constants.NORMAL_SEND_SPEED_INTERVAL), this.pauser$),
                )))
            .do(() => this.pauser$.next(false)) // stop the interval until request completed
            .flatMap(buffer => this.sendBulk(buffer)
                .retryWhen(errors$ => this.retryObservable(errors$))
                .finally(() => this.cleanAfterSend(buffer))); // clean buffer and start timer
    }

    /**
     * @method waitForFlush
     * @description waits for all the currently pending to be written to the Coralogix backend
     * @memberOf LoggerManager
     * @public
     * @returns {Promise} returns a promise that settles when all the pending logs have been written
     */
    public waitForFlush(): Promise<void> {
        this.flush();
        if (!this.logStreamSubscription) {
            return Promise.resolve(); // there are no pending logs
        }
        if (!this.flushedPromise) { // there are pending logs - wait for them
            this.flushedPromise = new Promise<void>((resolve) => {
                this.flushPromiseFulfilled = resolve;
            });
        }
        return this.flushedPromise;
    }
    /**
     * @method addLogline
     * @description Add log line to logger manager queue
     * @memberOf LoggerManager
     * @param {Log} log - Log line object instance
     * @public
     */
    public addLogline(log: Log) {
        if (!this.logStreamSubscription) {
            this.subscribe();
        }

        this.addLogStream.next(log);
    }

    /**
     * @method close
     * @description Close logger manager and flush queue
     * @memberOf LoggerManager
     * @public
     */
    public close() {
        this.flush$.next();
    }

    /**
     * @method flush
     * @description Flush logger manager queue
     * @memberOf LoggerManager
     * @public
     */
    public flush() {
        this.flush$.next();
    }

    /**
     * @method subscribe
     * @description Subscribe on logger manager observable events
     * @memberOf LoggerManager
     * @public
     */
    public subscribe() {
        this.logStreamSubscription = this.logBulkObs$.subscribe(
            (res: HTTPResponse) => DebugLogger.d("bulk sent successfully: code " + res.response.statusCode),
            err => DebugLogger.d("failed sending bulk err: ", err));

    }

    /**
     * @method sendBulk
     * @description Send logs buffer to Coralogix
     * @memberOf LoggerManager
     * @param {Log[]} buffer - Logs buffer
     * @private
     */
    private sendBulk(buffer: Log[]) {
        DebugLogger.d("Sending bulk");
        const bulk = Bulk.bulkFromConfig(this.config);
        bulk.logEntries = buffer;

        return HttpHelper.sendBulk(bulk, this.config);
    }

    /**
     * @method cleanAfterSend
     * @description On buffer send completed (success of failed) free the buffer size
     * @memberOf LoggerManager
     * @param {Log[]} sentBuffer - Logs buffer
     * @private
     */
    private cleanAfterSend(sentBuffer: Log[]) {
        const sentSize = sizeof(sentBuffer) - 2;
        this.bufferSize = Math.max(0, this.bufferSize - sentSize);
        if (this.bufferSize <= 0 && this.logStreamSubscription) {
            this.logStreamSubscription.unsubscribe();
            this.logStreamSubscription = null;
            if (this.flushPromiseFulfilled) {
                this.flushPromiseFulfilled();
            }
        }
        DebugLogger.d("clean completed");
        this.pauser$.next(false);
    }

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
    private retryObservable(errors$) {
        return errors$
            .do(err => DebugLogger.d("attempt sending logs failed", err))
            .scan((errorCount, err) => errorCount + 1, 0)
            .do(errorCount => errorCount > Constants.HTTP_SEND_RETRY_COUNT ?
                () => {
                    throw new Error ("max retry attempts exceeded");
                } : DebugLogger.d("retrying (" + errorCount + ")"))
            .delay(Constants.HTTP_SEND_RETRY_INTERVAL);
    }
}
