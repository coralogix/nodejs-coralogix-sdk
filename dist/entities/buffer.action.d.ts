/**
 * Buffer Action instance
 *
 * @file        This file contains buffer action object description
 * @author      Yoni Farin <farin99@gmail.com>
 * @author      Eldar Aliiev <eldar@coralogix.com>
 * @link        https://coralogix.com/
 * @copyright   Coralogix Ltd.
 * @licence     Apache-2.0
 * @version     1.0.0
 * @since       1.0.0
 */
import { Log } from "./log";
/**
 * @class BufferAction
 * @classdesc Class BufferAction representing buffer action container
 * @description Create new instance of buffer action container class
 * @param {string} type - Type of action
 * @param {Log} payload - Action payload data
 */
export declare class BufferAction {
    /**
     * @member {string} type
     * @memberOf BufferAction
     * @description Type of action
     * @public
     */
    type: string;
    /**
     * @member {Log} payload
     * @memberOf BufferAction
     * @description Action payload data
     * @public
     */
    payload: Log;
    /**
     * @description Initialize new instance of buffer action container class
     * @param {string} type - Type of action
     * @param {Log} payload - Action payload data
     */
    constructor(type: any, payload?: any);
}
