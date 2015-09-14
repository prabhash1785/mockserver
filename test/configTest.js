/**
 * Created by prrathore on 9/4/15.
 */

var assert = require('assert');
var MockServer = require('../index');

describe('config test', function() {

    it('should use default configurations if no custom configuration is provided', function() {

        var mockServer = new MockServer();

        var apiContext = {
            serviceName: 'userDataService',
            apiName: 'getUserData'
        };

        var req = {
            accountNumber : '12345',
            city : 'Campbell',
            country : 'US',
            zipCode : 95008
        };

        var response = mockServer.getMockData(apiContext, req);

        assert.equal(response.customerID, '12345');
        assert.equal(response.productCode, 'abcde');
        assert.equal(response.customer.firstName, 'Foo');
        assert.equal(response.customer.lastName, 'Bar');
        assert.equal(response.customer.address.line1, '2121 N First St');
        assert.equal(response.customer.address.line2, 'Site 45');
        assert.equal(response.customer.address.city, 'Campbell');
        assert.equal(response.customer.address.state, 'CA');
        assert.equal(response.customer.address.zipCode, 95008);

    });

    it('should use default configuration if custom configuration is undefined', function() {

        var mockServer = new MockServer(undefined);

        var apiContext = {
            serviceName: 'userDataService',
            apiName: 'getUserData'
        };

        var req = {
            accountNumber : '12345',
            city : 'Campbell',
            country : 'US',
            zipCode : 95008
        };

        var response = mockServer.getMockData(apiContext, req);

        assert.equal(response.customerID, '12345');
        assert.equal(response.productCode, 'abcde');
        assert.equal(response.customer.firstName, 'Foo');
        assert.equal(response.customer.lastName, 'Bar');
        assert.equal(response.customer.address.line1, '2121 N First St');
        assert.equal(response.customer.address.line2, 'Site 45');
        assert.equal(response.customer.address.city, 'Campbell');
        assert.equal(response.customer.address.state, 'CA');
        assert.equal(response.customer.address.zipCode, 95008);

    });

    it('should use default configuration if custom configuration is null', function() {

        var mockServer = new MockServer(null);

        var apiContext = {
            serviceName: 'userDataService',
            apiName: 'getUserData'
        };

        var req = {
            accountNumber : '12345',
            city : 'Campbell',
            country : 'US',
            zipCode : 95008
        };

        var response = mockServer.getMockData(apiContext, req);

        assert.equal(response.customerID, '12345');
        assert.equal(response.productCode, 'abcde');
        assert.equal(response.customer.firstName, 'Foo');
        assert.equal(response.customer.lastName, 'Bar');
        assert.equal(response.customer.address.line1, '2121 N First St');
        assert.equal(response.customer.address.line2, 'Site 45');
        assert.equal(response.customer.address.city, 'Campbell');
        assert.equal(response.customer.address.state, 'CA');
        assert.equal(response.customer.address.zipCode, 95008);

    });

    it('should throw error if custom configuration object is not in right format', function() {

        assert.throws(function() {
            var mockServer = new MockServer('someConfiguration');
        }, Error);

        assert.throws(function() {
            var mockServer = new MockServer('someConfiguration');
        }, 'Need rules file path where your have defined mock server rules');

    });

    it('should throw error if custom configuration object does not have rules file path with right key name', function() {

        assert.throws(function() {
            var mockServer = new MockServer({
                newRulesPath: '../rules',
                dataPath: '../data'
            });
        }, Error);

        assert.throws(function() {
            var mockServer = new MockServer('someConfiguration');
        }, 'Need rules file path where your have defined mock server rules');

    });

    it('should throw error if custom configuration object does not have data file path with right key name', function() {

        assert.throws(function() {
            var mockServer = new MockServer({
                rulesPath: '../rules',
                customDataPath: '../data'
            });
        }, Error);

        assert.throws(function() {
            var mockServer = new MockServer('someConfiguration');
        }, 'Need data file path where your have copied all your response data');

    });

    it('should accept custom configuration while creating mock server and verify custom configuration is set', function() {

        var customConfiguration = {
            rulesPath: './data/rules',
            dataPath: './data/mockResponse'
        }
        
        var config = require('../lib/config');
        config.setConfig(customConfiguration);

        assert.equal(config.getConfig().rulesPath, './data/rules');
        assert.equal(config.getConfig().dataPath, './data/mockResponse');

    });

});
