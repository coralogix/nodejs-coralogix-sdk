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
"use strict";
var constants_1 = require("../constants");
var ip_helper_1 = require("../helpers/ip.helper");
/**
 * @class LoggerConfig
 * @classdesc Class LoggerConfig representing logger configuration container
 * @description Create new instance of logger configuration container class
 * @param {object} [config] - Logger configuration parameters
 */
var LoggerConfig = (function () {
    /**
     * @description Initialize new instance of logger configuration container class
     * @param {object} [config] - Logger configuration parameters
     */
    function LoggerConfig(config) {
        /**
         * @member {string} privateKey
         * @memberOf LoggerConfig
         * @description Coralogix account private key
         * @default FAILED_PRIVATE_KEY
         * @public
         */
        this.privateKey = constants_1.Constants.FAILED_PRIVATE_KEY;
        /**
         * @member {string} applicationName
         * @memberOf LoggerConfig
         * @description Application name
         * @default NO_APP_NAME
         * @public
         */
        this.applicationName = constants_1.Constants.NO_APP_NAME;
        /**
         * @member {string} subsystemName
         * @memberOf LoggerConfig
         * @description Subsystem name
         * @default NO_SUB_SYSTEM
         * @public
         */
        this.subsystemName = constants_1.Constants.NO_SUB_SYSTEM;
        /**
         * @member {string} computerName
         * @memberOf LoggerConfig
         * @description Computer name
         * @default Current computer name
         * @public
         */
        this.computerName = ip_helper_1.IPHelper.getComputerName();
        /**
         * @member {boolean} debug
         * @memberOf LoggerConfig
         * @description Debug mode
         * @default false
         * @public
         */
        this.debug = false;
        this.privateKey = config.privateKey || this.privateKey;
        this.applicationName = config.applicationName || this.applicationName;
        this.subsystemName = config.subsystemName || this.subsystemName;
        this.computerName = config.computerName || this.computerName;
        this.debug = config.debug;
        this.proxyUri = config.proxyUri;
    }
    return LoggerConfig;
}());
exports.LoggerConfig = LoggerConfig;
