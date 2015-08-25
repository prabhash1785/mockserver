/**
 * Created by Prabhash Rathore on 8/23/15.
 */

'use strict';

var mockServer = require('../lib/MockServer');

var apiContext1 = {
    serviceName : "userlifecycleserv",
    apiName : "getAccountDetails"
};

var flatrequest = {
    "accountNumber" : "12345",
    "city" : "Campbell",
    "country" : "US",
    "zipCode" : 95008
}

//var res = mockServer.getMockDataForNestedReq(apiContext1, flatrequest);
//console.log("Here is Mock Response: " + JSON.stringify(res, null, 4));

// nested req obj
var apiContext2 = {
    serviceName : "nestedobjectserv",
    apiName : "getNestedObject"
};

var nestedReq = {
    "customerID" : "83467",
    "productCode" : "lfgns",
    "subjects" : ["English", "Math"],
    "address" : {
        "street" : "2121 N 1st St",
        "city" : "San Jose"
    },
    "pastCountries" : [
        "India",
        "US"
    ]
};

var nestedMockRes = mockServer.getMockDataForNestedReq(apiContext2, nestedReq);
console.log(JSON.stringify(nestedMockRes, null, 4));