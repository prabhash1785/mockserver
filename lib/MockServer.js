/**
 *
 * This is the core file which will parse request and run a match against the available rules. On successful match, it will return matching response file or
 * on match failure, it will return error.
 *
 * Created by Prabhash Rathore on 12/8/14.
 */

'use strict';

var rules = require('../rules');
var deepComparator = require('./DeepComparator');

/**
 * This API works with flat or single level request objects. It will throw error if nested req object is provided.
 *
 * @param req
 * @returns {*}
 */
exports.getMockData = function(apiContext, req) {

    if(!apiContext) {
        throw new Error('Missing API context. Need a valid service context like api name, api method to get mock data');
    }

    if(!req) {
        throw new Error("Undefined Request");
    }

    var reqServiceName = apiContext.serviceName;
    var reqApiName = apiContext.apiName;
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

                var dataType = typeof apiReq[x];
                console.log("Type of data to be compared: " + dataType);

                if(Array.isArray(apiReq[x])) {
                    throw new Error("Arrays are not allowed in request!");
                }

                if(dataType === 'object') {
                    throw new Error("Nested objects are not allowed in request!");
                }

                if(dataType === 'function') {
                    throw new Error("Functions are invalid attributes in JSON objects, please remove functions from rules.xml request and try again!!");
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

};

/**
 *
 * API to get mock response for deeply nested request objects.
 *
 * @param req
 * @returns {*}
 */
exports.getMockDataForNestedReq = function(apiContext, req) {

    if(apiContext === undefined) {
        throw new Error("Undefined API Context");
    }

    if(req === undefined) {
        throw new Error("Undefined Request");
    }

    if(typeof apiContext === 'function' || typeof req === 'function') {
        throw new Error("Function is not accepted as request parameter");
    }

    if(apiContext.serviceName === undefined || apiContext.serviceName === '') {
        throw new Error("Service Name is required to get Mock Data.");
    }

    if(apiContext.apiName === undefined || apiContext.apiName === '') {
        throw new Error("API name is required to get Mock Data.");
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

};