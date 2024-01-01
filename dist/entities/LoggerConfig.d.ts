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
import { AxiosProxyConfig } from "axios";
/**
 * @class LoggerConfig
 * @classdesc Class LoggerConfig representing logger configuration container
 * @description Create new instance of logger configuration container class
 * @param {object} [config] - Logger configuration parameters
 */
export declare class LoggerConfig {
    /**
     * @member {string} privateKey
     * @memberOf LoggerConfig
     * @description Coralogix account private key
     * @default FAILED_PRIVATE_KEY
     * @public
     */
    privateKey: string;
    /**
     * @member {string} applicationName
     * @memberOf LoggerConfig
     * @description Application name
     * @default NO_APP_NAME
     * @public
     */
    applicationName: string;
    /**
     * @member {string} subsystemName
     * @memberOf LoggerConfig
     * @description Subsystem name
     * @default NO_SUB_SYSTEM
     * @public
     */
    subsystemName: string;
    /**
     * @member {string} computerName
     * @memberOf LoggerConfig
     * @description Computer name
     * @default Current computer name
     * @public
     */
    computerName: string;
    /**
     * @member {boolean} debug
     * @memberOf LoggerConfig
     * @description Debug mode
     * @default false
     * @public
     */
    debug: boolean;
    /**
     * @member {AxiosProxyConfig|undefined} proxyUri
     * @memberOf LoggerConfig
     * @description Proxy uri
     * @default undefined
     * @public
     */
    proxyUri?: AxiosProxyConfig;
    private getAxioProxyConfig;
    /**
     * @description Initialize new instance of logger configuration container class
     * @param {object} [config] - Logger configuration parameters
     */
    constructor(config?: any);
}
