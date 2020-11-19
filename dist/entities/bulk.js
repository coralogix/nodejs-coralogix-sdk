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
"use strict";
var constants_1 = require("../constants");
var ip_helper_1 = require("../helpers/ip.helper");
/**
 * @class Bulk
 * @classdesc Class Bulk representing logs bulk container
 * @description Create new instance of logs bulk container class
 */
var Bulk = (function () {
    function Bulk() {
        /**
         * @member {string} applicationName
         * @memberOf Bulk
         * @description Application name
         * @default NO_APP_NAME
         * @public
         */
        this.applicationName = constants_1.Constants.NO_APP_NAME;
        /**
         * @member {string} subsystemName
         * @memberOf Bulk
         * @description Subsystem name
         * @default NO_SUB_SYSTEM
         * @public
         */
        this.subsystemName = constants_1.Constants.NO_SUB_SYSTEM;
        /**
         * @member {string} computerName
         * @memberOf Bulk
         * @description Computer name
         * @default Current computer name
         * @public
         */
        this.computerName = ip_helper_1.IPHelper.getComputerName();
        /**
         * @member {string} IPAddress
         * @memberOf Bulk
         * @description Computer IP-address
         * @default Current computer IP-address
         * @public
         */
        this.IPAddress = ip_helper_1.IPHelper.getIp();
    }
    /**
     * @method bulkFromConfig
     * @description Create logs bulk from configuration
     * @memberOf Bulk
     * @param {LoggerConfig} config  - Logger configuration object
     * @static
     * @public
     * @returns {Bulk} - Logs bulk
     */
    Bulk.bulkFromConfig = function (config) {
        var bulk = new Bulk();
        bulk.privateKey = config.privateKey || constants_1.Constants.FAILED_PRIVATE_KEY;
        bulk.applicationName = config.applicationName || constants_1.Constants.NO_APP_NAME;
        bulk.subsystemName = config.subsystemName || constants_1.Constants.NO_SUB_SYSTEM;
        bulk.computerName = config.computerName || bulk.computerName;
        return bulk;
    };
    return Bulk;
}());
exports.Bulk = Bulk;
