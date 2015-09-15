/**
 * Unit Test mock server API for deeply nested requests.
 *
 * Created by Prabhash Rathore on 8/23/15.
 */

'use strict';

var assert = require('assert');
var mockServer = require('../lib/mockServer');

describe('Deeply nested requests map', function() {

    before('set up config object with default values', function() {
       var config = require('../lib/config');
        config.setConfig({
            rulesPath: '/rules',
            dataPath: '/data'
        });
    });

    describe('successful mock response for deeply nested request', function() {

       it('should get successful mock response for nested request', function() {

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

    describe('successful mock response for flat request', function() {

        it('should get successful mock response for flat request', function() {

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

            var response = mockServer.getMockDataForNestedReq(apiContext, req);

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

    describe('RESTful webservice style response', function() {

        it('should get successful mock REST style response for nested request', function() {

            var apiContext = {
                serviceName: 'someRESTfulService',
                apiName: 'accountPreferences'
            };

            var req = {
                accountNumber : '734567',
                location: {
                    state: 'CA',
                    country: 'US'
                }
            };

            var response = mockServer.getMockDataForNestedReq(apiContext, req);

            assert.equal(response.statusCode, 200);
            assert.equal(response.preferences.id, 'ab67ws8');
            assert.equal(response.preferences.accountNumber, '734567');
            assert.equal(response.preferences.paymentMethod, 'Card');
            assert.equal(response.preferences.contactMethod, 'email');
            assert.equal(response.preferences.customer.firstName, 'Iron');
            assert.equal(response.preferences.customer.lastName, 'Man');
            assert.equal(response.preferences.customer.address.line1, '2121 N First St');
            assert.equal(response.preferences.customer.address.line2, 'Site 45');
            assert.equal(response.preferences.customer.address.city, 'Campbell');
            assert.equal(response.preferences.customer.address.state, 'CA');
            assert.equal(response.preferences.customer.address.zipCode, 95008);

            //assert HATEOAS links
            assert.equal(response.preferences.links[0].rel, 'self');
            assert.equal(response.preferences.links[0].href, 'https://somerandomcompany.com/accountPreferences');
            assert.equal(response.preferences.links[1].rel, 'next');
            assert.equal(response.preferences.links[1].href, 'https://somerandomcompany.com/accountPreference?pageID=2');

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

            var response = mockServer.getMockDataForNestedReq(apiContext, req);

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
                mockServer.getMockDataForNestedReq(undefined, req);
            }, /Undefined API Context/);

            assert.throws(function() {
                mockServer.getMockDataForNestedReq(function() {
                    return {};
                }, req);
            }, /Function is not accepted as request parameter/);

            assert.throws(function() {
                mockServer.getMockDataForNestedReq({}, req);
            }, Error);

            assert.throws(function() {
                mockServer.getMockDataForNestedReq({}, req);
            }, /Service Name is required to get Mock Data./);

            assert.throws(function() {
                mockServer.getMockDataForNestedReq(apiContext, undefined);
            }, /Undefined Request/);

        });

    });

});