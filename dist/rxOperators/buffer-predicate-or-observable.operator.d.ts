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
import { Observable, Operator, Subscriber } from "rxjs";
import { InnerSubscriber } from "rxjs/InnerSubscriber";
import { OuterSubscriber } from "rxjs/OuterSubscriber";
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
export declare class BufferPredicateOrObservableOperator<T> implements Operator<T, T[]> {
    private predicate;
    private closingNotifier;
    /**
     * @description Initialize new instance of BufferPredicateOrObservableOperator class
     * @param {BufferPredicate<T>} predicate    - Predicate
     * @param {Observable<any>} closingNotifier - Notify before closing
     */
    constructor(predicate: BufferPredicate<T>, closingNotifier: Observable<any>);
    /**
     * @method call
     * @description Call operator
     * @memberOf BufferPredicateOrObservableOperator
     * @param {Subscriber<T[]>} subscriber  - Subscriber
     * @param {any} source                  - Source
     * @public
     * @returns {any} Result of checking
     */
    call(subscriber: Subscriber<T[]>, source: any): any;
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
export declare class BufferPredicateOrObservable<T> extends OuterSubscriber<T, any> {
    private predicate;
    /**
     * @member {T[]} buffer
     * @memberOf BufferPredicateOrObservable
     * @description Buffer container
     * @private
     * @default []
     */
    private buffer;
    /**
     * @description Initialize new instance of BufferPredicateOrObservable class
     * @param {Subscriber<T[]>} destination     - Destination
     * @param {BufferPredicate<T>} predicate    - Predicate
     * @param {Observable<any>} closingNotifier - Notify before closing
     */
    constructor(destination: Subscriber<T[]>, predicate: BufferPredicate<T>, closingNotifier: Observable<any>);
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
    notifyNext(outerValue: T, innerValue: any, outerIndex: number, innerIndex: number, innerSub: InnerSubscriber<T, any>): void;
    /**
     * @method _next
     * @description Push value to buffer
     * @memberOf BufferPredicateOrObservable
     * @param {T} value - Value to push
     * @protected
     */
    protected _next(value: T): void;
    /**
     * @method emitBuffer
     * @description Emit buffer
     * @memberOf BufferPredicateOrObservable
     * @private
     */
    private emitBuffer();
}
