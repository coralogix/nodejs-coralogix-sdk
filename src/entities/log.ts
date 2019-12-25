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

import {Constants} from "../constants";

const stringify = require("json-stringify-safe");

/**
 * @class Log
 * @classdesc Class Log representing log record container
 * @description Create new instance of log record container class
 * @param {object} [data] - Log record data
 */
export class Log {
    /**
     * @method fillDefaultValidValues
     * @description Fill object fields with possible default values
     * @memberOf Log
     * @param {Log} log - Log line object instance
     * @static
     * @public
     */
    public static fillDefaultValidValues(log: Log) {
        if (log.severity > Severity.critical || log.severity < Severity.debug) {
            log.severity = Severity.debug;
        }
        log.severity = log.severity || Severity.debug;
        log.category = log.category || Constants.EMPTY_CATEGORY;

        let text = null;
        if (log.text !== null && (typeof log.text) !== "string") {
            text = stringify(log.text);
        } else {
            text = log.text || Constants.EMPTY_TEXT;
        }

        log.text = text;
    }

    /**
     * @member {number} timestamp
     * @memberOf Log
     * @description Log record timestamp
     * @public
     */
    public timestamp: number;

    /**
     * @member {string} [threadId]
     * @memberOf Log
     * @description ID of current thread
     * @public
     */
    public threadId?: string;

    /**
     * @member {Severity} severity
     * @memberOf Log
     * @description Log record severity level
     * @public
     */
    public severity: Severity;

    /**
     * @member {string} category
     * @memberOf Log
     * @description Log record category
     * @public
     */
    public category: string;

    /**
     * @member {string} [className]
     * @memberOf Log
     * @description Name of class from where log was sent
     * @public
     */
    public className?: string;

    /**
     * @member {string} [methodName]
     * @memberOf Log
     * @description Name of method from where log was sent
     * @public
     */
    public methodName?: string;

    /**
     * @member {any} text
     * @memberOf Log
     * @description Text of log record
     * @public
     */
    public text: any;

    /**
     * @description Initialize new instance of log record container class
     * @param {object} [data] - Log record data
     */
    constructor(data?) {
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
}

/**
 * @enum {number}
 * @description Log record severity list
 * @readonly
 */
export enum Severity {
    debug = 1,
    verbose = 2,
    info = 3,
    warning = 4,
    error = 5,
    critical = 6,
}
