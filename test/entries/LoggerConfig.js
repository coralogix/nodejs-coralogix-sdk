var describe = require('mocha').describe;
var it = require('mocha').it;
var assert = require('assert');
var constants = require('../../dist/constants')
var logger_config_entry = require('../../dist/entities/LoggerConfig');

describe('LoggerConfig', function () {
    describe('#LoggerConfig()', function () {
        it('should fill logger configuration with user values', function () {
            var privateKey = 'ca290f7c-460b-4e50-a64b-460d9b373086';
            var applicationName = 'NodeJS test';
            var subsystemName = 'Test subsystem';

            var logger_config = new logger_config_entry.LoggerConfig({
                privateKey: privateKey,
                applicationName: applicationName,
                subsystemName: subsystemName,
                debug: false
            });

            assert.equal(logger_config.privateKey, privateKey);
            assert.equal(logger_config.applicationName, applicationName);
            assert.equal(logger_config.subsystemName, subsystemName);
        });

        it('should fill logger configuration with default private key', function () {
            var privateKey = null;
            var applicationName = 'NodeJS test';
            var subsystemName = 'Test subsystem';

            var logger_config = new logger_config_entry.LoggerConfig({
                privateKey: privateKey,
                applicationName: applicationName,
                subsystemName: subsystemName,
                debug: false
            });

            assert.equal(logger_config.privateKey, constants.Constants.FAILED_PRIVATE_KEY);
            assert.equal(logger_config.applicationName, applicationName);
            assert.equal(logger_config.subsystemName, subsystemName);
        });

        it('should fill logger configuration with default application name', function () {
            var privateKey = 'ca290f7c-460b-4e50-a64b-460d9b373086';
            var applicationName = null;
            var subsystemName = 'Test subsystem';

            var logger_config = new logger_config_entry.LoggerConfig({
                privateKey: privateKey,
                applicationName: applicationName,
                subsystemName: subsystemName,
                debug: false
            });

            assert.equal(logger_config.privateKey, privateKey);
            assert.equal(logger_config.applicationName, constants.Constants.NO_APP_NAME);
            assert.equal(logger_config.subsystemName, subsystemName);
        });

        it('should fill logger configuration with default subsystem name', function () {
            var privateKey = 'ca290f7c-460b-4e50-a64b-460d9b373086';
            var applicationName = 'NodeJS test';
            var subsystemName = null;

            var logger_config = new logger_config_entry.LoggerConfig({
                privateKey: privateKey,
                applicationName: applicationName,
                subsystemName: subsystemName,
                debug: false
            });

            assert.equal(logger_config.privateKey, privateKey);
            assert.equal(logger_config.applicationName, applicationName);
            assert.equal(logger_config.subsystemName, constants.Constants.NO_SUB_SYSTEM);
        });
    });
});