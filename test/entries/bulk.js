var describe = require('mocha').describe;
var it = require('mocha').it;
var assert = require('assert');
var constants = require('../../dist/constants');
var ip_helper = require('../../dist/helpers/ip.helper');
var bulk_entry = require('../../dist/entities/bulk');

describe('Bulk', function () {
    describe('#Bulk()', function () {
        it('should return instance with default values', function () {
            var bulk = new bulk_entry.Bulk();
            assert.equal(bulk.applicationName, constants.Constants.NO_APP_NAME);
            assert.equal(bulk.subsystemName, constants.Constants.NO_SUB_SYSTEM);
            assert.equal(bulk.computerName, ip_helper.IPHelper.getComputerName());
            assert.equal(bulk.IPAddress, ip_helper.IPHelper.getIp());
        });
    });

    describe('#bulkFromConfig()', function () {
        it('should fill bulk with user values', function () {
            var privateKey = 'ca290f7c-460b-4e50-a64b-460d9b373086';
            var applicationName = 'NodeJS test';
            var subsystemName = 'Test subsystem';

            var bulk = bulk_entry.Bulk.bulkFromConfig({
                privateKey: privateKey,
                applicationName: applicationName,
                subsystemName: subsystemName
            });

            assert.equal(bulk.privateKey, privateKey);
            assert.equal(bulk.applicationName, applicationName);
            assert.equal(bulk.subsystemName, subsystemName);
        });

        it('should fill bulk with default private key', function () {
            var applicationName = 'NodeJS test';
            var subsystemName = 'Test subsystem';

            var bulk = bulk_entry.Bulk.bulkFromConfig({
                privateKey: null,
                applicationName: applicationName,
                subsystemName: subsystemName
            });

            assert.equal(bulk.privateKey, constants.Constants.FAILED_PRIVATE_KEY);
            assert.equal(bulk.applicationName, applicationName);
            assert.equal(bulk.subsystemName, subsystemName);
        });

        it('should fill bulk with default application name', function () {
            var privateKey = 'ca290f7c-460b-4e50-a64b-460d9b373086';
            var subsystemName = 'Test subsystem';

            var bulk = bulk_entry.Bulk.bulkFromConfig({
                privateKey: privateKey,
                applicationName: null,
                subsystemName: subsystemName
            });

            assert.equal(bulk.privateKey, privateKey);
            assert.equal(bulk.applicationName, constants.Constants.NO_APP_NAME);
            assert.equal(bulk.subsystemName, subsystemName);
        });

        it('should fill bulk with default subsystem name', function () {
            var privateKey = 'ca290f7c-460b-4e50-a64b-460d9b373086';
            var applicationName = 'NodeJS test';

            var bulk = bulk_entry.Bulk.bulkFromConfig({
                privateKey: privateKey,
                applicationName: applicationName,
                subsystemName: null
            });

            assert.equal(bulk.privateKey, privateKey);
            assert.equal(bulk.applicationName, applicationName);
            assert.equal(bulk.subsystemName, constants.Constants.NO_SUB_SYSTEM);
        });
    });
});