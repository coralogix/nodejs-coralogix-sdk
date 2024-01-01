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
/**
 * @namespace IPHelper
 * @description IP-address helper methods namespace
 */
export declare namespace IPHelper {
    /**
     * @function getIp
     * @description Get current machine IP-address
     * @memberOf IPHelper
     * @returns {string} Current machine IP-address
     */
    function getIp(): string;
    /**
     * @function getComputerName
     * @description Get current machine hostname
     * @memberOf IPHelper
     * @returns {string} Current machine hostname
     */
    function getComputerName(): any;
}
