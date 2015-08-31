/**
 * Created by prrathore on 8/23/15.
 */

'use strict';

var mockServer = require('./lib/mockServer');


function createMockServer(options) {

    var Config = require('./lib/config');
    var config = new Config();

    config.setConfig(options);

    var configData1 = config.getConfig();

    console.log('Rules Path: ' + configData1.rulesPath);
    console.log('Data Path: ' + configData1.dataPath);

}

module.exports = {
    setupMockServer: createMockServer,
    getMockData: mockServer.getMockData,
    getMockDataForNestedReq: mockServer.getMockDataForNestedReq
};
