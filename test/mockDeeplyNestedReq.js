/**
 * Unit Test mock server API for deeply nested requests.
 *
 * Created by Prabhash Rathore on 8/23/15.
 */

'use strict';

var assert = require('assert');
var mockServer = require('../lib/MockServer');

describe('Deeply nested requests map', function() {

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

        it('should get successful mock response for nested request', function() {

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
    
});