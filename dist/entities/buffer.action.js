/**
 * Buffer Action instance
 *
 * @file        This file contains buffer action object description
 * @author      Yoni Farin <farin99@gmail.com>
 * @author      Eldar Aliiev <eldar@coralogix.com>
 * @link        https://coralogix.com/
 * @copyright   Coralogix Ltd.
 * @licence     Apache-2.0
 * @version     1.0.0
 * @since       1.0.0
 */
"use strict";
/**
 * @class BufferAction
 * @classdesc Class BufferAction representing buffer action container
 * @description Create new instance of buffer action container class
 * @param {string} type - Type of action
 * @param {Log} payload - Action payload data
 */
var BufferAction = (function () {
    /**
     * @description Initialize new instance of buffer action container class
     * @param {string} type - Type of action
     * @param {Log} payload - Action payload data
     */
    function BufferAction(type, payload) {
        this.type = type;
        this.payload = payload;
    }
    return BufferAction;
}());
exports.BufferAction = BufferAction;
