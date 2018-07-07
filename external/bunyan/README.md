[![npm version](https://badge.fury.io/js/coralogix.svg)](http://badge.fury.io/js/coralogix)
-----

## Description
Use coralogix-logger-bunyan to easily add a stream to bunyan in order to send your logs to [Coralogix's](http://www.coralogix.com) log analytics platform.

## Installation

```sh
npm install --save coralogix-logger-bunyan
```

### Javascript example (see ts example below)
```js
var bunyan = require("bunyan");
var CoralogixBunyan = require("coralogix-logger-bunyan");

// global configuration for coralogix
var config = {
    privateKey: "YOUR PRIVATE KEY",
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
```


### Typescript example
```typescript
import * as bunyan from "bunyan";
import {CoralogixStream} from "coralogix-logger-stram";

const config = {
    privateKey: "YOUR KEY",
    applicationName: "YOUR APPLICATION NAME",
    subsystemName: "YOUR SUBSYSTEM"
}

CoralogixStream.configure(config);

var logger = bunyan.createLogger({
    name: 'BUNYAN_ROOT',
    streams: [
        {
            level: 'info',
            stream: new CoralogixStream({category:"ROOT"}),
            type: 'raw'
        }
    ]
});

logger.info('hello world');

let childLogger = logger.child({category:"CHILD CATEGORY"});
childLogger.error("hello from child logger");
```