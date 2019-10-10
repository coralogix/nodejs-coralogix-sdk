import * as winston from "winston";
import {Log, Severity,CoralogixLogger,Constants} from "coralogix-logger";
import { stringify } from "querystring";

const sev_map = {
    silly: Severity.verbose,
    verbose: Severity.verbose,
    info: Severity.info,
    http: Severity.info,
    warn: Severity.warning,
    error: Severity.error,
    silent: Severity.verbose,
    critical: Severity.critical,
    debug: Severity.debug
}

export class CoralogixTransport extends winston.Transport{
    static options;
    logger:CoralogixLogger;
    name:string
    debugMode:boolean;
    timestamp:() => any;

    constructor(options){
        options = Object.assign({},CoralogixTransport.options,options);
        super(options);
        this.options = options;
        this.logger = new CoralogixLogger(options.category);
        this.name = "Coralogix Transport";
        if(options.timestamp) {
            this.timestamp = options.timestamp;
        }
    }

    log(level, msg, meta, callback) {
        meta = Object.assign(meta, this.options.extraFields);
        const log:Log = new Log();
        log.severity = sev_map[level];

        if(this.formatter) {
            let formatterOptions = Object.assign({},this,{
                meta: meta,
                message: msg,
                level: level
            });
            msg = this.formatter(formatterOptions);
        }

        log.text = msg;

        if(meta){
            log.className = meta.className;
            log.methodName = meta.methodName;
            log.threadId = meta.threadId;
            delete meta.className;
            delete meta.methodName;
            delete meta.threadId;
            delete meta.category;
            delete meta.level;
            delete meta.message;
            
            if(Object.keys(meta).length > 0){
                if(msg)
                    meta.msg = msg;                
                log.text = meta;
            }
            if(meta instanceof Error){
                log.text = meta.message + meta.stack;
                if(msg)
                    log.text = msg + '\n' + log.text;                
            }
        }

        this.logger.addLog(log);
        callback(null, true);
    }

    static configure(config:any){
        CoralogixLogger.configure(config);
        CoralogixTransport.options = config;    
    }
}

let winstonTransports:any = winston.transports;
winstonTransports.Coralogix = CoralogixTransport;
