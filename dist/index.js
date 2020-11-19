/**
 * Main package file
 *
 * @file        This file contains all functionality of current package
 * @author      Yoni Farin <farin99@gmail.com>
 * @author      Eldar Aliiev <eldar@coralogix.com>
 * @link        https://coralogix.com/
 * @copyright   Coralogix Ltd.
 * @licence     Apache-2.0
 * @version     1.0.0
 * @since       1.0.0
 */
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
var constants_1 = require("./constants");
var debug_logger_1 = require("./debug.logger");
var log_1 = require("./entities/log");
var logger_manager_1 = require("./logger.manager");
/**
 * @name pjson
 * @constant {object}
 * @default
 */
var pjson = require("../package.json");
/**
 * @class CoralogixLogger
 * @classdesc Class CoralogixLogger representing external logger to Coralogix service
 * @description Create new instance of external logger
 * @param {string} category - Coralogix logger category
 */
var CoralogixLogger = (function () {
    /**
     * @description Initialize new instance of CoralogixLogger object
     * @param {string} category - Coralogix logger category
     */
    function CoralogixLogger(category) {
        this.category = category || constants_1.Constants.EMPTY_CATEGORY;
    }
    /**
     * @method configure
     * @description Configure Coralogix logger
     * @memberOf CoralogixLogger
     * @param {LoggerConfig} config  - Logger configuration object
     * @static
     * @public
     * @returns {boolean} Logger configuration result status
     */
    CoralogixLogger.configure = function (config) {
        debug_logger_1.DebugLogger.isDebug = config.debug;
        debug_logger_1.DebugLogger.d("Configuring sdk config: ", config);
        this.loggerManager.config = config;
        this.sendWelcomeMessage(config);
        return true;
    };
    /**
     * @method close
     * @description Close logger manager session
     * @memberOf CoralogixLogger
     * @static
     * @public
     */
    CoralogixLogger.close = function () {
        this.loggerManager.close();
    };
    /**
     * @method flush
     * @description Flush logger manager queue
     * @memberOf CoralogixLogger
     * @static
     * @public
     */
    CoralogixLogger.flush = function () {
        CoralogixLogger.loggerManager.flush();
    };
    /**
     * @method sendWelcomeMsg
     * @description Send welcome message to Coralogix service
     * @memberOf CoralogixLogger
     * @param {LoggerConfig} config - Logger configuration object
     * @static
     * @private
     */
    CoralogixLogger.sendWelcomeMessage = function (config) {
        var welcomeMessage = "The Application Name " + config.applicationName +
            " and Subsystem Name " + config.subsystemName +
            " from the node SDK, version " + pjson.version +
            " has started to send data.";
        var log = new log_1.Log();
        log.text = welcomeMessage;
        log.severity = log_1.Severity.info;
        log.category = constants_1.Constants.CORALOGIX_CATEGORY;
        CoralogixLogger.loggerManager.addLogline(log);
    };
    /**
     * @method addLog
     * @description Add log line to logger manager queue
     * @memberOf DebugLogger
     * @param {Log} log - Log line object instance
     * @public
     */
    CoralogixLogger.prototype.addLog = function (log) {
        log.category = log.category || this.category;
        CoralogixLogger.loggerManager.addLogline(log);
    };
    /**
     * @method waitForFlush
     * @description waits for all the currently pending to be written to the Coralogix backend
     * @memberOf LoggerManager
     * @public
     * @returns {Promise} returns a promise that settles when all the pending logs have been written
     */
    CoralogixLogger.prototype.waitForFlush = function () {
        return CoralogixLogger.loggerManager.waitForFlush();
    };
    return CoralogixLogger;
}());
/**
 * @member {LoggerManager} loggerManager
 * @memberOf CoralogixLogger
 * @description Logger manager instance
 * @static
 * @private
 */
CoralogixLogger.loggerManager = new logger_manager_1.LoggerManager();
exports.CoralogixLogger = CoralogixLogger;
/**
 * @class CoralogixCentralLogger
 * @classdesc Class CoralogixCentralLogger representing central external logger to Coralogix service
 * @description Create new instance of central external logger
 */
var CoralogixCentralLogger = (function () {
    function CoralogixCentralLogger() {
        /**
         * @member {Map<string, LoggerManager>} loggers
         * @memberOf CoralogixCentralLogger
         * @description Loggers collection
         * @private
         */
        this.loggers = new Map();
    }
    /**
     * @method configure
     * @description Configure Central Coralogix logger
     * @memberOf CoralogixCentralLogger
     * @param {LoggerConfig} config  - Logger configuration object
     * @static
     * @public
     * @returns {boolean} Logger configuration result status
     */
    CoralogixCentralLogger.configure = function (config) {
        debug_logger_1.DebugLogger.isDebug = config.debug;
        CoralogixCentralLogger.config = config;
        debug_logger_1.DebugLogger.d("Configuring central sdk config: ", config);
        return true;
    };
    /**
     * @method addLog
     * @description Add log line to logger manager queue
     * @memberOf CoralogixCentralLogger
     * @param {string} applicationName  - Application name
     * @param {string} subsystemName    - Subsystem name
     * @param {Log} log                 - Log line object instance
     * @public
     */
    CoralogixCentralLogger.prototype.addLog = function (applicationName, subsystemName, log) {
        var key = applicationName + "_" + subsystemName;
        if (!this.loggers.has(key)) {
            var newLogger = new logger_manager_1.LoggerManager();
            newLogger.config = Object.assign({}, CoralogixCentralLogger.config, {
                applicationName: applicationName,
                subsystemName: subsystemName,
            });
            this.loggers.set(key, newLogger);
        }
        var logger = this.loggers.get(key);
        logger.addLogline(log);
    };
    /**
     * @method addLog
     * @description Add log line to logger manager queue
     * @memberOf CoralogixCentralLogger
     * @param {string} applicationName  - Application name
     * @param {string} subsystemName    - Subsystem name
     * @param {string} computerName     - Computer name
     * @param {Log} log                 - Log line object instance
     * @public
     */
    CoralogixCentralLogger.prototype.addLogWithHostname = function (applicationName, subsystemName, computerName, log) {
        var key = applicationName + "_" + subsystemName + "_" + computerName;
        if (!this.loggers.has(key)) {
            var newLogger = new logger_manager_1.LoggerManager();
            newLogger.config = Object.assign({}, CoralogixCentralLogger.config, {
                applicationName: applicationName,
                subsystemName: subsystemName,
                computerName: computerName
            });
            this.loggers.set(key, newLogger);
        }
        var logger = this.loggers.get(key);
        logger.addLogline(log);
    };
    return CoralogixCentralLogger;
}());
exports.CoralogixCentralLogger = CoralogixCentralLogger;
__export(require("./constants"));
__export(require("./debug.logger"));
__export(require("./entities/log"));
__export(require("./entities/LoggerConfig"));
