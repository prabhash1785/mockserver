How to use Mock Server to mock any remote Webservice:
------------------------------------------------------

This is a general purpose Mock Server which can be used to mock any kind of WebSevice. To mock any service you don't need to write any new code instead all you have to do is add a configuration in rules.json file and drop your response data under "data" directory or you can put rules.json and response data in any custom directory you want and pass these custom path in an object while instantiating mock server (sample code provided in example section below) and that will make mock server use your custom directories for looking up rules and response data.

Here are the detailed steps:

1) Add a similar json block in rules.json file.

```
{
     "serviceName" : "merchantcashadvanceserv",
     "apiName" : "getCreditDecision",
     "request" : {
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
     },
     "response" : "creditDecisionResponse1.json",
     "error" : "error.json"
}
```
        
Note:
- Make sure your JSON is a valid json. You can verify your JSON at this link: http://jsonlint.com/
- servicename, apiname, request, response and error are mandatory attributes in rules.json file.
- You can add any field under request object. It is dynamically picked by Mock Server while parsing the request.
- Response object can be any valid JSON with any level of nesting inside it.

2) Add your JSON response file under your root level /data directory or you can have a custom directory for all your mock response. If you chosee to have custom directory then pass the path to your custom directory while instantiating mock server. See examples for reference.

3) Once above two steps are done, you are ready to use the Mock Server. 

Mock Server exposes two APIs:
- getMockData - This API can only be use to parse flat level requests. So if your request has no nesting which most of the REST APIs are then just use this API. This is optimized for flat level requests. This will throw error if requests are nested.
- getMockDataForNestedReq - If your requests are nested then use this API. This API is very general purpose and it can parse nested as well as flat level requests. However if your requests are flat then I would recommend to use "getMockData" API.

Use following code as reference to invoke Mock Server:

- Use default configuration for rules.json and response directories.<br>
<i>Note: 
     - Default value of rules.json - "rules.json" file under root directory of project same as package.json
     - Default value of response data directory - "data" directory under root of project same as package.json
</i>
<br>
<b>Examples:</b>

- Use deault configuration
```
var MockServer = require('mockapi');

/* No configuration provided while instantiations means default configuration will be used
 * Default configuration:
 * rules.json must be available under root of project same as package.json
 * Mock response json files must be available under "data" durectory of project root same as package.json
 */
var mockServer = new MockServer();

var apiContext = {
 serviceName: 'userDataService',
 apiName: 'getUserData'
};

// sample request, you can have any number of attributes in your request
var req = {
 accountNumber : '12345',
 city : 'Campbell',
 country : 'US',
 zipCode : 95008
};

var response = mockServer.getMockData(apiContext, req);
```
