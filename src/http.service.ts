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

import axios, {AxiosRequestConfig} from 'axios';
import {Observable} from "rxjs";
import {Constants} from "./constants";
import {LoggerConfig} from "./entities/LoggerConfig";

/**
 * @namespace HttpHelper
 * @description HTTP helper methods
 */
export namespace HttpHelper {
    /**
     * @function sendBulk
     * @description Send a post request with logs bulk
     * @memberOf HttpHelper
     * @param {any} jsonData    - Logs records bulk in JSON format
     * @param {LoggerConfig} config - Logger config
     * @returns {Observable<HTTPResponse>} Valid HTTP response object
     */
    export function sendBulk(jsonData: any, config: LoggerConfig): Observable<HTTPResponse> {
        const options: AxiosRequestConfig = {
            decompress: true,
            timeout: Constants.HTTP_TIMEOUT,
            headers: {
                'Authorization': `Bearer ${config.privateKey}`,
                'Content-Type': 'application/json'
            }
        };
        if (config.proxyUri) {
            options.proxy = config.proxyUri;
        }

        return Observable.create(observer => {
            axios.post(Constants.CORALOGIX_LOG_URL, jsonData, options)
              .then(response => {
                if (response.status < 200 || response.status > 299) {
                  observer.error({code: response.status})
                } else {
                  observer.next(new HTTPResponse(response, response.data.json));
                }
              }).catch(error => {
                observer.error(error);
              }).finally(() => observer.complete());
        });
    }

    /**
     * @class HTTPResponse
     * @classdesc HTTP response object
     * @description Create new instance of HTTPResponse object
     * @memberOf  HttpHelper
     * @param {any} response    - Response data
     * @param {any} body        - Response body
     */
    export class HTTPResponse {
        /**
         * @member response
         * @memberOf HTTPResponse
         * @description HTTP response data
         * @public
         */
        public response: any;

        /**
         * @member body
         * @memberOf HTTPResponse
         * @description HTTP response body
         * @public
         */
        public body: any;

        /**
         * @description Initialize new instance of HTTPResponse object
         * @param {any} response    - Response data
         * @param {any} body        - Response body
         */
        constructor(response, body) {
            this.response = response;
            this.body = body;
        }
    }
}
