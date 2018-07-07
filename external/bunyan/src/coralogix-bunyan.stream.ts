import {CoralogixLogger, Constants, Log, Severity} from "coralogix-logger";

const sev_map = {
    10: Severity.debug,
    30: Severity.info,
    40: Severity.warning,
    50: Severity.error,
    60: Severity.critical,
    20: Severity.debug
}

 export class CoralogixStream{
     logger:CoralogixLogger;
     name:string;
     category:string;
     constructor(options){
         if(!options) options ={};

         this.logger = new CoralogixLogger(options.category);
     }

     write(rec){
         const log = new Log();
         log.severity = sev_map[rec.level];
         log.text = rec.msg;
         log.category = rec.category;
         
         if(rec.className)
            log.className = rec.className;

        if(rec.methodName)
            log.methodName = rec.methodName;

        if(rec.threadId)
            log.threadId = rec.threadId;

         this.logger.addLog(log);
     }

     public static configure(config){
         CoralogixLogger.configure(config);
     }
 }