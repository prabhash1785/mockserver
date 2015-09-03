/**
 * End to End test test.
 *
 * Created by prrathore on 8/31/15.
 */

'use strict';

var MockServer = require('../index');
var assert = require('assert');

describe('End to end flow test', function() {

    describe('test mock server with default configuration', function() {

        var mockServer = new MockServer();

        it('should return successful response for flat level request', function() {

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

        it('should return successful response for deeply nested request', function() {

            var apiContext = {
                serviceName : 'nestedobjectserv',
                apiName : 'getNestedObject'
            };

            var nestedReq = {
                customerID: '83467',
                productCode: 'lfgns',
                subjects: ['English', 'Math'],
                address: {
                    street: '2121 N 1st St',
                    city : 'San Jose'
                },
                pastCountries : [
                    'India',
                    'US'
                ]
            };

            var response = mockServer.getMockDataForNestedReq(apiContext, nestedReq);

            assert.equal(response.customerID, '12345');
            assert.equal(response.productCode, 'abcde');
            assert.equal(response.loan.loanAmount, 500);
            assert.equal(response.loan.loanCurrency, 'USD');

        });

    });

    describe('test mock server with default configuration', function() {

        var config = {
            rulesPath: '',
            dataPath: ''
        };

        var mockServer = new MockServer(config);

        it('should return successful response for flat level request', function() {

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

        it('should return successful response for deeply nested request', function() {

            var apiContext = {
                serviceName : 'nestedobjectserv',
                apiName : 'getNestedObject'
            };

            var nestedReq = {
                customerID: '83467',
                productCode: 'lfgns',
                subjects: ['English', 'Math'],
                address: {
                    street: '2121 N 1st St',
                    city : 'San Jose'
                },
                pastCountries : [
                    'India',
                    'US'
                ]
            };

            var response = mockServer.getMockDataForNestedReq(apiContext, nestedReq);

            assert.equal(response.customerID, '12345');
            assert.equal(response.productCode, 'abcde');
            assert.equal(response.loan.loanAmount, 500);
            assert.equal(response.loan.loanCurrency, 'USD');

        });

    });

});