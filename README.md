How to use Mock Server to mock any remote Webservice:
------------------------------------------------------

This is a general purpose Mock Server which can be used to mock any kind of WebSevice. To mock any service you don't need to write any new code instead all you have to do is add a configuration in rules.json file and drop your response data under "data" directory.

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
     "error" : "Error.json"
}
```
        
Note:
- Make sure your JSON is a valid json. You can verify your JSON at this link: http://jsonlint.com/
- servicename, apiname, request, response and error are mandatory attributes.
- You can add any field under request object. It is dynamically picked by Mock Server while parsing the request.
- Current implementation only supports flat level request objects so please make sure you don't embed nested objects        in request otherwise it will throw an exception.
- Response object can be any valid JSON with any level of nesting inside it.

2) Add your response file under mock/data directory as a JSON file.

3) Once above two steps are done, you are ready to use the Mock Server. Use following code as reference to invoke Mock Server:

```
var mockServer = require('../lib/MockServer'); //use your relative directory while doing a require
var request = {
  serviceName : "merchantcashadvanceserv",
  apiName : "getLoanDetails",
  .
  .
  .
  any other request object attributes
  .
  .
  .
}
var response = mockServer.getMockData(request);
```
  


**More sample client codes are available under mock/client directory.**
 
