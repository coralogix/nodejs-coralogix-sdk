/**
 * HTTP helping methods
 *
 * @file        This file contains implementation of helper methods for HTTP
 * @author      Yoni Farin <farin99@gmail.com>
 * @author      Eldar Aliiev <eldar@coralogix.com>
 * @link        https://coralogix.com/
 * @copyright   Coralogix Ltd.
 * @licence     Apache-2.0
 * @version     1.0.0
 * @since       1.0.0
 */
import { Observable } from "rxjs";
import { LoggerConfig } from "./entities/LoggerConfig";
/**
 * @namespace HttpHelper
 * @description HTTP helper methods
 */
export declare namespace HttpHelper {
    /**
     * @function sendBulk
     * @description Send a post request with logs bulk
     * @memberOf HttpHelper
     * @param {any} jsonData    - Logs records bulk in JSON format
     * @param {LoggerConfig} config - Logger config
     * @returns {Observable<HTTPResponse>} Valid HTTP response object
     */
    function sendBulk(jsonData: any, config: LoggerConfig): Observable<HTTPResponse>;
    /**
     * @class HTTPResponse
     * @classdesc HTTP response object
     * @description Create new instance of HTTPResponse object
     * @memberOf  HttpHelper
     * @param {any} response    - Response data
     * @param {any} body        - Response body
     */
    class HTTPResponse {
        /**
         * @member response
         * @memberOf HTTPResponse
         * @description HTTP response data
         * @public
         */
        response: any;
        /**
         * @member body
         * @memberOf HTTPResponse
         * @description HTTP response body
         * @public
         */
        body: any;
        /**
         * @description Initialize new instance of HTTPResponse object
         * @param {any} response    - Response data
         * @param {any} body        - Response body
         */
        constructor(response: any, body: any);
    }
}
