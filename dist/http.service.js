"use strict";
var axios_1 = require("axios");
var rxjs_1 = require("rxjs");
var constants_1 = require("./constants");
var url = require("url");
var HttpHelper;
(function (HttpHelper) {
    function sendBulk(jsonData, config) {
        var options = {
            data: jsonData,
            method: 'POST',
            timeout: constants_1.Constants.HTTP_TIMEOUT,
            url: constants_1.Constants.CORALOGIX_LOG_URL,
            headers: {
                'Content-Type': 'application/json',
            },
        };
        if (config.proxyUri) {
            var parsedUrl = url.parse(config.proxyUri);
            options.proxy = {
                host: parsedUrl.hostname,
                port: parseInt(parsedUrl.port),
            };
        }
        return new rxjs_1.Observable(function (observer) {
            axios_1.default(options)
                .then(function (response) {
                observer.next(new HTTPResponse(response, response.data));
                observer.complete();
            })
                .catch(function (error) {
                observer.error(error);
            });
        });
    }
    HttpHelper.sendBulk = sendBulk;
    var HTTPResponse = (function () {
        function HTTPResponse(response, body) {
            this.response = response;
            this.body = body;
        }
        return HTTPResponse;
    }());
    HttpHelper.HTTPResponse = HTTPResponse;
})(HttpHelper = exports.HttpHelper || (exports.HttpHelper = {}));
