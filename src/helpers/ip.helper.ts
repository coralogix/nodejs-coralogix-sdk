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

import * as os from "os";
import {DebugLogger} from "../debug.logger";

let hostname;
let address = "1.2.3.4";
const ifaces = os.networkInterfaces();

// Trying to get current machine hostname
try {
    hostname = os.hostname();
} catch (e) {
    DebugLogger.d("Failed to get hostname")
    hostname = "";
}

// Trying to get current machine IP-address
try {
    for (var dev in ifaces) {
        ifaces[dev].forEach((details) =>
            details.family === "IPv4" && details.internal === false ? address = details.address : undefined);
    }
} catch (e) {
    DebugLogger.d("Failed to get ip address")
    address = "0.0.0.0";
}

/**
 * @namespace IPHelper
 * @description IP-address helper methods namespace
 */
export namespace IPHelper {
    /**
     * @function getIp
     * @description Get current machine IP-address
     * @memberOf IPHelper
     * @returns {string} Current machine IP-address
     */
    export function getIp() {
        return address;
    }

    /**
     * @function getComputerName
     * @description Get current machine hostname
     * @memberOf IPHelper
     * @returns {string} Current machine hostname
     */
    export function getComputerName() {
        return hostname;
    }
}
