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
"use strict";
var rxjs_1 = require("rxjs");
var constants_1 = require("./constants");
var debug_logger_1 = require("./debug.logger");
var bulk_1 = require("./entities/bulk");
var log_1 = require("./entities/log");
var rx_helper_1 = require("./helpers/rx.helper");
var http_service_1 = require("./http.service");
var buffer_predicate_or_observable_operator_1 = require("./rxOperators/buffer-predicate-or-observable.operator");
/**
 * @name sizeof
 * @constant {function}
 * @default
 */
var sizeof = require("object-sizeof");
/**
 * @class LoggerManager
 * @classdesc Class LoggerManager representing logging queue manager
 * @description Create new instance of logging queue manager
 */
var LoggerManager = (function () {
    /**
     * @description Initialize new instance of LoggerManager object
     */
    function LoggerManager() {
        var _this = this;
        /**
         * @member {number} bufferSize
         * @memberOf LoggerManager
         * @description Logger manager buffer size
         * @default 0
         * @private
         */
        this.bufferSize = 0;
        /**
         * @member {Subject<boolean>} pauser$
         * @memberOf LoggerManager
         * @description Logger manager queue pauser subject
         * @default new Subject<boolean>()
         * @private
         */
        this.pauser$ = new rxjs_1.Subject();
        /**
         * @member {Subject<any>} flush$
         * @memberOf LoggerManager
         * @description Logger manager queue flush subject
         * @default new Subject<any>()
         * @private
         */
        this.flush$ = new rxjs_1.Subject();
        debug_logger_1.DebugLogger.d("starting log-manager");
        this.logBulkObs$ = rxjs_1.Observable.create(function (observer) { return _this.addLogStream = observer; })
            .do(function (log) { return log_1.Log.fillDefaultValidValues(log); })
            .do(function (log) { return _this.bufferSize >= constants_1.Constants.MAX_LOG_BUFFER_SIZE ? debug_logger_1.DebugLogger.d("max logs exceeded, dropping log") : null; })
            .filter(function (log) { return _this.bufferSize < constants_1.Constants.MAX_LOG_BUFFER_SIZE; })
            .do(function (log) { return _this.bufferSize += sizeof(log); })
            .lift(new buffer_predicate_or_observable_operator_1.BufferPredicateOrObservableOperator(function (buffer) { return sizeof(buffer) > constants_1.Constants.MAX_LOG_CHUNK_SIZE; }, rxjs_1.Observable.merge(this.flush$, rx_helper_1.rxHelper.makePausable(rxjs_1.Observable.interval(constants_1.Constants.NORMAL_SEND_SPEED_INTERVAL), this.pauser$))))
            .do(function () { return _this.pauser$.next(false); }) // stop the interval until request completed
            .flatMap(function (buffer) { return _this.sendBulk(buffer)
            .retryWhen(function (errors$) { return _this.retryObservable(errors$); })
            .finally(function () { return _this.cleanAfterSend(buffer); }); }); // clean buffer and start timer
    }
    /**
     * @method waitForFlush
     * @description waits for all the currently pending to be written to the Coralogix backend
     * @memberOf LoggerManager
     * @public
     * @returns {Promise} returns a promise that settles when all the pending logs have been written
     */
    LoggerManager.prototype.waitForFlush = function () {
        var _this = this;
        this.flush();
        if (!this.logStreamSubscription) {
            return Promise.resolve(); // there are no pending logs
        }
        if (!this.flushedPromise) {
            this.flushedPromise = new Promise(function (resolve) {
                _this.flushPromiseFulfilled = resolve;
            });
        }
        return this.flushedPromise;
    };
    /**
     * @method addLogline
     * @description Add log line to logger manager queue
     * @memberOf LoggerManager
     * @param {Log} log - Log line object instance
     * @public
     */
    LoggerManager.prototype.addLogline = function (log) {
        if (!this.logStreamSubscription) {
            this.subscribe();
        }
        this.addLogStream.next(log);
    };
    /**
     * @method close
     * @description Close logger manager and flush queue
     * @memberOf LoggerManager
     * @public
     */
    LoggerManager.prototype.close = function () {
        this.flush$.next();
    };
    /**
     * @method flush
     * @description Flush logger manager queue
     * @memberOf LoggerManager
     * @public
     */
    LoggerManager.prototype.flush = function () {
        this.flush$.next();
    };
    /**
     * @method subscribe
     * @description Subscribe on logger manager observable events
     * @memberOf LoggerManager
     * @public
     */
    LoggerManager.prototype.subscribe = function () {
        this.logStreamSubscription = this.logBulkObs$.subscribe(function (res) { return debug_logger_1.DebugLogger.d("bulk sent successfully: code " + res.response.statusCode); }, function (err) { return debug_logger_1.DebugLogger.d("failed sending bulk err: ", err); });
    };
    /**
     * @method sendBulk
     * @description Send logs buffer to Coralogix
     * @memberOf LoggerManager
     * @param {Log[]} buffer - Logs buffer
     * @private
     */
    LoggerManager.prototype.sendBulk = function (buffer) {
        debug_logger_1.DebugLogger.d("Sending bulk");
        var bulk = bulk_1.Bulk.bulkFromConfig(this.config);
        bulk.logEntries = buffer;
        return http_service_1.HttpHelper.sendBulk(bulk, this.config);
    };
    /**
     * @method cleanAfterSend
     * @description On buffer send completed (success of failed) free the buffer size
     * @memberOf LoggerManager
     * @param {Log[]} sentBuffer - Logs buffer
     * @private
     */
    LoggerManager.prototype.cleanAfterSend = function (sentBuffer) {
        var sentSize = sizeof(sentBuffer) - 2;
        this.bufferSize = Math.max(0, this.bufferSize - sentSize);
        if (this.bufferSize <= 0 && this.logStreamSubscription) {
            this.logStreamSubscription.unsubscribe();
            this.logStreamSubscription = null;
            if (this.flushPromiseFulfilled) {
                this.flushPromiseFulfilled();
            }
        }
        debug_logger_1.DebugLogger.d("clean completed");
        this.pauser$.next(false);
    };
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
    LoggerManager.prototype.retryObservable = function (errors$) {
        return errors$
            .do(function (err) { return debug_logger_1.DebugLogger.d("attempt sending logs failed", err); })
            .scan(function (errorCount, err) { return errorCount + 1; }, 0)
            .do(function (errorCount) { return errorCount > constants_1.Constants.HTTP_SEND_RETRY_COUNT ?
            function () {
                throw new Error("max retry attempts exceeded");
            } : debug_logger_1.DebugLogger.d("retrying (" + errorCount + ")"); })
            .delay(constants_1.Constants.HTTP_SEND_RETRY_INTERVAL);
    };
    return LoggerManager;
}());
exports.LoggerManager = LoggerManager;
