var describe = require('mocha').describe;
var it = require('mocha').it;
var before = require('mocha').before;
var after = require('mocha').after;
var assert = require('assert');
var debug_logger = require('../dist/debug.logger');

describe('DebugLogger', function () {
    describe('isDebug', function () {
        it('should be a boolean', function () {
            assert.equal(typeof debug_logger.DebugLogger.isDebug, 'boolean');
        });
        it('by default is false', function () {
            assert.equal(debug_logger.DebugLogger.isDebug, false);
        });
    });

    describe('#d()', function () {
        describe('With Debug mode enabled', function () {
            before(function () {
                debug_logger.DebugLogger.isDebug = true;
            });

            it('should execute without errors', function () {
                assert.equal(debug_logger.DebugLogger.d('Test message'), true);
            });
            it('should execute with additional data without errors', function () {
                assert.equal(debug_logger.DebugLogger.d('Test message', 'Additional data'), true);
            });

            after(function () {
                debug_logger.DebugLogger.isDebug = false;
            });
        });

        describe('With Debug mode disabled', function () {
            it('should execute without errors', function () {
                assert.equal(debug_logger.DebugLogger.d('Test message'), false);
            });
            it('should execute with additional data without errors', function () {
                assert.equal(debug_logger.DebugLogger.d('Test message', 'Additional data'), false);
            });
        });
    });
});