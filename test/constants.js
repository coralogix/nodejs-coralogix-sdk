var describe = require('mocha').describe;
var it = require('mocha').it;
var assert = require('assert');
var constants = require('../dist/constants');

describe('Constants', function () {
    describe('SDK_VERSION', function () {
        it('should be a string', function () {
            assert.equal(typeof constants.Constants.SDK_VERSION, 'string');
        });
    });

    describe('MAX_LOG_BUFFER_SIZE', function () {
        it('should be a number', function () {
            assert.equal(typeof constants.Constants.MAX_LOG_BUFFER_SIZE, 'number');
        });
        it('should be greater than 0', function () {
            assert.equal(constants.Constants.MAX_LOG_BUFFER_SIZE > 0, true);
        });
    });

    describe('MAX_LOG_CHUNK_SIZE', function () {
        it('should be a number', function () {
            assert.equal(typeof constants.Constants.MAX_LOG_CHUNK_SIZE, 'number');
        });
        it('should be greater than 0', function () {
            assert.equal(constants.Constants.MAX_LOG_CHUNK_SIZE > 0, true);
        });
    });

    describe('NORMAL_SEND_SPEED_INTERVAL', function () {
        it('should be a number', function () {
            assert.equal(typeof constants.Constants.NORMAL_SEND_SPEED_INTERVAL, 'number');
        });
        it('should be greater than 0', function () {
            assert.equal(constants.Constants.NORMAL_SEND_SPEED_INTERVAL > 0, true);
        });
    });

    describe('FAST_SEND_SPEED_INTERVAL', function () {
        it('should be a number', function () {
            assert.equal(typeof constants.Constants.FAST_SEND_SPEED_INTERVAL, 'number');
        });
        it('should be greater than 0', function () {
            assert.equal(constants.Constants.FAST_SEND_SPEED_INTERVAL > 0, true);
        });
    });

    describe('TEST_URL', function () {
        it('should be a string', function () {
            assert.equal(typeof constants.Constants.TEST_URL, 'string');
        });
    });

    describe('PROD_URL', function () {
        it('should be a string', function () {
            assert.equal(typeof constants.Constants.PROD_URL, 'string');
        });
    });

    describe('CORALOGIX_LOG_URL', function () {
        it('should be a string', function () {
            assert.equal(typeof constants.Constants.CORALOGIX_LOG_URL, 'string');
        });
        it('should not be null', function () {
            assert.notEqual(constants.Constants.CORALOGIX_LOG_URL, null);
        });
    });

    describe('FAILED_PRIVATE_KEY', function () {
        it('should be a string', function () {
            assert.equal(typeof constants.Constants.FAILED_PRIVATE_KEY, 'string');
        });
    });

    describe('NO_APP_NAME', function () {
        it('should be a string', function () {
            assert.equal(typeof constants.Constants.NO_APP_NAME, 'string');
        });
    });

    describe('NO_SUB_SYSTEM', function () {
        it('should be a string', function () {
            assert.equal(typeof constants.Constants.NO_SUB_SYSTEM, 'string');
        });
    });

    describe('LOG_FILE_NAME', function () {
        it('should be a string', function () {
            assert.equal(typeof constants.Constants.LOG_FILE_NAME, 'string');
        });
    });

    describe('HTTP_TIMEOUT', function () {
        it('should be a number', function () {
            assert.equal(typeof constants.Constants.HTTP_TIMEOUT, 'number');
        });
        it('should be greater than 0', function () {
            assert.equal(constants.Constants.HTTP_TIMEOUT > 0, true);
        });
    });

    describe('HTTP_SEND_RETRY_COUNT', function () {
        it('should be a number', function () {
            assert.equal(typeof constants.Constants.HTTP_SEND_RETRY_COUNT, 'number');
        });
        it('should be greater than 0 or equals', function () {
            assert.equal(constants.Constants.HTTP_SEND_RETRY_COUNT > 0, true);
        });
    });

    describe('HTTP_SEND_RETRY_INTERVAL', function () {
        it('should be a number', function () {
            assert.equal(typeof constants.Constants.HTTP_SEND_RETRY_INTERVAL, 'number');
        });
        it('should be greater than 0', function () {
            assert.equal(constants.Constants.HTTP_SEND_RETRY_INTERVAL > 0, true);
        });
    });

    describe('CORALOGIX_CATEGORY', function () {
        it('should be a string', function () {
            assert.equal(typeof constants.Constants.CORALOGIX_CATEGORY, 'string');
        });
    });

    describe('SYNC_TIME_UPDATE_INTERVAL', function () {
        it('should be a number', function () {
            assert.equal(typeof constants.Constants.SYNC_TIME_UPDATE_INTERVAL, 'number');
        });
        it('should be greater than 0', function () {
            assert.equal(constants.Constants.SYNC_TIME_UPDATE_INTERVAL > 0, true);
        });
    });

    describe('EMPTY_TEXT', function () {
        it('should be a string', function () {
            assert.equal(typeof constants.Constants.EMPTY_TEXT, 'string');
        });
    });

    describe('EMPTY_CATEGORY', function () {
        it('should be a string', function () {
            assert.equal(typeof constants.Constants.EMPTY_CATEGORY, 'string');
        });
    });
});