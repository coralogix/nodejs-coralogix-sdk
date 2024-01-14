"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.rxHelper = void 0;
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
        return rxjs_1.Observable.create(pauser).pipe((0, rxjs_1.startWith)(false), (0, rxjs_1.switchMap)(function (pause) { return pause ? rxjs_1.NEVER : source; }));
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
        return rxjs_1.Observable.create(restarter).pipe((0, rxjs_1.startWith)(true), (0, rxjs_1.switchMapTo)(source));
    }
    rxHelper.makeReset = makeReset;
})(rxHelper || (exports.rxHelper = rxHelper = {}));
