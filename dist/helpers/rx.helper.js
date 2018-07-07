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
"use strict";
var rxjs_1 = require("rxjs");
/**
 * @namespace rxHelper
 * @description Helper methods for RxJS
 */
var rxHelper;
(function (rxHelper) {
    /**
     * @function makePausable
     * @description Make observable pauser object
     * @memberOf rxHelper
     * @param source    - Source
     * @param pauser    - Pauser
     * @returns {Observable} Observable pauser object
     */
    function makePausable(source, pauser) {
        return rxjs_1.Observable.from(pauser)
            .startWith(false)
            .switchMap(function (pause) { return pause ? rxjs_1.Observable.never() : source; });
    }
    rxHelper.makePausable = makePausable;
    /**
     * @function makeReset
     * @description Make observable restarter object
     * @memberOf rxHelper
     * @param source    - Source
     * @param restarter - Restarter
     * @returns {Observable} Observable restarter object
     */
    function makeReset(source, restarter) {
        return rxjs_1.Observable.from(restarter)
            .startWith(true)
            .switchMapTo(source);
    }
    rxHelper.makeReset = makeReset;
})(rxHelper = exports.rxHelper || (exports.rxHelper = {}));
