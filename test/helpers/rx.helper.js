var describe = require('mocha').describe;
var it = require('mocha').it;
var assert = require('assert');
var rxjs = require("rxjs");
var rx_helper = require('../../dist/helpers/rx.helper');
var constants = require('../../dist/constants');

describe('rxHelper', function () {
    describe('#makePausable()', function () {
        it('should be an Observable instance', function () {
            var pauser = rx_helper.rxHelper.makePausable(
                rxjs.Observable.interval(constants.Constants.NORMAL_SEND_SPEED_INTERVAL),
                new rxjs.Subject()
            );
            assert.equal(pauser instanceof rxjs.Observable, true);
        });
    });

    describe('#makeReset()', function () {
        it('should be an Observable instance', function () {
            var pauser = rx_helper.rxHelper.makeReset(
                rxjs.Observable.interval(constants.Constants.NORMAL_SEND_SPEED_INTERVAL),
                new rxjs.Subject()
            );
            assert.equal(pauser instanceof rxjs.Observable, true);
        });
    });
});