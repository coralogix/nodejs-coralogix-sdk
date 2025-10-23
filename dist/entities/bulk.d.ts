/**
 * Log records bulk
 *
 * @file        This file contains log records bulk container
 * @author      Yoni Farin <farin99@gmail.com>
 * @author      Eldar Aliiev <eldar@coralogix.com>
 * @link        https://coralogix.com/
 * @copyright   Coralogix Ltd.
 * @licence     Apache-2.0
 * @version     1.0.0
 * @since       1.0.0
 */
import { Log } from "./log";
import { LoggerConfig } from "./LoggerConfig";
/**
 * @class Bulk
 * @classdesc Class Bulk representing logs bulk container
 * @description Create new instance of logs bulk container class
 */
export declare class Bulk {
    /**
     * @method bulkFromConfig
     * @description Create logs bulk from configuration
     * @memberOf Bulk
     * @param {LoggerConfig} config  - Logger configuration object
     * @static
     * @public
     * @returns {Bulk} - Logs bulk
     */
    static bulkFromConfig(config: LoggerConfig): Bulk;
    /**
     * @member {string} applicationName
     * @memberOf Bulk
     * @description Application name
     * @default NO_APP_NAME
     * @public
     */
    applicationName: string;
    /**
     * @member {string} subsystemName
     * @memberOf Bulk
     * @description Subsystem name
     * @default NO_SUB_SYSTEM
     * @public
     */
    subsystemName: string;
    /**
     * @member {string} computerName
     * @memberOf Bulk
     * @description Computer name
     * @default Current computer name
     * @public
     */
    computerName: string;
    /**
     * @member {string} IPAddress
     * @memberOf Bulk
     * @description Computer IP-address
     * @default Current computer IP-address
     * @public
     */
    IPAddress: string;
    /**
     * @member {Array<Log>} logEntries
     * @memberOf Bulk
     * @description Log entries collection
     * @public
     */
    logEntries: Array<Log>;
}
