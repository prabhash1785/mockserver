/**
 *
 * This is the core file which will parse request and run a match against the available rules. On successful match, it will return matching response file or
 * on match failure, it will return error.
 *
 * Created by Prabhash Rathore on 12/8/14.
 */

'use strict';

var path = require('path');
var config = require('./config');
var deepComparator = require('./deepComparator');

var debug = require('debuglog')('mock');

/**
 * Private function to parse config object and make sure the path resolves to a valid module.
 *
 * @return {{rules: *, dataPath: (dataPath|string|string|*)}}
 */
function parseConfigData() {

    var configObject = config.getConfig();

    var rulesPath = configObject.rulesPath;
    var dataPath = configObject.dataPath;

    debug('process.cwd: ' + process.cwd());
    debug('rules: ' + rulesPath);
    debug('data: ' + dataPath);

    var finalRulesPath = process.cwd() + path.sep + rulesPath;
    var finalDataPath = process.cwd() + path.sep + dataPath;

    debug('Rules file path: ' + finalRulesPath);
    debug('Response files directory: ' + finalDataPath);

    var rules;

    try {
        rules = require(finalRulesPath);
    } catch(error) {
        debug('Rules file path did not resolve');
        throw new Error(error);
    }

    // TODO: Validate rules object

    return {
        rules: rules,
        dataPath: finalDataPath
    };

}

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
        throw new Error('Undefined Request');
    }

    if(typeof apiContext === 'function' || typeof req === 'function') {
        throw new Error('Function is not accepted as request parameter');
    }

    if(apiContext.serviceName === undefined || apiContext.serviceName === '') {
        throw new Error('Service Name is required to get Mock Data.');
    }

    if(apiContext.apiName === undefined || apiContext.apiName === '') {
        throw new Error('API name is required to get Mock Data.');
    }

    var parsedConfigObject = parseConfigData();

    var rules = parsedConfigObject.rules;
    var dataPath = parsedConfigObject.dataPath;

    var reqServiceName = apiContext.serviceName;
    var reqApiName = apiContext.apiName;
    debug('Service and API Name called: ' + reqServiceName + ' ==> ' + reqApiName);

    var apiList = rules.api;

    var flag = false; //flag to terminate loops if request don't match rules

    for(var i = 0; i < apiList.length; i++) {

        //Make sure Service Name and associated API/Operation name match before validating other nested rules
        if((apiList[i].serviceName === reqServiceName) && (apiList[i].apiName === reqApiName)) {

            var matchedAPI = apiList[i];
            debug('API Name Matched: ' + JSON.stringify(matchedAPI));

            flag = true; //reset flag to true if there is an API name match in rules object

            //lets run a match on defined rules
            var apiReq = matchedAPI.request;
            debug('Request object from Rules file: ' + JSON.stringify(apiReq));

            for(var x in apiReq) {

                debug('Property from Rules object ' + x + ' => ' + apiReq[x]);
                debug('Request attribute: ' + x + ' => ' + req[x]);

                var dataType = typeof apiReq[x];
                debug('Type of data to be compared: ' + dataType);

                if(Array.isArray(apiReq[x])) {
                    throw new Error('Arrays are not allowed in request!');
                }

                if(dataType === 'object') {
                    throw new Error('Nested objects are not allowed in request!');
                }

                if(dataType === 'function') {
                    throw new Error('Functions are invalid attributes in JSON objects, please remove functions from rules.xml request and try again!!');
                }

                if(req[x] === undefined) {
                    debug('Property missing in request object, violate rules!!');
                    flag = false;
                    break; //specified property not present in the request, break out of this for loop
                }

                if(apiReq[x] !== req[x]) {
                    debug('Request property value don\'t match Rule property value!!');
                    flag = false;
                    break;
                }

            }

            //found a request match
            if(flag) {
                debug('Found a matching request in rules!!');

                var responseFile = matchedAPI.response;
                var responseFilePath = dataPath + '/' + responseFile;

                var response;

                try {
                    response = require(responseFilePath);
                } catch(error) {
                    debug('Response file path did not resolve');
                    throw new Error(error);
                }

                return response;

            }

        }

    }

    debug('Bad request, couldn\'t match any request!!');

    var errorModulePath = dataPath + '/' + 'Error';
    var errorObj;

    try {
        errorObj = require('../data/error');
    } catch(error) {
        debug('Response file path did not resolve');
        throw new Error(error);
    }

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
        throw new Error('Undefined API Context');
    }

    if(req === undefined) {
        throw new Error('Undefined Request');
    }

    if(typeof apiContext === 'function' || typeof req === 'function') {
        throw new Error('Function is not accepted as request parameter');
    }

    if(apiContext.serviceName === undefined || apiContext.serviceName === '') {
        throw new Error('Service Name is required to get Mock Data.');
    }

    if(apiContext.apiName === undefined || apiContext.apiName === '') {
        throw new Error('API name is required to get Mock Data.');
    }

    var parsedConfigObject = parseConfigData();

    var rules = parsedConfigObject.rules;
    var dataPath = parsedConfigObject.dataPath;

    //flatten the request object
    var flattenedReq = deepComparator.flattenObject(req);

    var apiList = rules.api;

    var flag = false; //flag to terminate loops if request doesn't match rules

    for(var i = 0; i < apiList.length; i++) {

        if(apiList[i].serviceName === apiContext.serviceName && apiList[i].apiName === apiContext.apiName ) {

            flag = true; //Service Name and API Name matched

            //flatten this specific Request Object from Rules.json file
            var flattenedRulesReq = deepComparator.flattenObject(apiList[i].request);

            //compare flattened objects
            flag = deepComparator.compareFlattenedArray(flattenedReq, flattenedRulesReq);

        }

        if(flag) {
            debug('Successful mock req match!!');

            var responseFile = apiList[i].response;
            var responseFilePath = dataPath + '/' + responseFile;

            var response;

            try {
                response = require(responseFilePath);
            } catch(error) {
                debug('Response file path did not resolve');
                throw new Error(error);
            }

            return response;

        }

    }

    debug('Bad Request');

    var errorModulePath = dataPath + '/' + 'Error';
    var errorObj;

    try {
        errorObj = require('../data/error');
    } catch(error) {
        debug('Response file path did not resolve');
        throw new Error(error);
    }

    return errorObj;

};
