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

import {Observable, Operator, Subscriber} from "rxjs";
import {InnerSubscriber} from "rxjs/InnerSubscriber";
import {OuterSubscriber} from "rxjs/OuterSubscriber";
import {subscribeToResult} from "rxjs/util/subscribeToResult";

/**
 * @interface BufferPredicate
 * @description Buffer predicate interface
 */
export interface BufferPredicate<T> {
    /**
     * @member {boolean} buffer
     * @memberOf BufferPredicate
     * @description Buffer container
     */
    (buffer: T[]): boolean;
}

/**
 * @class BufferPredicateOrObservableOperator
 * @classdesc Class BufferPredicateOrObservableOperator representing operator that check if
 *            buffer is predicate or observable
 * @description Create new instance of BufferPredicateOrObservableOperator class
 * @implements {Operator}
 * @param {BufferPredicate<T>} predicate    - Predicate
 * @param {Observable<any>} closingNotifier - Notify before closing
 */
export class BufferPredicateOrObservableOperator<T> implements Operator<T, T[]> {
    /**
     * @description Initialize new instance of BufferPredicateOrObservableOperator class
     * @param {BufferPredicate<T>} predicate    - Predicate
     * @param {Observable<any>} closingNotifier - Notify before closing
     */
    constructor(private predicate: BufferPredicate<T>, private closingNotifier: Observable<any>) {}

    /**
     * @method call
     * @description Call operator
     * @memberOf BufferPredicateOrObservableOperator
     * @param {Subscriber<T[]>} subscriber  - Subscriber
     * @param {any} source                  - Source
     * @public
     * @returns {any} Result of checking
     */
    public call(subscriber: Subscriber<T[]>, source: any): any {
        return source.subscribe(new BufferPredicateOrObservable(subscriber, this.predicate, this.closingNotifier));
    }
}

/**
 * @class BufferPredicateOrObservable
 * @classdesc Class BufferPredicateOrObservable representing buffer predicator class
 * @description Create new instance of BufferPredicateOrObservable class
 * @extends {OuterSubscriber}
 * @param {Subscriber<T[]>} destination     - Destination
 * @param {BufferPredicate<T>} predicate    - Predicate
 * @param {Observable<any>} closingNotifier - Notify before closing
 */
export class BufferPredicateOrObservable<T> extends OuterSubscriber<T, any> {
    /**
     * @member {T[]} buffer
     * @memberOf BufferPredicateOrObservable
     * @description Buffer container
     * @private
     * @default []
     */
    private buffer: T[] = [];

    /**
     * @description Initialize new instance of BufferPredicateOrObservable class
     * @param {Subscriber<T[]>} destination     - Destination
     * @param {BufferPredicate<T>} predicate    - Predicate
     * @param {Observable<any>} closingNotifier - Notify before closing
     */
    constructor(destination: Subscriber<T[]>, private predicate: BufferPredicate<T>, closingNotifier: Observable<any>) {
        super(destination);
        this.add(subscribeToResult(this, closingNotifier));
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
    public notifyNext(outerValue: T, innerValue: any,
                      outerIndex: number, innerIndex: number,
                      innerSub: InnerSubscriber<T, any>): void {
        this.emitBuffer();
    }

    /**
     * @method _next
     * @description Push value to buffer
     * @memberOf BufferPredicateOrObservable
     * @param {T} value - Value to push
     * @protected
     */
    protected _next(value: T) {
        this.buffer.push(value);
        if (this.predicate(this.buffer)) {
            this.emitBuffer();
        }
    }

    /**
     * @method emitBuffer
     * @description Emit buffer
     * @memberOf BufferPredicateOrObservable
     * @private
     */
    private emitBuffer() {
        // If buffer is empty, skip
        if (this.buffer.length < 1) {
            return;
        }

        const buffer = this.buffer;
        this.buffer = [];
        this.destination.next(buffer);
    }
}
