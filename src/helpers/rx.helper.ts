/**
 * rxHelper functions
 *
 * @file        This file contains helper functions for RxJS
 * @author      Yoni Farin <farin99@gmail.com>
 * @author      Eldar Aliiev <eldar@coralogix.com>
 * @link        https://coralogix.com/
 * @copyright   Coralogix Ltd.
 * @licence     Apache-2.0
 * @version     1.0.0
 * @since       1.0.0
 */

import { Observable, Subject, NEVER, startWith, switchMap, switchMapTo } from "rxjs";
/**
 * @namespace rxHelper
 * @description Helper methods for RxJS
 */
export namespace rxHelper {
    /**
     * @function makePausable
     * @description Make observable pauser object
     * @memberOf rxHelper
     * @param source    - Source
     * @param pauser    - Pauser
     * @returns {Observable} Observable pauser object
     */
    export function makePausable<S, P>(source: Observable<S>, pauser: Subject<P>) {
        return Observable.create(pauser).pipe(
          startWith(false),
          switchMap(pause => pause ? NEVER : source)
        );
    }

    /**
     * @function makeReset
     * @description Make observable restarter object
     * @memberOf rxHelper
     * @param source    - Source
     * @param restarter - Restarter
     * @returns {Observable} Observable restarter object
     */
    export function makeReset(source, restarter): Observable<unknown> {
        return Observable.create(restarter).pipe(
            startWith(true),
            switchMapTo(source)
        );
    }
}
