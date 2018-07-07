[![npm version](https://badge.fury.io/js/coralogix.svg)](http://badge.fury.io/js/coralogix)
-----



## Description
Use coralogix-logger-winston to easily add a transport to winston inorder to send your logs to [Coralogix's](http://www.coralogix.com) log analytics platform.

## Installation

```sh
npm install --save coralogix-logger-winston
```

### Javascript example (see ts example below)
```js
var winston = require("winston");
var CoralogixWinston = require("coralogix-logger-winston");

// global configuration for coralogix
var config = {
    privateKey: "9626c7dd-8174-5015-a3fe-5572e042b6d9",
    applicationName: "YOUR APP NAME",
    subsystemName: "YOUR SUBSYSTEM",
};

CoralogixWinston.CoralogixTransport.configure(config);

// configure winston to user coralogix transport
winston.configure({
    transports: [new CoralogixWinston.CoralogixTransport({
        category: "YOUR CATEGORY"
    })]
});

// use winston
winston.info("use winston to send your logs to coralogix");
 
```


### Typescript example
```typescript
import * as winston from "winston";
import {CoralogixTransport} from "coralogix-logger-winston";

// global configuration for private key, application name, subsystem name 
const config = {
    privateKey: "YOUR PRIVATE KEY",
    applicationName: "YOUR APP NAME",
    subsystemName: "YOUR SUBSYSTEM"
}

CoralogixTransport.configure(config);


winston.configure({
    transports:[new CoralogixTransport({
        category:"Yoni"
    })]
})

winston.info("use winston to send your logs to coralogix");
```
