/**
 * Unit Test Mock Server implementation for flat request objects
 *
 * Created by Prabhash Rathore on 1/7/15
 */

'use strict';

var assert = require('assert');

var mockServer = require('../lib/MockServer');


describe('Flat requests mock', function() {

    describe('successful mock response', function() {

        it('should find a succesful mock response for request', function() {

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

    });

    describe('404 Error or no matching request', function() {

        it('should return 404 error', function() {

            var apiContext = {
                serviceName: 'addressService',
                apiName: 'getAddress'
            };

            var req = {
                accountNumber : '5674876'
            };

            var response = mockServer.getMockData(apiContext, req);

            assert.equal(response.errorCode, 404);
            assert.equal(response.errorMessage, 'Invalid Request, no matching response found!');

        });

    });

    describe('input validations', function() {

        it('should throw exception for invalid parameters', function() {

            var apiContext = {
                serviceName: 'addressService',
                apiName: 'getAddress'
            };

            var req = {
                accountNumber : '12345',
                city : 'Campbell',
                country : 'US',
                zipCode : 95008
            };

            assert.throws(function() {
                mockServer.getMockData(undefined, req);
            }, /Missing API context. Need a valid service context like api name, api method to get mock data/);

            assert.throws(function() {
                mockServer.getMockData(function() {
                    return {};
                }, req);
            }, /Function is not accepted as request parameter/);

            assert.throws(function() {
                mockServer.getMockData({}, req);
            }, Error);

            assert.throws(function() {
                mockServer.getMockData({}, req);
            }, /Service Name is required to get Mock Data./);

            assert.throws(function() {
                mockServer.getMockData(apiContext, undefined);
            }, /Undefined Request/);

        });

    });

});


