var describe = require('mocha').describe;
var it = require('mocha').it;
var before = require('mocha').before;
var after = require('mocha').after;
var assert = require('assert');
var rxjs = require("rxjs");
var log_entry = require('../dist/entities/log');
var logger_manager = require('../dist/logger.manager');
var logger_config = require('../dist/entities/LoggerConfig');

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
});