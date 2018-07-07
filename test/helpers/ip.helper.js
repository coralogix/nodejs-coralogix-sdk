var describe = require('mocha').describe;
var it = require('mocha').it;
var assert = require('assert');
var ip_helper = require('../../dist/helpers/ip.helper');

describe('IPHelper', function () {
    describe('#getIp()', function () {
        it('should be a string', function () {
            assert.equal(typeof ip_helper.IPHelper.getIp(), 'string');
        });
    });
    describe('#getComputerName()', function () {
        it('should be a string', function () {
            assert.equal(typeof ip_helper.IPHelper.getComputerName(), 'string');
        });
    });
});