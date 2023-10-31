import axios, { AxiosRequestConfig } from 'axios';
import { Observable } from 'rxjs';
import { Constants } from './constants';
import { LoggerConfig } from './entities/LoggerConfig';
import * as url from 'url';

export namespace HttpHelper {
    export function sendBulk(jsonData: any, config: LoggerConfig): Observable<HTTPResponse> {
        const options: AxiosRequestConfig = {
            data: jsonData,
            method: 'POST',
            timeout: Constants.HTTP_TIMEOUT,
            url: Constants.CORALOGIX_LOG_URL,
            headers: {
                'Content-Type': 'application/json',
            },
        };
        if (config.proxyUri) {
            const parsedUrl = url.parse(config.proxyUri);
            options.proxy = {
                host: parsedUrl.hostname,
                port: parseInt(parsedUrl.port),
            };
        }

        return new Observable(observer => {
            axios(options)
                .then(response => {
                    observer.next(new HTTPResponse(response, response.data));
                    observer.complete();
                })
                .catch(error => {
                    observer.error(error);
                });
        });
    }

    export class HTTPResponse {
        public response: any;
        public body: any;

        constructor(response, body) {
            this.response = response;
            this.body = body;
        }
    }
}