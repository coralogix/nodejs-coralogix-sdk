/**
 * Internal debug logger
 *
 * @file        This file contains internal debug logger implementation
 * @author      Yoni Farin <farin99@gmail.com>
 * @author      Eldar Aliiev <eldar@coralogix.com>
 * @link        https://coralogix.com/
 * @copyright   Coralogix Ltd.
 * @licence     Apache-2.0
 * @version     1.0.0
 * @since       1.0.0
 */

/**
 * @class DebugLogger
 * @classdesc Class DebugLogger representing internal logger
 * @description Create new instance of internal debugger interface
 */
export class DebugLogger {
    /**
     * @member {boolean} isDebug
     * @memberOf DebugLogger
     * @description Debug mode status
     * @default false
     * @static
     * @public
     */
    public static isDebug: boolean = false;

    /**
     * @method d
     * @description Echo message and additional data
     * @memberOf DebugLogger
     * @param {string} message  - Message which must be echo
     * @param {any} [data]      - Any additional data
     * @static
     * @public
     * @returns {boolean} Log printing status
     */
    public static d(message: string, data?: any) {
        // Check if debug mode is enabled
        if (this.isDebug) {
            // Check if additional data is passed
            if (data) {
                console.log(message, data);
            } else {
                console.log(message);
            }
            return true;
        }
        return false;
    }
}
