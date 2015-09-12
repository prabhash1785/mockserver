/**
 * Simple client which shows how to use this mock server.
 *
 * Created by prrathore on 9/12/15.
 */

var MockServer = require('./index');

var mockServer1 = new MockServer(); // with default configurations

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

var response = mockServer1.getMockDataForNestedReq(apiContext, nestedReq);
console.log('Reponse: ' + JSON.stringify(response, null, 4));

var customConfiguration = {
    rulesPath: '/data/rules/rules', //rules file directory path relative to your package.json file
    dataPath: 'data/mockResponse' // directory path for response files relative to your package.json file
}

var mockServer2 = new MockServer(customConfiguration); // custom configuration

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

var response = mockServer2.getMockDataForNestedReq(apiContext, nestedReq);
console.log('Reponse: ' + JSON.stringify(response, null, 4));
