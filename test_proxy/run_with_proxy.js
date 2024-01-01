var Coralogix = require("./dist");

// global confing for application name, private key, subsystem name
const config = new Coralogix.LoggerConfig({
    applicationName: "node tester",
    privateKey: "********",
    subsystemName: "node tester sub",
    proxyUri: "http://127.0.0.1:9999/",
    debug: true
});

Coralogix.CoralogixLogger.configure(config);

// create a new logger with category
const logger = new Coralogix.CoralogixLogger("My Category");

// create a log
const log = new Coralogix.Log({
    severity: Coralogix.Severity.info,
    className: "className",
    methodName: "methodName",
    text: "log data",
})
// send log to coralogix
logger.addLog(log);
