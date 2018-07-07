/**
 * IP-address helper functions
 *
 * @file        This file contains helper functions for work with IP
 * @author      Yoni Farin <farin99@gmail.com>
 * @author      Eldar Aliiev <eldar@coralogix.com>
 * @link        https://coralogix.com/
 * @copyright   Coralogix Ltd.
 * @licence     Apache-2.0
 * @version     1.0.0
 * @since       1.0.0
 */
"use strict";
var os = require("os");
var debug_logger_1 = require("../debug.logger");
var hostname;
var address = "1.2.3.4";
var ifaces = os.networkInterfaces();
// Trying to get current machine hostname
try {
    hostname = os.hostname();
}
catch (e) {
    debug_logger_1.DebugLogger.d("Failed to get hostname");
    hostname = "";
}
// Trying to get current machine IP-address
try {
    for (var dev in ifaces) {
        ifaces[dev].forEach(function (details) {
            return details.family === "IPv4" && details.internal === false ? address = details.address : undefined;
        });
    }
}
catch (e) {
    debug_logger_1.DebugLogger.d("Failed to get ip address");
    address = "0.0.0.0";
}
/**
 * @namespace IPHelper
 * @description IP-address helper methods namespace
 */
var IPHelper;
(function (IPHelper) {
    /**
     * @function getIp
     * @description Get current machine IP-address
     * @memberOf IPHelper
     * @returns {string} Current machine IP-address
     */
    function getIp() {
        return address;
    }
    IPHelper.getIp = getIp;
    /**
     * @function getComputerName
     * @description Get current machine hostname
     * @memberOf IPHelper
     * @returns {string} Current machine hostname
     */
    function getComputerName() {
        return hostname;
    }
    IPHelper.getComputerName = getComputerName;
})(IPHelper = exports.IPHelper || (exports.IPHelper = {}));
