var bunyan = require("bunyan");
var CoralogixBunyan = require("coralogix-logger-bunyan");

// global configuration for coralogix
var config = {
    privateKey: "9626c7dd-8174-5015-a3fe-5572e042b6d9",
    applicationName: "YOUR APP NAME",
    subsystemName: "YOUR SUBSYSTEM",
};

CoralogixBunyan.CoralogixStream.configure(config);

// configure bunyan to user coralogix stram
var logger = bunyan.createLogger({
    name: 'BUNYAN_ROOT',
    streams: [
        {
            level: 'info',
            stream: new CoralogixBunyan.CoralogixStream({category:"YOUR CATEGORY"}),
            type: 'raw'
        }
    ]
});

// use bunyan
logger.info('hello bunyan');
// use bunyan child loggers and assign category to them
var childLogger = logger.child({category:"CHILD CATEGORY"});
childLogger.error("Child logger bunyan");


logger.child({category:"CATEGORY",className:"AAA",methodName:"METHOD",threadId:"threadID"}).error(JSON.stringify({a:"AAA"}));

