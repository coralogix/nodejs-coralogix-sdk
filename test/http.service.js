var describe = require('mocha').describe;
var it = require('mocha').it;
var assert = require('assert');
var rxjs = require("rxjs");
var log_entry = require('../dist/entities/log');
var bulk_entry = require('../dist/entities/bulk');
var logger_config_entry = require('../dist/entities/LoggerConfig');
var http_service = require('../dist/http.service');

describe('HttpHelper', function () {
    describe('#sendBulk()', function () {
        it('should send logs bulk to Coralogix', function () {
            var bulk_instance = bulk_entry.Bulk.bulkFromConfig(new logger_config_entry.LoggerConfig({
                privateKey: process.env.PRIVATE_KEY,
                applicationName: process.env.APP_NAME || 'NodeJS',
                subsystemName: process.env.SUBSYSTEM_NAME || 'Test',
                debug: false
            }));

            bulk_instance.logEntries = [
                new log_entry.Log({
                    threadId: '1234',
                    severity: log_entry.Severity.debug,
                    category: 'CORALOGIX',
                    className: 'Class name',
                    methodName: 'Method name',
                    text: 'Test message',
                })
            ];

            var http_response = http_service.HttpHelper.sendBulk(bulk_instance);

            assert.equal(http_response instanceof rxjs.Observable, true);

            var subscription = http_response.subscribe(
                next => assert.equal(next.response.statusCode, 200)
            );
            subscription.unsubscribe();
        });

        describe('Error catching', function () {
            it('should fails with invalid private key', function () {
                var bulk_instance = bulk_entry.Bulk.bulkFromConfig(new logger_config_entry.LoggerConfig({
                    privateKey: 'invalid',
                    applicationName: process.env.APP_NAME || 'NodeJS',
                    subsystemName: process.env.SUBSYSTEM_NAME || 'Test',
                    debug: false
                }));

                bulk_instance.logEntries = [
                    new log_entry.Log({
                        threadId: '1234',
                        severity: log_entry.Severity.debug,
                        category: 'CORALOGIX',
                        className: 'Class name',
                        methodName: 'Method name',
                        text: 'Test message',
                    })
                ];

                var http_response = http_service.HttpHelper.sendBulk(bulk_instance);

                assert.equal(http_response instanceof rxjs.Observable, true);

                var subscription = http_response.subscribe(
                    next => assert.equal(next.response.statusCode, 200),
                    error => assert.equal(error.code, 401)
                );
                subscription.unsubscribe();
            });
        });
    });

    describe('HTTPResponse', function () {
        describe('#HTTPResponse()', function () {
            it('should be filled by response data', function () {
                var response = new http_service.HttpHelper.HTTPResponse(
                    'response',
                    'body'
                );
                assert.notEqual(response.response, 'undefined');
                assert.notEqual(response.body, 'undefined');
            });
        });
    });
});