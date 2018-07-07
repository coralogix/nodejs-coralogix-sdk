var describe = require('mocha').describe;
var it = require('mocha').it;
var assert = require('assert');
var sizeof = require("object-sizeof");
var log_entry = require('../../dist/entities/log');
var logs_buffer_entry = require('../../dist/entities/logs.buffer');

describe('LogsBuffer', function () {
    describe('#LogsBuffer()', function () {
        it('should fill logs buffer with log lines', function () {
            var logs_buffer = new logs_buffer_entry.LogsBuffer([
                log_entry.Log({
                    threadId: '1234',
                    severity: log_entry.Severity.debug,
                    category: 'CORALOGIX',
                    className: 'Class name',
                    methodName: 'Method name',
                    text: 'Test message 1',
                }),
            ]);
            assert.equal(logs_buffer.logs.length, 1);
        });

        it('should create logs buffer with empty list', function () {
            var logs_buffer = new logs_buffer_entry.LogsBuffer();
            assert.equal(logs_buffer.logs.length, 0);
        });
    });

    describe('size', function () {
        it('should return size of LogsBuffer object', function () {
            var logs_buffer = new logs_buffer_entry.LogsBuffer([
                log_entry.Log({
                    threadId: '1234',
                    severity: log_entry.Severity.debug,
                    category: 'CORALOGIX',
                    className: 'Class name',
                    methodName: 'Method name',
                    text: 'Test message 2',
                }),
            ]);
            assert.equal(logs_buffer.size, sizeof(logs_buffer.logs));
        });
    });
});