/**
 * Buffer operators
 *
 * @file        This file contains logs buffer operators
 * @author      Yoni Farin <farin99@gmail.com>
 * @author      Eldar Aliiev <eldar@coralogix.com>
 * @link        https://coralogix.com/
 * @copyright   Coralogix Ltd.
 * @licence     Apache-2.0
 * @version     1.0.0
 * @since       1.0.0
 */
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var OuterSubscriber_1 = require("rxjs/OuterSubscriber");
var subscribeToResult_1 = require("rxjs/util/subscribeToResult");
/**
 * @class BufferPredicateOrObservableOperator
 * @classdesc Class BufferPredicateOrObservableOperator representing operator that check if
 *            buffer is predicate or observable
 * @description Create new instance of BufferPredicateOrObservableOperator class
 * @implements {Operator}
 * @param {BufferPredicate<T>} predicate    - Predicate
 * @param {Observable<any>} closingNotifier - Notify before closing
 */
var BufferPredicateOrObservableOperator = (function () {
    /**
     * @description Initialize new instance of BufferPredicateOrObservableOperator class
     * @param {BufferPredicate<T>} predicate    - Predicate
     * @param {Observable<any>} closingNotifier - Notify before closing
     */
    function BufferPredicateOrObservableOperator(predicate, closingNotifier) {
        this.predicate = predicate;
        this.closingNotifier = closingNotifier;
    }
    /**
     * @method call
     * @description Call operator
     * @memberOf BufferPredicateOrObservableOperator
     * @param {Subscriber<T[]>} subscriber  - Subscriber
     * @param {any} source                  - Source
     * @public
     * @returns {any} Result of checking
     */
    BufferPredicateOrObservableOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new BufferPredicateOrObservable(subscriber, this.predicate, this.closingNotifier));
    };
    return BufferPredicateOrObservableOperator;
}());
exports.BufferPredicateOrObservableOperator = BufferPredicateOrObservableOperator;
/**
 * @class BufferPredicateOrObservable
 * @classdesc Class BufferPredicateOrObservable representing buffer predicator class
 * @description Create new instance of BufferPredicateOrObservable class
 * @extends {OuterSubscriber}
 * @param {Subscriber<T[]>} destination     - Destination
 * @param {BufferPredicate<T>} predicate    - Predicate
 * @param {Observable<any>} closingNotifier - Notify before closing
 */
var BufferPredicateOrObservable = (function (_super) {
    __extends(BufferPredicateOrObservable, _super);
    /**
     * @description Initialize new instance of BufferPredicateOrObservable class
     * @param {Subscriber<T[]>} destination     - Destination
     * @param {BufferPredicate<T>} predicate    - Predicate
     * @param {Observable<any>} closingNotifier - Notify before closing
     */
    function BufferPredicateOrObservable(destination, predicate, closingNotifier) {
        var _this = _super.call(this, destination) || this;
        _this.predicate = predicate;
        /**
         * @member {T[]} buffer
         * @memberOf BufferPredicateOrObservable
         * @description Buffer container
         * @private
         * @default []
         */
        _this.buffer = [];
        _this.add(subscribeToResult_1.subscribeToResult(_this, closingNotifier));
        return _this;
    }
    /**
     * @method notifyNext
     * @description Create notify text
     * @memberOf BufferPredicateOrObservable
     * @param {T} outerValue                        - Outer value
     * @param {any} innerValue                      - Inner value
     * @param {number} outerIndex                   - Outer index
     * @param {number} innerIndex                   - Inner index
     * @param {InnerSubscriber<T, any>} innerSub    - Inner sub
     */
    BufferPredicateOrObservable.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
        this.emitBuffer();
    };
    /**
     * @method _next
     * @description Push value to buffer
     * @memberOf BufferPredicateOrObservable
     * @param {T} value - Value to push
     * @protected
     */
    BufferPredicateOrObservable.prototype._next = function (value) {
        this.buffer.push(value);
        if (this.predicate(this.buffer)) {
            this.emitBuffer();
        }
    };
    /**
     * @method emitBuffer
     * @description Emit buffer
     * @memberOf BufferPredicateOrObservable
     * @private
     */
    BufferPredicateOrObservable.prototype.emitBuffer = function () {
        // If buffer is empty, skip
        if (this.buffer.length < 1) {
            return;
        }
        var buffer = this.buffer;
        this.buffer = [];
        this.destination.next(buffer);
    };
    return BufferPredicateOrObservable;
}(OuterSubscriber_1.OuterSubscriber));
exports.BufferPredicateOrObservable = BufferPredicateOrObservable;
