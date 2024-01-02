/**
 * Coralogix constants
 *
 * @file        This file contains default values for Coralogix Node.js SDK
 * @author      Yoni Farin <farin99@gmail.com>
 * @author      Eldar Aliiev <eldar@coralogix.com>
 * @link        https://coralogix.com/
 * @copyright   Coralogix Ltd.
 * @licence     Apache-2.0
 * @version     1.0.0
 * @since       1.0.0
 */

/**
 * @class Constants
 * @classdesc Class Constants representing default values for Coralogix logger
 * @description Create new instance of configuration container class
 */
export class Constants {
    /**
     * @member {string} SDK_VERSION
     * @memberOf Constants
     * @description Current SDK version
     * @static
     * @public
     * @default 2.0.0
     */
    public static SDK_VERSION: string = "2.0.0";

    /**
     * @member {number} MAX_LOG_BUFFER_SIZE
     * @memberOf Constants
     * @description Maximum log buffer size
     * @static
     * @public
     * @default 12MiB
     */
    public static MAX_LOG_BUFFER_SIZE: number = process.env.CORALOGIX_BUFFER_SIZE ? parseInt(process.env.CORALOGIX_BUFFER_SIZE) : 12582912;

    /**
     * @member {number} MAX_LOG_CHUNK_SIZE
     * @memberOf Constants
     * @description Maximum chunk size
     * @static
     * @public
     * @default 1.5MiB
     */
    public static MAX_LOG_CHUNK_SIZE: number = 1572864; // 1.5mb

    /**
     * @member {number} NORMAL_SEND_SPEED_INTERVAL
     * @memberOf Constants
     * @description Entities bulk send interval in normal mode
     * @static
     * @public
     * @default 500
     */
    public static NORMAL_SEND_SPEED_INTERVAL: number = 500;

    /**
     * @member {number} FAST_SEND_SPEED_INTERVAL
     * @memberOf Constants
     * @description Entities bulk send interval in fast mode
     * @static
     * @public
     * @default 100
     */
    public static FAST_SEND_SPEED_INTERVAL: number = 100;

    /**
     * @member {string} TEST_URL
     * @memberOf Constants
     * @description Coralogix logs API endpoint (test)
     * @static
     * @public
     * @default https://test.coralogix.com:443/api/v1/logs
     */
    public static TEST_URL: string = "https://test.coralogix.com:443/api/v1/logs";

    /**
     * @member {string} PROD_URL
     * @memberOf Constants
     * @description Coralogix logs API endpoint (production)
     * @static
     * @public
     * @default https://ingress.coralogix.com:443/api/v1/logs
     */
    public static PROD_URL: string = "https://ingress.coralogix.com:443/api/v1/logs";

    /**
     * @member {string} CORALOGIX_LOG_URL
     * @memberOf Constants
     * @description Coralogix logs API used endpoint
     * @static
     * @public
     */
    public static CORALOGIX_LOG_URL: string = process.env.CORALOGIX_URL || Constants.PROD_URL;

    /**
     * @member {string} CORALOGIX_TIME_DELTA_URL
     * @memberOf Constants
     * @description Coralogix timedelta service endpoint
     * @static
     * @public
     * @default https://test.coralogix.com:443/sdk/v1/time
     */
    public static CORALOGIX_TIME_DELTA_URL: string = "https://test.coralogix.com:443/sdk/v1/time";

    /**
     * @member {string} FAILED_PRIVATE_KEY
     * @memberOf Constants
     * @description Default private key for Coralogix account
     * @static
     * @public
     * @default ********
     */
    public static FAILED_PRIVATE_KEY: string = "*************";

    /**
     * @member {string} NO_APP_NAME
     * @memberOf Constants
     * @description Default application name
     * @static
     * @public
     * @default NO_APP_NAME
     */
    public static NO_APP_NAME: string = "NO_APP_NAME";

    /**
     * @member {string} NO_SUB_SYSTEM
     * @memberOf Constants
     * @description Default subsystem name
     * @static
     * @public
     * @default NO_SUB_SYSTEM
     */
    public static NO_SUB_SYSTEM: string = "NO_SUB_NAME";

    /**
     * @member {string} LOG_FILE_NAME
     * @memberOf Constants
     * @description Default log file name
     * @static
     * @public
     * @default coralogix.sdk.log
     */
    public static LOG_FILE_NAME: string = "coralogix.sdk.log";

    /**
     * @member {number} HTTP_TIMEOUT
     * @memberOf Constants
     * @description Default HTTP timeout
     * @static
     * @public
     * @default 30000ms
     */
    public static HTTP_TIMEOUT: number = 30000;

    /**
     * @member {number} HTTP_SEND_RETRY_COUNT
     * @memberOf Constants
     * @description Number of attempts to retry http post
     * @static
     * @public
     * @default 5
     */
    public static HTTP_SEND_RETRY_COUNT: number = 5;

    /**
     * @member {number} HTTP_SEND_RETRY_INTERVAL
     * @memberOf Constants
     * @description Interval between failed http post requests
     * @static
     * @public
     * @default 2000ms
     */
    public static HTTP_SEND_RETRY_INTERVAL: number = 2000;

    /**
     * @member {string} CORALOGIX_CATEGORY
     * @memberOf Constants
     * @description Coralogix log record category
     * @static
     * @public
     * @default CORALOGIX
     */
    public static CORALOGIX_CATEGORY: string = "CORALOGIX";

    /**
     * @member {number} SYNC_TIME_UPDATE_INTERVAL
     * @memberOf Constants
     * @description Synchronization time update interval
     * @static
     * @public
     * @default 300000
     */
    public static SYNC_TIME_UPDATE_INTERVAL: number = 5 * 60 * 1000;

    /**
     * @member {string} EMPTY_TEXT
     * @memberOf Constants
     * @description Default log record text
     * @static
     * @public
     * @default EMPTY_TEXT
     */
    public static EMPTY_TEXT: string = "EMPTY_TEXT";

    /**
     * @member {string} EMPTY_CATEGORY
     * @memberOf Constants
     * @description Default log record category
     * @static
     * @public
     * @default NO_CATEGORY
     */
    public static EMPTY_CATEGORY: string = "NO_CATEGORY";
}
