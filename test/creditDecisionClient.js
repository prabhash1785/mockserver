/**
 * client code to call getCreditDecision Mock Server and fetch response.
 *
 * Created by Prabhash Rathore on 12/22/14.
 */

'use strict';

var mockServer = require('../lib/MockServer');

var creditDecisionRequest = {
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

var creditDecisionResponse = mockServer.getMockData(creditDecisionRequest);

//print the response in pretty format
console.log("Credit Decision Service Response: " + JSON.stringify(creditDecisionResponse, null, 4));
