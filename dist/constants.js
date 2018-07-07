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
"use strict";
/**
 * @class Constants
 * @classdesc Class Constants representing default values for Coralogix logger
 * @description Create new instance of configuration container class
 */
var Constants = (function () {
    function Constants() {
    }
    return Constants;
}());
/**
 * @member {string} SDK_VERSION
 * @memberOf Constants
 * @description Current SDK version
 * @static
 * @public
 * @default 2.0.0
 */
Constants.SDK_VERSION = "2.0.0";
/**
 * @member {number} MAX_LOG_BUFFER_SIZE
 * @memberOf Constants
 * @description Maximum log buffer size
 * @static
 * @public
 * @default 12MiB
 */
Constants.MAX_LOG_BUFFER_SIZE = 12582912;
/**
 * @member {number} MAX_LOG_CHUNK_SIZE
 * @memberOf Constants
 * @description Maximum chunk size
 * @static
 * @public
 * @default 1.5MiB
 */
Constants.MAX_LOG_CHUNK_SIZE = 1572864; // 1.5mb
/**
 * @member {number} NORMAL_SEND_SPEED_INTERVAL
 * @memberOf Constants
 * @description Entities bulk send interval in normal mode
 * @static
 * @public
 * @default 500
 */
Constants.NORMAL_SEND_SPEED_INTERVAL = 500;
/**
 * @member {number} FAST_SEND_SPEED_INTERVAL
 * @memberOf Constants
 * @description Entities bulk send interval in fast mode
 * @static
 * @public
 * @default 100
 */
Constants.FAST_SEND_SPEED_INTERVAL = 100;
/**
 * @member {string} TEST_URL
 * @memberOf Constants
 * @description Coralogix logs API endpoint (test)
 * @static
 * @public
 * @default https://test.coralogix.com:443/api/v1/logs
 */
Constants.TEST_URL = "https://test.coralogix.com:443/api/v1/logs";
/**
 * @member {string} PROD_URL
 * @memberOf Constants
 * @description Coralogix logs API endpoint (production)
 * @static
 * @public
 * @default https://api.coralogix.com:443/api/v1/logs
 */
Constants.PROD_URL = "https://api.coralogix.com:443/api/v1/logs";
/**
 * @member {string} CORALOGIX_LOG_URL
 * @memberOf Constants
 * @description Coralogix logs API used endpoint
 * @static
 * @public
 */
Constants.CORALOGIX_LOG_URL = process.env.CORALOGIX_URL || Constants.PROD_URL;
/**
 * @member {string} CORALOGIX_TIME_DELTA_URL
 * @memberOf Constants
 * @description Coralogix timedelta service endpoint
 * @static
 * @public
 * @default https://test.coralogix.com:443/sdk/v1/time
 */
Constants.CORALOGIX_TIME_DELTA_URL = "https://test.coralogix.com:443/sdk/v1/time";
/**
 * @member {string} FAILED_PRIVATE_KEY
 * @memberOf Constants
 * @description Default private key for Coralogix account
 * @static
 * @public
 * @default 9626c7dd-8174-5015-a3fe-5572e042b6d9
 */
Constants.FAILED_PRIVATE_KEY = "9626c7dd-8174-5015-a3fe-5572e042b6d9";
/**
 * @member {string} NO_APP_NAME
 * @memberOf Constants
 * @description Default application name
 * @static
 * @public
 * @default NO_APP_NAME
 */
Constants.NO_APP_NAME = "NO_APP_NAME";
/**
 * @member {string} NO_SUB_SYSTEM
 * @memberOf Constants
 * @description Default subsystem name
 * @static
 * @public
 * @default NO_SUB_SYSTEM
 */
Constants.NO_SUB_SYSTEM = "NO_SUB_NAME";
/**
 * @member {string} LOG_FILE_NAME
 * @memberOf Constants
 * @description Default log file name
 * @static
 * @public
 * @default coralogix.sdk.log
 */
Constants.LOG_FILE_NAME = "coralogix.sdk.log";
/**
 * @member {number} HTTP_TIMEOUT
 * @memberOf Constants
 * @description Default HTTP timeout
 * @static
 * @public
 * @default 30000ms
 */
Constants.HTTP_TIMEOUT = 30000;
/**
 * @member {number} HTTP_SEND_RETRY_COUNT
 * @memberOf Constants
 * @description Number of attempts to retry http post
 * @static
 * @public
 * @default 5
 */
Constants.HTTP_SEND_RETRY_COUNT = 5;
/**
 * @member {number} HTTP_SEND_RETRY_INTERVAL
 * @memberOf Constants
 * @description Interval between failed http post requests
 * @static
 * @public
 * @default 2000ms
 */
Constants.HTTP_SEND_RETRY_INTERVAL = 2000;
/**
 * @member {string} CORALOGIX_CATEGORY
 * @memberOf Constants
 * @description Coralogix log record category
 * @static
 * @public
 * @default CORALOGIX
 */
Constants.CORALOGIX_CATEGORY = "CORALOGIX";
/**
 * @member {number} SYNC_TIME_UPDATE_INTERVAL
 * @memberOf Constants
 * @description Synchronization time update interval
 * @static
 * @public
 * @default 300000
 */
Constants.SYNC_TIME_UPDATE_INTERVAL = 5 * 60 * 1000;
/**
 * @member {string} EMPTY_TEXT
 * @memberOf Constants
 * @description Default log record text
 * @static
 * @public
 * @default EMPTY_TEXT
 */
Constants.EMPTY_TEXT = "EMPTY_TEXT";
/**
 * @member {string} EMPTY_CATEGORY
 * @memberOf Constants
 * @description Default log record category
 * @static
 * @public
 * @default NO_CATEGORY
 */
Constants.EMPTY_CATEGORY = "NO_CATEGORY";
exports.Constants = Constants;
