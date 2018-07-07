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
import { Observable } from "rxjs";
/**
 * @namespace rxHelper
 * @description Helper methods for RxJS
 */
export declare namespace rxHelper {
    /**
     * @function makePausable
     * @description Make observable pauser object
     * @memberOf rxHelper
     * @param source    - Source
     * @param pauser    - Pauser
     * @returns {Observable} Observable pauser object
     */
    function makePausable(source: any, pauser: any): Observable<{}>;
    /**
     * @function makeReset
     * @description Make observable restarter object
     * @memberOf rxHelper
     * @param source    - Source
     * @param restarter - Restarter
     * @returns {Observable} Observable restarter object
     */
    function makeReset(source: any, restarter: any): Observable<{}>;
}
