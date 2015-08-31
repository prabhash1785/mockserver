/**
 * Created by prrathore on 8/23/15.
 */

'use strict';

var mockServer = require('./lib/mockServer');

module.exports = {
    getMockData: mockServer.getMockData,
    getMockDataForNestedReq: mockServer.getMockDataForNestedReq
};
