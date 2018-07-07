/**
 * @class Log
 * @classdesc Class Log representing log record container
 * @description Create new instance of log record container class
 * @param {object} [data] - Log record data
 */
export declare class Log {
    /**
     * @method fillDefaultValidValues
     * @description Fill object fields with possible default values
     * @memberOf Log
     * @param {Log} log - Log line object instance
     * @static
     * @public
     */
    static fillDefaultValidValues(log: Log): void;
    /**
     * @member {number} timestamp
     * @memberOf Log
     * @description Log record timestamp
     * @public
     */
    timestamp: number;
    /**
     * @member {string} [threadId]
     * @memberOf Log
     * @description ID of current thread
     * @public
     */
    threadId?: string;
    /**
     * @member {Severity} severity
     * @memberOf Log
     * @description Log record severity level
     * @public
     */
    severity: Severity;
    /**
     * @member {string} category
     * @memberOf Log
     * @description Log record category
     * @public
     */
    category: string;
    /**
     * @member {string} [className]
     * @memberOf Log
     * @description Name of class from where log was sent
     * @public
     */
    className?: string;
    /**
     * @member {string} [methodName]
     * @memberOf Log
     * @description Name of method from where log was sent
     * @public
     */
    methodName?: string;
    /**
     * @member {any} text
     * @memberOf Log
     * @description Text of log record
     * @public
     */
    text: any;
    /**
     * @description Initialize new instance of log record container class
     * @param {object} [data] - Log record data
     */
    constructor(data?: any);
}
/**
 * @enum {number}
 * @description Log record severity list
 * @readonly
 */
export declare enum Severity {
    debug = 1,
    verbose = 2,
    info = 3,
    warning = 4,
    error = 5,
    critical = 6,
}
