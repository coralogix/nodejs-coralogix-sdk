import * as bunyan from "bunyan";
import {CoralogixStream} from "./coralogix-bunyan.stream";

const prod_key = "9626c7dd-8174-5015-a3fe-5572e042b6d9";

const config = {
    privateKey: prod_key,
    applicationName: "Bunyan logger",
    subsystemName: "Bunyan system",
    debug:true
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

logger.child({category:"CATEGORY",className:"AAA",methodName:"METHOD",threadId:"threadID"}).error(JSON.stringify({a:"AAA"}));