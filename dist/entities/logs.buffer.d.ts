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
import { Log } from "./log";
/**
 * @class LogsBuffer
 * @classdesc Class LogsBuffer representing logs buffer
 * @description Create new instance of logs buffer class
 * @param {Array<Log>} [logs] - Logs collection
 */
export declare class LogsBuffer {
    /**
     * @method size
     * @description Get size of logs collection
     * @memberOf LogsBuffer
     * @public
     * @returns {number} Size of logs collection
     */
    readonly size: number;
    /**
     * @member {Array<Log>} logs
     * @memberOf LoggerConfig
     * @description Logs collection
     * @public
     */
    logs: Array<Log>;
    /**
     * @description Create new instance of logs buffer class
     * @param {Array<Log>} [logs] - Logs collection
     */
    constructor(logs?: Array<Log>);
}
