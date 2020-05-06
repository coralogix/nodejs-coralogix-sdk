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

import {Constants} from "./constants";
import {DebugLogger} from "./debug.logger";
import {Log, Severity} from "./entities/log";
import {LoggerConfig} from "./entities/LoggerConfig";
import {LoggerManager} from "./logger.manager";

/**
 * @name pjson
 * @constant {object}
 * @default
 */
const pjson = require("../package.json");

/**
 * @class CoralogixLogger
 * @classdesc Class CoralogixLogger representing external logger to Coralogix service
 * @description Create new instance of external logger
 * @param {string} category - Coralogix logger category
 */
export class CoralogixLogger {
    /**
     * @method configure
     * @description Configure Coralogix logger
     * @memberOf CoralogixLogger
     * @param {LoggerConfig} config  - Logger configuration object
     * @static
     * @public
     * @returns {boolean} Logger configuration result status
     */
    public static configure(config: LoggerConfig): boolean {
        DebugLogger.isDebug = config.debug;
        DebugLogger.d("Configuring sdk config: ", config);
        this.loggerManager.config = config;
        this.sendWelcomeMessage(config);
        return true;
    }

    /**
     * @method close
     * @description Close logger manager session
     * @memberOf CoralogixLogger
     * @static
     * @public
     */
    public static close() {
        this.loggerManager.close();
    }

    /**
     * @method flush
     * @description Flush logger manager queue
     * @memberOf CoralogixLogger
     * @static
     * @public
     */
    public static flush() {
        CoralogixLogger.loggerManager.flush();
    }

    /**
     * @member {LoggerManager} loggerManager
     * @memberOf CoralogixLogger
     * @description Logger manager instance
     * @static
     * @private
     */
    private static loggerManager: LoggerManager = new LoggerManager();

    /**
     * @method sendWelcomeMsg
     * @description Send welcome message to Coralogix service
     * @memberOf CoralogixLogger
     * @param {LoggerConfig} config - Logger configuration object
     * @static
     * @private
     */
    private static sendWelcomeMessage(config: LoggerConfig) {
        const welcomeMessage = "The Application Name " + config.applicationName +
            " and Subsystem Name " + config.subsystemName +
            " from the node SDK, version " + pjson.version +
            " has started to send data.";

        const log: Log = new Log();
        log.text = welcomeMessage;
        log.severity = Severity.info;
        log.category = Constants.CORALOGIX_CATEGORY;

        CoralogixLogger.loggerManager.addLogline(log);
    }

    /**
     * @member {string} category
     * @memberOf CoralogixLogger
     * @description Coralogix logger category
     * @private
     */
    public category: string;

    /**
     * @description Initialize new instance of CoralogixLogger object
     * @param {string} category - Coralogix logger category
     */
    constructor(category: string) {
        this.category = category || Constants.EMPTY_CATEGORY;
    }

    /**
     * @method addLog
     * @description Add log line to logger manager queue
     * @memberOf DebugLogger
     * @param {Log} log - Log line object instance
     * @public
     */
    public addLog(log: Log) {
        log.category = log.category || this.category;
        CoralogixLogger.loggerManager.addLogline(log);
    }
    
        /**
     * @method waitForFlush
     * @description waits for all the currently pending to be written to the Coralogix backend
     * @memberOf LoggerManager
     * @public
     * @returns {Promise} returns a promise that settles when all the pending logs have been written
     */
    public waitForFlush(): Promise<void> {
        return CoralogixLogger.loggerManager.waitForFlush();
    }
}

/**
 * @class CoralogixCentralLogger
 * @classdesc Class CoralogixCentralLogger representing central external logger to Coralogix service
 * @description Create new instance of central external logger
 */
export class CoralogixCentralLogger {
    /**
     * @method configure
     * @description Configure Central Coralogix logger
     * @memberOf CoralogixCentralLogger
     * @param {LoggerConfig} config  - Logger configuration object
     * @static
     * @public
     * @returns {boolean} Logger configuration result status
     */
    public static configure(config: LoggerConfig): boolean {
        DebugLogger.isDebug = config.debug;
        CoralogixCentralLogger.config = config;
        DebugLogger.d("Configuring central sdk config: ", config);
        return true;
    }

    /**
     * @member {LoggerConfig} config
     * @memberOf CoralogixCentralLogger
     * @description Logger configuration instance
     * @static
     * @private
     */
    private static config: LoggerConfig;

    /**
     * @member {Map<string, LoggerManager>} loggers
     * @memberOf CoralogixCentralLogger
     * @description Loggers collection
     * @private
     */
    private loggers: Map<string, LoggerManager> = new Map<string, LoggerManager>();

    /**
     * @method addLog
     * @description Add log line to logger manager queue
     * @memberOf CoralogixCentralLogger
     * @param {string} applicationName  - Application name
     * @param {string} subsystemName    - Subsystem name
     * @param {Log} log                 - Log line object instance
     * @public
     */
    public addLog(applicationName: string, subsystemName: string, log: Log) {
        const key = applicationName + "_" + subsystemName;
        if (!this.loggers.has(key)) {
            const newLogger = new LoggerManager();
            newLogger.config = Object.assign({}, CoralogixCentralLogger.config, {
                applicationName: applicationName,
                subsystemName: subsystemName,
            });

            this.loggers.set(key, newLogger);
        }

        const logger = this.loggers.get(key);
        logger.addLogline(log);
    }
}

export * from "./constants";
export * from "./debug.logger";
export * from "./entities/log";
export * from "./entities/LoggerConfig";
