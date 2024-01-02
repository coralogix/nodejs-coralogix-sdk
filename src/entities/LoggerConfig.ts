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

import {AxiosBasicCredentials, AxiosProxyConfig} from "axios";
import {Constants} from "../constants";
import {IPHelper} from "../helpers/ip.helper";

/**
 * @class LoggerConfig
 * @classdesc Class LoggerConfig representing logger configuration container
 * @description Create new instance of logger configuration container class
 * @param {object} [config] - Logger configuration parameters
 */
export class LoggerConfig {
    /**
     * @member {string} privateKey
     * @memberOf LoggerConfig
     * @description Coralogix account private key
     * @default FAILED_PRIVATE_KEY
     * @public
     */
    public privateKey: string = Constants.FAILED_PRIVATE_KEY;

    /**
     * @member {string} applicationName
     * @memberOf LoggerConfig
     * @description Application name
     * @default NO_APP_NAME
     * @public
     */
    public applicationName: string = Constants.NO_APP_NAME;

    /**
     * @member {string} subsystemName
     * @memberOf LoggerConfig
     * @description Subsystem name
     * @default NO_SUB_SYSTEM
     * @public
     */
    public subsystemName: string = Constants.NO_SUB_SYSTEM;

    /**
     * @member {string} computerName
     * @memberOf LoggerConfig
     * @description Computer name
     * @default Current computer name
     * @public
     */
    public computerName: string = IPHelper.getComputerName();

    /**
     * @member {boolean} debug
     * @memberOf LoggerConfig
     * @description Debug mode
     * @default false
     * @public
     */
    public debug: boolean = false;

    /**
     * @member {AxiosProxyConfig|undefined} proxyUri
     * @memberOf LoggerConfig
     * @description Proxy uri
     * @default undefined
     * @public
     */
    public proxyUri?: AxiosProxyConfig;

    private getAxioProxyConfig(proxyUri?: string): AxiosProxyConfig | undefined {
      if (proxyUri) {
        const proxyURL = new URL(proxyUri)
        const axioAuth: AxiosBasicCredentials = proxyURL.username ? ({username: proxyURL.username, password: proxyURL.password}) : null;
        const proxyConfig: AxiosProxyConfig = {
          host: proxyURL.hostname,
          port: Number.parseInt(proxyURL.port),
          auth: axioAuth,
          protocol: proxyURL.protocol.slice(0, -1)
        }
        return proxyConfig
      }
    }
    /**
     * @description Initialize new instance of logger configuration container class
     * @param {object} [config] - Logger configuration parameters
     */
    constructor(config?) {
        this.privateKey = config.privateKey || this.privateKey;
        this.applicationName = config.applicationName || this.applicationName;
        this.subsystemName = config.subsystemName || this.subsystemName;
        this.computerName = config.computerName || this.computerName;
        this.debug = config.debug;
        this.proxyUri = this.getAxioProxyConfig(config.proxyUri);
    }
}
