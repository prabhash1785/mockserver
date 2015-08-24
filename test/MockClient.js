/**
 * This is a sample client to connect to Mock Server and fetch a Mock Response. This can be used to Unit Test Mock and used as a reference to connect to Mock Server.
 *
 * Created by Prabhash Rathore on 12/9/14.
 */

var mockServer = require('../lib/MockServer');

var request = {
      /* Sample Request 1 */
    serviceName : "userlifecycleserv",
    apiName : "getAccountDetails",
    accountNumber : "12345",
    city : "Campbell",
    country : "US",
    zipCode : 95008

    /* Sample Request 2 */
//    serviceName : "userlifecycleserv",
//    apiName : "getAccountDetails",
//    accountNumber : "99999",
//    city : "Chicago",
//    country : "US",
//    zipCode : 60070

    /* Sample Request 3 */
//    serviceName : "merchantcashadvanceserv",
//    apiName : "getLoanDetails",
//    customerID : "83467",
//    productCode : "lfgns"

    /* Sample Request 4, example of nested request, this is not supported yet, don't use this, this is only for negative testing */
//    serviceName : "nestedobjectserv",
//    apiName : "getNestedObject",
//    customerID : "83467",
//    productCode : "lfgns",
//    subjects : ["English", "Math"],
//    address : {
//        street : "2121 N 1st St",
//        city : "San Jose"
//    },
//    pastCountries : [
//        "India",
//        "US"
//    ]
};

var response = mockServer.getMockData(request);
console.log("Here is Mock Response: " + JSON.stringify(response, null, 4));
