var Coralogix = require("coralogix-logger");

// global confing
const config = new Coralogix.LoggerConfig({
    privateKey:"9626c7dd-8174-5015-a3fe-5572e042b6d9",
});

Coralogix.CoralogixCentralLogger.configure(config);

// create a new logger with category
const centralLogger = new Coralogix.CoralogixCentralLogger();

// create a log
const log = new Coralogix.Log({
    severity:Coralogix.Severity.info,
    category:'ccccc',
    className:"className",
    methodName:"methodName",
    threadId:"11111",
    text:{'custom':'custom'}
});
// send log to coralogix
centralLogger.addLog("aaa", "aaa",log);
centralLogger.addLog("bbb", "bbb",log);
