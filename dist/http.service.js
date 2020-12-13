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
"use strict";
var request = require("request");
var rxjs_1 = require("rxjs");
var constants_1 = require("./constants");
/**
 * @namespace HttpHelper
 * @description HTTP helper methods
 */
var HttpHelper;
(function (HttpHelper) {
    /**
     * @function sendBulk
     * @description Send a post request with logs bulk
     * @memberOf HttpHelper
     * @param {any} jsonData    - Logs records bulk in JSON format
     * @param {LoggerConfig} config - Logger config
     * @returns {Observable<HTTPResponse>} Valid HTTP response object
     */
    function sendBulk(jsonData, config) {
        var options = {
            body: jsonData,
            gzip: true,
            json: true,
            method: "POST",
            timeout: constants_1.Constants.HTTP_TIMEOUT,
            url: constants_1.Constants.CORALOGIX_LOG_URL,
        };
        if (config.proxyUri) {
            options.proxy = config.proxyUri;
        }
        return rxjs_1.Observable.create(function (observer) {
            request(options, function (error, response, body) {
                if (error || response.statusCode < 200 || response.statusCode > 299) {
                    if (!error) {
                        error = { code: response.statusCode };
                    }
                    observer.error(error);
                }
                else {
                    observer.next(new HTTPResponse(response, body));
                }
                observer.complete();
            });
        });
    }
    HttpHelper.sendBulk = sendBulk;
    /**
     * @class HTTPResponse
     * @classdesc HTTP response object
     * @description Create new instance of HTTPResponse object
     * @memberOf  HttpHelper
     * @param {any} response    - Response data
     * @param {any} body        - Response body
     */
    var HTTPResponse = (function () {
        /**
         * @description Initialize new instance of HTTPResponse object
         * @param {any} response    - Response data
         * @param {any} body        - Response body
         */
        function HTTPResponse(response, body) {
            this.response = response;
            this.body = body;
        }
        return HTTPResponse;
    }());
    HttpHelper.HTTPResponse = HTTPResponse;
})(HttpHelper = exports.HttpHelper || (exports.HttpHelper = {}));
