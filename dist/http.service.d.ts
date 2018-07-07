import { Observable } from "rxjs";
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
     * @returns {Observable<HTTPResponse>} Valid HTTP response object
     */
    function sendBulk(jsonData: any): Observable<HTTPResponse>;
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
