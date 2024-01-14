"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoggerManager = void 0;
var rxjs_1 = require("rxjs");
var constants_1 = require("./constants");
var debug_logger_1 = require("./debug.logger");
var bulk_1 = require("./entities/bulk");
var log_1 = require("./entities/log");
var http_service_1 = require("./http.service");
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
var LoggerManager = /** @class */ (function () {
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
        this.logBulkObs$ = rxjs_1.Observable.create(function (observer) { return _this.addLogStream = observer; }).pipe((0, rxjs_1.tap)(function (log) {
            debug_logger_1.DebugLogger.d("tap1");
            return log_1.Log.fillDefaultValidValues(log);
        }), (0, rxjs_1.tap)(function (log) {
            debug_logger_1.DebugLogger.d("tap2");
            _this.bufferSize >= constants_1.Constants.MAX_LOG_BUFFER_SIZE ? debug_logger_1.DebugLogger.d("max logs exceeded, dropping log") : null;
        }), (0, rxjs_1.filter)(function (log) { return _this.bufferSize < constants_1.Constants.MAX_LOG_BUFFER_SIZE; }), (0, rxjs_1.tap)(function (log) { return _this.bufferSize += sizeof(log); }), (0, rxjs_1.bufferTime)(constants_1.Constants.NORMAL_SEND_SPEED_INTERVAL, undefined, constants_1.Constants.MAX_LOG_CHUNK_SIZE, undefined))
            .pipe((0, rxjs_1.tap)(function () { return _this.pauser$.next(false); }), // stop the interval until request completed
        (0, rxjs_1.flatMap)(function (buffer) { return _this.sendBulk(buffer)
            .pipe((0, rxjs_1.retryWhen)(function (errors$) { return _this.retryObservable(errors$); }), (0, rxjs_1.finalize)(function () { return _this.cleanAfterSend(buffer); }) // clean buffer and start timer
        ); }));
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
        if (!this.flushedPromise) { // there are pending logs - wait for them
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
        this.flush$.next(undefined);
    };
    /**
     * @method flush
     * @description Flush logger manager queue
     * @memberOf LoggerManager
     * @public
     */
    LoggerManager.prototype.flush = function () {
        this.flush$.next(undefined);
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
     * @method retryObservable
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
        return errors$.pipe((0, rxjs_1.tap)(function (err) { return debug_logger_1.DebugLogger.d("attempt sending logs failed", err); }), (0, rxjs_1.scan)(function (errorCount, _) { return errorCount + 1; }, 0), (0, rxjs_1.tap)(function (errorCount) { return errorCount > constants_1.Constants.HTTP_SEND_RETRY_COUNT ?
            function () {
                throw new Error("max retry attempts exceeded");
            } : debug_logger_1.DebugLogger.d("retrying (" + errorCount + ")"); }), (0, rxjs_1.delay)(constants_1.Constants.HTTP_SEND_RETRY_INTERVAL));
    };
    return LoggerManager;
}());
exports.LoggerManager = LoggerManager;
