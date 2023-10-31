import { Observable } from 'rxjs';
import { LoggerConfig } from './entities/LoggerConfig';
export declare namespace HttpHelper {
    function sendBulk(jsonData: any, config: LoggerConfig): Observable<HTTPResponse>;
    class HTTPResponse {
        response: any;
        body: any;
        constructor(response: any, body: any);
    }
}
