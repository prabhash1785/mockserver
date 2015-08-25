/**
 * Unit Test Mock Server implementation for flat objects equality.
 *
 * Created by Prabhash Rathore on 1/7/15.
 */

'use strict';

var assert = require('assert');
var mockServer = require('../lib/MockServer');

/*
 * Unit Test Suite written using Mocha's TDD style test
 *
 * To run this unit test suite, run following from command line:
 * mocha FlatObjectEqualityTest.js -u tdd
 *
 */
suite("Flat Object Equality with Mock", function() {

    var request = {
        serviceName : "merchantcashadvanceserv",
        apiName : "getCreditDecision",
        "customerID" : 12345,
        "actorID" : 9513,
        "industryTypeID" : 125,
        "fundsUsageID" : 73298,
        "yearBusinessEstablished" : 2005,
        "contactTitleID" : 92634,
        "businessTypeID" : 27156,
        "dba" : "dba",
        "ssn" : "xxx-xx-1234",
        "ein" : "205129865",
        "itin" : "itin27548",
        "firstName" : "Adam",
        "lastName" : "Levine",
        "accountType" : "Business",
        "homePhoneNumber" : "408-231-6219",
        "businessPhoneNumber" : "408-123-9234",
        "businessName" : "Super Market",
        "dob" : "Aug 10, 1980",
        "address" : "2121 N 1st St, San Jose, CA 95001"
    };

    var response = mockServer.getMockData(request);

    test("Property Equality Test", function() {
        assert.equal(response.apy, 2.95);
        assert.equal(response.maxCreditLine, 4);
        assert.equal(response.status, "APPROVED");
        assert.equal(response.internalDeclineReason, 5);
    });

    test("Property Inequality Test", function() {
        assert.notEqual(response.apy, 3.95);
        assert.notEqual(response.maxCreditLine, 7);
        assert.notEqual(response.status, "DECLINED");
        assert.notEqual(response.internalDeclineReason, 75);
    });

    test("Test Error scenario from getCreditDecision Service", function() {
        var req = {
            serviceName : "merchantcashadvanceserv",
            apiName : "getCreditDecision",
            "customerID" : 12345,
            "actorID" : 9513,
            "industryTypeID" : 125,
            "fundsUsageID" : 73298,
            "yearBusinessEstablished" : 2005,
            "contactTitleID" : 92634,
            "businessTypeID" : 27156,
            "dba" : "dba",
            "ssn" : "xxx-xx-1234",
            "ein" : "205129865",
            "itin" : "itin27548",
            "firstName" : "Adam",
            "lastName" : "Levine",
            "accountType" : "Business",
            "homePhoneNumber" : "408-231-6219",
            "businessPhoneNumber" : "408-123-9234",
            "businessName" : "Super Market"
        };

        var res = mockServer.getMockData(req);

        assert.equal(res.errorCode, 404);
        assert.equal(res.errorMessage, "Invalid Request, no matching response found!");

    });

});


