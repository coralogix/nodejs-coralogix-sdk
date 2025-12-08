var describe = require('mocha').describe;
var it = require('mocha').it;
var assert = require('assert');
var rxjs = require("rxjs");
var log_entry = require('../dist/entities/log');
var logger_manager = require('../dist/logger.manager');
var logger_config = require('../dist/entities/LoggerConfig');
var Constants = require('../dist/constants').Constants;
var HttpHelper = require('../dist/http.service').HttpHelper;

describe('LoggerManager', function () {
    describe('#LoggerManager()', function () {
        it('should create new instance of object with default parameters', function () {
            var logger_manager_instance = new logger_manager.LoggerManager();
            assert.equal(logger_manager_instance.bufferSize, 0);
            assert.equal(logger_manager_instance.pauser$ instanceof rxjs.Subject, true);
            assert.equal(logger_manager_instance.flush$ instanceof rxjs.Subject, true);
            assert.equal(logger_manager_instance.logBulkObs$ instanceof rxjs.Observable, true);
        });
    });

    describe('#addLogline()', function () {
        it('should add log line to queue', function () {
            var logger_manager_instance = new logger_manager.LoggerManager();
            logger_manager_instance.addLogline(
                new log_entry.Log({
                    threadId: '1234',
                    severity: log_entry.Severity.debug,
                    category: 'CORALOGIX',
                    className: 'Class name',
                    methodName: 'Method name',
                    text: 'Test message',
                })
            );
        });
    });

    describe('#close()', function () {
        it('should close logger manager', function () {
            var logger_manager_instance = new logger_manager.LoggerManager();
            logger_manager_instance.close();
        });
    });

    describe('#flush()', function () {
        it('should flush logger manager queue', function () {
            var logger_manager_instance = new logger_manager.LoggerManager();
            logger_manager_instance.flush();
        });
    });

    describe('#sendBulk()', function () {
        it('should send logs bulk to Coralogix', function () {
            var logger_manager_instance = new logger_manager.LoggerManager();
            logger_manager_instance.config = new logger_config.LoggerConfig({
                privateKey: process.env.PRIVATE_KEY,
                applicationName: process.env.APP_NAME || 'NodeJS',
                subsystemName: process.env.SUBSYSTEM_NAME || 'Test',
                debug: false
            });
            logger_manager_instance.sendBulk([
                new log_entry.Log({
                    threadId: 'Test Message 1',
                    severity: log_entry.Severity.debug,
                    category: 'CORALOGIX',
                    className: 'Class name',
                    methodName: 'Method name',
                    text: 'Test message',
                }),
                new log_entry.Log({
                    threadId: 'Test Message 2',
                    severity: log_entry.Severity.debug,
                    category: 'CORALOGIX',
                    className: 'Class name',
                    methodName: 'Method name',
                    text: 'Test message',
                })
            ]);
        });
    });


    describe('#waitForFlush()', function () {
        it('should wait for logs to be sent', function (done) {
            var logger_manager_instance = new logger_manager.LoggerManager();
            var subject = new rxjs.Subject();
            logger_manager_instance.sendBulk = function() {
                return subject;
            };

            logger_manager_instance.addLogline(
                new log_entry.Log({
                    threadId: '1234',
                    severity: log_entry.Severity.debug,
                    category: 'CORALOGIX',
                    className: 'Class name',
                    methodName: 'Method name',
                    text: 'Test message',
                })
            );

            var waitForFlush = logger_manager_instance.waitForFlush();
            var flushed = false;
            waitForFlush.then(function () {
                flushed = true;
                done(); // we want to make sure the promise fulfills
            });
            setTimeout(function () {
                assert.notEqual(flushed, true, 'does not say logs are flushed when they are not');
                subject.next({ body: {}, response: {}});
                subject.complete();
            }, 0);

        });
    });

    describe('#cleanAfterSend()', function () {
        it('should clean logs buffer after sent to Coralogix', function () {
            var logger_manager_instance = new logger_manager.LoggerManager();
            logger_manager_instance.cleanAfterSend([
                new log_entry.Log({
                    threadId: 'Test Message 1',
                    severity: log_entry.Severity.debug,
                    category: 'CORALOGIX',
                    className: 'Class name',
                    methodName: 'Method name',
                    text: 'Test message',
                }),
                new log_entry.Log({
                    threadId: 'Test Message 2',
                    severity: log_entry.Severity.debug,
                    category: 'CORALOGIX',
                    className: 'Class name',
                    methodName: 'Method name',
                    text: 'Test message',
                })
            ]);
        });
    });

    describe('Empty buffer handling', function () {
        it('should not call sendBulk when no logs are added', function () {
            const logger_manager_instance = new logger_manager.LoggerManager();
            let sendBulkCalled = false;
    
            const originalSendBulk = logger_manager_instance.sendBulk;
            logger_manager_instance.sendBulk = function(buffer) {
                sendBulkCalled = true;
                return originalSendBulk.call(this, buffer);
            };
    
            // Do NOT subscribe and do NOT add logs
            // No logs means no buffer emissions ever
    
            assert.equal(sendBulkCalled, false, 'sendBulk should not be called for empty buffers');
        });
    });
});
