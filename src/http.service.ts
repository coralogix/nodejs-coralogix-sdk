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

import * as request from "request";
import {CoreOptions, UrlOptions} from "request";
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
        const options: CoreOptions & UrlOptions = {
            body: jsonData,
            gzip: true,
            json: true,
            method: "POST",
            timeout: Constants.HTTP_TIMEOUT,
            url: Constants.CORALOGIX_LOG_URL,
        };
        if (config.proxyUri) {
            options.proxy = config.proxyUri;
        }

        return Observable.create(observer => {
            request(options, (error, response, body) => {
                if (error || response.statusCode < 200 || response.statusCode > 299) {
                    if (!error) {
                        error = {code: response.statusCode};
                    }
                    observer.error(error);
                } else {
                    observer.next(new HTTPResponse(response, body));
                }
                observer.complete();
            });
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
