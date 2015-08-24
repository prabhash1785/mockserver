/**
 *
 * This is the core file which will parse request and run a match against the available rules. On successful, it will return matching response file or
 * on match failure, it will return error.
 *
 * Created by Prabhash Rathore on 12/8/14.
 */

var rules = require('../rules');
var deepComparator = require('./DeepComparator');

/**
 * This API works with flat or single level request objects.
 *
 * @param req
 * @returns {*}
 */
exports.getMockData = function(req) {

    if(req === undefined) {
        throw "Undefined Request";
    }

    var reqServiceName = req.serviceName;
    var reqApiName = req.apiName;
    console.log("Service and API Name called: " + reqServiceName + " ==> " + reqApiName);

    var apiList = rules.api;

    var flag = false; //flag to terminate loops if request don't match rules

    for(var i = 0; i < apiList.length; i++) {

        //Make sure Service Name and associated API/Operation name match before validating other nested rules
        if((apiList[i].serviceName === reqServiceName) && (apiList[i].apiName === reqApiName)) {

            var matchedAPI = apiList[i];
            console.log("API Name Matched: " + JSON.stringify(matchedAPI));

            flag = true; //reset flag to true if there is an API name match in rules object

            //lets run a match on defined rules
            var apiReq = matchedAPI.request;
            console.log("Request object from Rules file: " + JSON.stringify(apiReq));

            for(var x in apiReq) {

                console.log("Property from Rules object " + x + " => " + apiReq[x]);
                console.log("Request attribute: " + x + " => " + req[x]);

                // current implementation doesn't support nested request objects and arrays in request, this will be implemented in future
                if(Array.isArray(apiReq[x])) {
                    throw "Current implementation doesn't support arrays in Request, please use primitive values in your request!"
                }

                var dataType = typeof apiReq[x];
                console.log("Type of data to be compared: " + dataType);

                if(dataType === 'object') {
                    throw "Current implementation doesn't support nested objects in Request, please use flat request objects!"
                }

                if(dataType === 'function') {
                    throw "Functions are invalid attributes in JSON objects, please remove functions from rules.xml request and try again!!"
                }

                if(req[x] === undefined) {
                    console.log("Property missing in request object, violate rules!!");
                    flag = false;
                    break; //specified property not present in the request, break out of this for loop
                }

                if(apiReq[x] !== req[x]) {
                    console.log("Request property value don't match Rule property value!!");
                    flag = false;
                    break;
                }

            }

            //found a request match
            if(flag) {
                console.log("Found a matching request in rules!!");

                var responseFile = matchedAPI.response;
                var responseFilePath = '../data/' + responseFile;

                var response = require(responseFilePath);

                return response;

            }

        }

    }

    console.log("Bad request, couldn't match any request!!");
    var errorObj = require('../data/Error');
    return errorObj;

}

/**
 * Work in Progress.....
 *
 * API to get mock response for deeply nested request objects.
 *
 * @param req
 * @returns {*}
 */
function getMockDataForNestedReq(apiContext, req) {

    if(apiContext === undefined) {
        throw "Undefined API Context";
    }

    if(req === undefined) {
        throw "Undefined Request";
    }

    if(typeof apiContext === 'function' || typeof req === 'function') {
        throw "Function is not accepted as request parameter";
    }

    if(apiContext.serviceName === undefined || apiContext.serviceName === '') {
        throw "Service Name is required to get Mock Data."
    }

    if(apiContext.apiName === undefined || apiContext.apiName === '') {
        throw "API name is required to get Mock Data."
    }

    //flatten the request object
    var flattenedReq = deepComparator.flattenObject(req, []);

    var apiList = rules.api;

    var flag = false; //flag to terminate loops if request doesn't match rules

    for(var i = 0; i < apiList.length; i++) {

        if(apiList[i].serviceName === apiContext.serviceName && apiList[i].apiName === apiContext.apiName ) {

            flag = true; //Service Name and API Name matched

            //flatten this specific Request Object from Rules.json file
            var flattenedRulesReq = deepComparator.flattenObject(apiList[i].request, []);

            //compare flattened objects
            flag = deepComparator.compareFlattenedArray(flattenedReq, flattenedRulesReq);

        }

        if(flag) {
            console.log("Successful mock req match!!");

            var responseFile = apiList[i].response;
            var responseFilePath = '../data/' + responseFile;

            var response = require(responseFilePath);

            return response;

        }

    }

    console.log("Bad Request");
    var errorObj = require('../data/Error');
    return errorObj;

}