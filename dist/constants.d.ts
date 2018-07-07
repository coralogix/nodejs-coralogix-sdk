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
export declare class Constants {
    /**
     * @member {string} SDK_VERSION
     * @memberOf Constants
     * @description Current SDK version
     * @static
     * @public
     * @default 2.0.0
     */
    static SDK_VERSION: string;
    /**
     * @member {number} MAX_LOG_BUFFER_SIZE
     * @memberOf Constants
     * @description Maximum log buffer size
     * @static
     * @public
     * @default 12MiB
     */
    static MAX_LOG_BUFFER_SIZE: number;
    /**
     * @member {number} MAX_LOG_CHUNK_SIZE
     * @memberOf Constants
     * @description Maximum chunk size
     * @static
     * @public
     * @default 1.5MiB
     */
    static MAX_LOG_CHUNK_SIZE: number;
    /**
     * @member {number} NORMAL_SEND_SPEED_INTERVAL
     * @memberOf Constants
     * @description Entities bulk send interval in normal mode
     * @static
     * @public
     * @default 500
     */
    static NORMAL_SEND_SPEED_INTERVAL: number;
    /**
     * @member {number} FAST_SEND_SPEED_INTERVAL
     * @memberOf Constants
     * @description Entities bulk send interval in fast mode
     * @static
     * @public
     * @default 100
     */
    static FAST_SEND_SPEED_INTERVAL: number;
    /**
     * @member {string} TEST_URL
     * @memberOf Constants
     * @description Coralogix logs API endpoint (test)
     * @static
     * @public
     * @default https://test.coralogix.com:443/api/v1/logs
     */
    static TEST_URL: string;
    /**
     * @member {string} PROD_URL
     * @memberOf Constants
     * @description Coralogix logs API endpoint (production)
     * @static
     * @public
     * @default https://api.coralogix.com:443/api/v1/logs
     */
    static PROD_URL: string;
    /**
     * @member {string} CORALOGIX_LOG_URL
     * @memberOf Constants
     * @description Coralogix logs API used endpoint
     * @static
     * @public
     */
    static CORALOGIX_LOG_URL: string;
    /**
     * @member {string} CORALOGIX_TIME_DELTA_URL
     * @memberOf Constants
     * @description Coralogix timedelta service endpoint
     * @static
     * @public
     * @default https://test.coralogix.com:443/sdk/v1/time
     */
    static CORALOGIX_TIME_DELTA_URL: string;
    /**
     * @member {string} FAILED_PRIVATE_KEY
     * @memberOf Constants
     * @description Default private key for Coralogix account
     * @static
     * @public
     * @default 9626c7dd-8174-5015-a3fe-5572e042b6d9
     */
    static FAILED_PRIVATE_KEY: string;
    /**
     * @member {string} NO_APP_NAME
     * @memberOf Constants
     * @description Default application name
     * @static
     * @public
     * @default NO_APP_NAME
     */
    static NO_APP_NAME: string;
    /**
     * @member {string} NO_SUB_SYSTEM
     * @memberOf Constants
     * @description Default subsystem name
     * @static
     * @public
     * @default NO_SUB_SYSTEM
     */
    static NO_SUB_SYSTEM: string;
    /**
     * @member {string} LOG_FILE_NAME
     * @memberOf Constants
     * @description Default log file name
     * @static
     * @public
     * @default coralogix.sdk.log
     */
    static LOG_FILE_NAME: string;
    /**
     * @member {number} HTTP_TIMEOUT
     * @memberOf Constants
     * @description Default HTTP timeout
     * @static
     * @public
     * @default 30000ms
     */
    static HTTP_TIMEOUT: number;
    /**
     * @member {number} HTTP_SEND_RETRY_COUNT
     * @memberOf Constants
     * @description Number of attempts to retry http post
     * @static
     * @public
     * @default 5
     */
    static HTTP_SEND_RETRY_COUNT: number;
    /**
     * @member {number} HTTP_SEND_RETRY_INTERVAL
     * @memberOf Constants
     * @description Interval between failed http post requests
     * @static
     * @public
     * @default 2000ms
     */
    static HTTP_SEND_RETRY_INTERVAL: number;
    /**
     * @member {string} CORALOGIX_CATEGORY
     * @memberOf Constants
     * @description Coralogix log record category
     * @static
     * @public
     * @default CORALOGIX
     */
    static CORALOGIX_CATEGORY: string;
    /**
     * @member {number} SYNC_TIME_UPDATE_INTERVAL
     * @memberOf Constants
     * @description Synchronization time update interval
     * @static
     * @public
     * @default 300000
     */
    static SYNC_TIME_UPDATE_INTERVAL: number;
    /**
     * @member {string} EMPTY_TEXT
     * @memberOf Constants
     * @description Default log record text
     * @static
     * @public
     * @default EMPTY_TEXT
     */
    static EMPTY_TEXT: string;
    /**
     * @member {string} EMPTY_CATEGORY
     * @memberOf Constants
     * @description Default log record category
     * @static
     * @public
     * @default NO_CATEGORY
     */
    static EMPTY_CATEGORY: string;
}
