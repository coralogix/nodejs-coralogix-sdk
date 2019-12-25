var describe = require('mocha').describe;
var it = require('mocha').it;
var assert = require('assert');
var constants = require('../../dist/constants')
var log_entry = require('../../dist/entities/log');

describe('Log', function () {
    describe('#Log()', function () {
        it('should return empty if no data passed', function () {
            assert.equal(typeof log_entry.Log(), 'undefined');
        });
        it('should return new instance', function () {
            assert.equal(typeof log_entry.Log({
                threadId: '1234',
                severity: log_entry.Severity.debug,
                category: 'CORALOGIX',
                className: 'Class name',
                methodName: 'Method name',
                text: 'Test message',
                timestamp: Date.now()
            }), 'undefined');
        });
    });

    describe('#fillDefaultValidValues()', function () {
        it('should fill empty values of log record', function () {
            var log = new log_entry.Log({
                threadId: null,
                severity: null,
                category: null,
                className: null,
                methodName: null,
                text: null,
            });

            log_entry.Log.fillDefaultValidValues(log);

            assert.equal(log.severity, log_entry.Severity.debug);
            assert.equal(log.category, constants.Constants.EMPTY_CATEGORY);
            assert.equal(log.text, constants.Constants.EMPTY_TEXT);
        });
        it('should converts non string log text to string', function () {
            var log = new log_entry.Log({
                threadId: null,
                severity: null,
                category: null,
                className: null,
                methodName: null,
                text: 1,
            });

            log_entry.Log.fillDefaultValidValues(log);

            assert.equal((typeof log.text), 'string');
        });
    });
});

describe('Severity', function () {
    it('debug', function () {
        assert.equal(log_entry.Severity.debug, 1);
    });
    it('verbose', function () {
        assert.equal(log_entry.Severity.verbose, 2);
    });
    it('info', function () {
        assert.equal(log_entry.Severity.info, 3);
    });
    it('warning', function () {
        assert.equal(log_entry.Severity.warning, 4);
    });
    it('error', function () {
        assert.equal(log_entry.Severity.error, 5);
    });
    it('critical', function () {
        assert.equal(log_entry.Severity.critical, 6);
    });
});
