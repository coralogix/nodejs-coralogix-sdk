var describe = require('mocha').describe;
var it = require('mocha').it;
var assert = require('assert');
var buffer_action = require('../../dist/entities/buffer.action');

describe('BufferAction', function () {
    describe('#BufferAction()', function () {
        it('must have type and payload after initialization', function () {
            var action = new buffer_action.BufferAction('action', 'payload');
            assert.notEqual(typeof action.type, 'undefined');
            assert.notEqual(typeof action.payload, 'undefined');
        });
    });
});