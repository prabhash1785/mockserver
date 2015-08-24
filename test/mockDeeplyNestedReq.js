/**
 * Created by Prabhash Rathore on 8/23/15.
 */

'use strict';

var mockServer = require('../lib/MockServer');

var apiContext = {
    serviceName : "userlifecycleserv",
    apiName : "getAccountDetails"
};
var request = {
    "accountNumber" : "12345",
    "city" : "Campbell",
    "country" : "US",
    "zipCode" : 95008
}
var res = mockServer.getMockDataForNestedReq(apiContext, request);
console.log("Here is Mock Response: " + JSON.stringify(res, null, 4));


function getResponseFromMockServer(req) {

    if(req === undefined) {
        throw "Undefined Request";
    }

    //Move these require statements outside of this function later
    var deepComparator = require('./DeepComparator');

    var flattenedReq = deepComparator.flattenObject(req, []);

    var flattenRulesData = deepComparator.flattenObject(rules, []);

    console.log("Flattened Request:");
    for(var i = 0; i < flattenedReq.length; i++) {
        console.log(flattenedReq[i].key + " :: " + flattenedReq[i].value);
    }

    console.log("Flattened Rules Data:");
    for(var i = 0; i < flattenRulesData.length; i++) {
        console.log(flattenRulesData[i].key + " :: " + flattenRulesData[i].value);
    }


}

//Move it to test file later
//getResponseFromMockServer({
//    location: ['India', 'US'],
//    name : {
//        firstName : 'Ricky',
//        lastName : "Rathore",
//        parents : {
//            father : {
//                a : 'a',
//                b : 'b'
//            },
//            mother : "Emmy"
//        }
//    },
//    age : 29,
//    city : 'San Jose',
//    state : 'CA',
//    country : 'US'
//});