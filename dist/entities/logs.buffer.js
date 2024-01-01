"use strict";
/**
 * Logger configuration object
 *
 * @file        This file contains logger configuration object description
 * @author      Yoni Farin <farin99@gmail.com>
 * @author      Eldar Aliiev <eldar@coralogix.com>
 * @link        https://coralogix.com/
 * @copyright   Coralogix Ltd.
 * @licence     Apache-2.0
 * @version     1.0.0
 * @since       1.0.0
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogsBuffer = void 0;
/**
 * @name sizeof
 * @constant {function}
 * @default
 */
var sizeof = require("object-sizeof");
/**
 * @class LogsBuffer
 * @classdesc Class LogsBuffer representing logs buffer
 * @description Create new instance of logs buffer class
 * @param {Array<Log>} [logs] - Logs collection
 */
var LogsBuffer = /** @class */ (function () {
    /**
     * @description Create new instance of logs buffer class
     * @param {Array<Log>} [logs] - Logs collection
     */
    function LogsBuffer(logs) {
        this.logs = logs || [];
    }
    Object.defineProperty(LogsBuffer.prototype, "size", {
        /**
         * @method size
         * @description Get size of logs collection
         * @memberOf LogsBuffer
         * @public
         * @returns {number} Size of logs collection
         */
        get: function () {
            return sizeof(this.logs);
        },
        enumerable: false,
        configurable: true
    });
    return LogsBuffer;
}());
exports.LogsBuffer = LogsBuffer;
