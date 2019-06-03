import {Log, Severity} from "./entities/log";
import {Observable, Subject} from "rxjs";
import {CoralogixLogger} from "./index";
import {LoggerConfig} from "./entities/LoggerConfig";
import {BufferPredicateOrObservable, BufferPredicateOrObservableOperator} from "./rxOperators/buffer-predicate-or-observable.operator";
import {rxHelper} from "./helpers/rx.helper";
const test_key = "";
const prod_key = "";

class Tester{
    count:number = 0;
    logger:CoralogixLogger = new CoralogixLogger("My Node Tester");

    constructor(){
        this.configGlobal();
    }

    private configGlobal(){
        const config = new LoggerConfig({
            applicationName:"node tester",
            privateKey:prod_key,
            subsystemName:"node tester sub"
        });


        CoralogixLogger.configure(config);
    }

    demo(){
//          Observable.interval(1).subscribe(() =>{
        this.addDemoLine();
        //        });
    }

    close(){
        CoralogixLogger.close();
    }


    callstaskLog():Log{
        const tmp:Log = new Log();
        try{
            throw new Error('test error');
        }
        catch (err){
            tmp.text = err.stack;
        }

        tmp.severity = Math.floor(Math.random() * 6 +1);
        tmp.category = "NodeCAT";
        return tmp;
    }

    demoLog():Log{
        const tmp:Log = new Log();
        let a = {
            "hello": "world",
            "instanceName": "instanceName",
            "instanceId": "1"
        };
        tmp.text =a

        tmp.severity = Math.floor(Math.random() * 6 +1);
        tmp.category = "Test1000-6";
        return tmp;
    }

    nullLog(){
        const tmp:Log = new Log();
        tmp.text = null;
        tmp.severity = Severity.info;
        tmp.category = "Test1000-6";
        return tmp;
    }

    wrongSevLog(){
        const tmp:Log = new Log();
        tmp.text = null;
        tmp.severity = -1;
        tmp.category = "Test1000-6";
        return tmp;
    }

    jsonDemoLog():Log{
        const tmp:Log = new Log();
        tmp.text = JSON.stringify({"Zohar":"Baharon"});
        tmp.severity = Math.floor(Math.random() * 6 +1);
        tmp.category = "Test1000-5";
        return tmp;
    }

    addDemoLine(){
        this.count++;
        const tmp:Log = this.demoLog();
        this.logger.addLog(tmp);
    }


}

const tester = new Tester();


