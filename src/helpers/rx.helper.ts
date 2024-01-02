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

import {Observable} from "rxjs-compat";

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
    export function makePausable(source, pauser) {
        return Observable.from(pauser)
            .startWith(false)
            .switchMap(pause => pause ? Observable.never() : source);
    }

    /**
     * @function makeReset
     * @description Make observable restarter object
     * @memberOf rxHelper
     * @param source    - Source
     * @param restarter - Restarter
     * @returns {Observable} Observable restarter object
     */
    export function makeReset(source, restarter) {
        return Observable.from(restarter)
            .startWith(true)
            .switchMapTo(source);
    }
}
