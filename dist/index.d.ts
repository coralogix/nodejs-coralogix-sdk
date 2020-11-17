import { Log } from "./entities/log";
import { LoggerConfig } from "./entities/LoggerConfig";
/**
 * @class CoralogixLogger
 * @classdesc Class CoralogixLogger representing external logger to Coralogix service
 * @description Create new instance of external logger
 * @param {string} category - Coralogix logger category
 */
export declare class CoralogixLogger {
    /**
     * @method configure
     * @description Configure Coralogix logger
     * @memberOf CoralogixLogger
     * @param {LoggerConfig} config  - Logger configuration object
     * @static
     * @public
     * @returns {boolean} Logger configuration result status
     */
    static configure(config: LoggerConfig): boolean;
    /**
     * @method close
     * @description Close logger manager session
     * @memberOf CoralogixLogger
     * @static
     * @public
     */
    static close(): void;
    /**
     * @method flush
     * @description Flush logger manager queue
     * @memberOf CoralogixLogger
     * @static
     * @public
     */
    static flush(): void;
    /**
     * @member {LoggerManager} loggerManager
     * @memberOf CoralogixLogger
     * @description Logger manager instance
     * @static
     * @private
     */
    private static loggerManager;
    /**
     * @method sendWelcomeMsg
     * @description Send welcome message to Coralogix service
     * @memberOf CoralogixLogger
     * @param {LoggerConfig} config - Logger configuration object
     * @static
     * @private
     */
    private static sendWelcomeMessage(config);
    /**
     * @member {string} category
     * @memberOf CoralogixLogger
     * @description Coralogix logger category
     * @private
     */
    category: string;
    /**
     * @description Initialize new instance of CoralogixLogger object
     * @param {string} category - Coralogix logger category
     */
    constructor(category: string);
    /**
     * @method addLog
     * @description Add log line to logger manager queue
     * @memberOf DebugLogger
     * @param {Log} log - Log line object instance
     * @public
     */
    addLog(log: Log): void;
    /**
     * @method waitForFlush
     * @description waits for all the currently pending to be written to the Coralogix backend
     * @memberOf LoggerManager
     * @public
     * @returns {Promise} returns a promise that settles when all the pending logs have been written
     */
    waitForFlush(): Promise<void>;
}
/**
 * @class CoralogixCentralLogger
 * @classdesc Class CoralogixCentralLogger representing central external logger to Coralogix service
 * @description Create new instance of central external logger
 */
export declare class CoralogixCentralLogger {
    /**
     * @method configure
     * @description Configure Central Coralogix logger
     * @memberOf CoralogixCentralLogger
     * @param {LoggerConfig} config  - Logger configuration object
     * @static
     * @public
     * @returns {boolean} Logger configuration result status
     */
    static configure(config: LoggerConfig): boolean;
    /**
     * @member {LoggerConfig} config
     * @memberOf CoralogixCentralLogger
     * @description Logger configuration instance
     * @static
     * @private
     */
    private static config;
    /**
     * @member {Map<string, LoggerManager>} loggers
     * @memberOf CoralogixCentralLogger
     * @description Loggers collection
     * @private
     */
    private loggers;
    /**
     * @method addLog
     * @description Add log line to logger manager queue
     * @memberOf CoralogixCentralLogger
     * @param {string} applicationName  - Application name
     * @param {string} subsystemName    - Subsystem name
     * @param {Log} log                 - Log line object instance
     * @public
     */
    addLog(applicationName: string, subsystemName: string, log: Log): void;
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
    addLogWithHostname(applicationName: string, subsystemName: string, computerName: string, log: Log): void;
}
export * from "./constants";
export * from "./debug.logger";
export * from "./entities/log";
export * from "./entities/LoggerConfig";
