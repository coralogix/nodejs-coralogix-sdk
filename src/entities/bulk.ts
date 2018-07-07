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

import {Constants} from "../constants";
import {IPHelper} from "../helpers/ip.helper";
import {Log} from "./log";
import {LoggerConfig} from "./LoggerConfig";

/**
 * @class Bulk
 * @classdesc Class Bulk representing logs bulk container
 * @description Create new instance of logs bulk container class
 */
export class Bulk {
    /**
     * @method bulkFromConfig
     * @description Create logs bulk from configuration
     * @memberOf Bulk
     * @param {LoggerConfig} config  - Logger configuration object
     * @static
     * @public
     * @returns {Bulk} - Logs bulk
     */
    public static bulkFromConfig(config: LoggerConfig): Bulk {
        const bulk = new Bulk();
        bulk.privateKey = config.privateKey || Constants.FAILED_PRIVATE_KEY;
        bulk.applicationName = config.applicationName || Constants.NO_APP_NAME;
        bulk.subsystemName = config.subsystemName || Constants.NO_SUB_SYSTEM;
        return bulk;
    }

    /**
     * @member {string} privateKey
     * @memberOf Bulk
     * @description Coralogix private key
     * @public
     */
    public privateKey: string;

    /**
     * @member {string} applicationName
     * @memberOf Bulk
     * @description Application name
     * @default NO_APP_NAME
     * @public
     */
    public applicationName: string = Constants.NO_APP_NAME;

    /**
     * @member {string} subsystemName
     * @memberOf Bulk
     * @description Subsystem name
     * @default NO_SUB_SYSTEM
     * @public
     */
    public subsystemName: string = Constants.NO_SUB_SYSTEM;

    /**
     * @member {string} computerName
     * @memberOf Bulk
     * @description Computer name
     * @default Current computer name
     * @public
     */
    public computerName: string = IPHelper.getComputerName();

    /**
     * @member {string} IPAddress
     * @memberOf Bulk
     * @description Computer IP-address
     * @default Current computer IP-address
     * @public
     */
    public IPAddress: string = IPHelper.getIp();

    /**
     * @member {Array<Log>} logEntries
     * @memberOf Bulk
     * @description Log entries collection
     * @public
     */
    public logEntries: Array<Log>;
}
