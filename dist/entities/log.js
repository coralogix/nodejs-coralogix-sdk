/**
 * Log record instance
 *
 * @file        This file contains log record object description
 * @author      Yoni Farin <farin99@gmail.com>
 * @author      Eldar Aliiev <eldar@coralogix.com>
 * @link        https://coralogix.com/
 * @copyright   Coralogix Ltd.
 * @licence     Apache-2.0
 * @version     1.0.0
 * @since       1.0.0
 */
"use strict";
var constants_1 = require("../constants");
var stringify = require("json-stringify-safe");
/**
 * @class Log
 * @classdesc Class Log representing log record container
 * @description Create new instance of log record container class
 * @param {object} [data] - Log record data
 */
var Log = (function () {
    /**
     * @description Initialize new instance of log record container class
     * @param {object} [data] - Log record data
     */
    function Log(data) {
        this.timestamp = Date.now();
        if (!data) {
            return;
        }
        if (data.timestamp) {
            this.timestamp = data.timestamp;
        }
        this.threadId = data.threadId;
        this.severity = data.severity;
        this.category = data.category;
        this.className = data.className;
        this.methodName = data.methodName;
        this.text = data.text;
    }
    /**
     * @method fillDefaultValidValues
     * @description Fill object fields with possible default values
     * @memberOf Log
     * @param {Log} log - Log line object instance
     * @static
     * @public
     */
    Log.fillDefaultValidValues = function (log) {
        if (log.severity > Severity.critical || log.severity < Severity.debug) {
            log.severity = Severity.debug;
        }
        log.severity = log.severity || Severity.debug;
        log.category = log.category || constants_1.Constants.EMPTY_CATEGORY;
        var text = null;
        if (log.text !== null && (typeof log.text) !== "string") {
            text = stringify(log.text);
        }
        else {
            text = log.text || constants_1.Constants.EMPTY_TEXT;
        }
        log.text = text;
    };
    return Log;
}());
exports.Log = Log;
/**
 * @enum {number}
 * @description Log record severity list
 * @readonly
 */
var Severity;
(function (Severity) {
    Severity[Severity["debug"] = 1] = "debug";
    Severity[Severity["verbose"] = 2] = "verbose";
    Severity[Severity["info"] = 3] = "info";
    Severity[Severity["warning"] = 4] = "warning";
    Severity[Severity["error"] = 5] = "error";
    Severity[Severity["critical"] = 6] = "critical";
})(Severity = exports.Severity || (exports.Severity = {}));
