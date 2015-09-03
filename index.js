/**
 * Created by prrathore on 8/23/15.
 */

'use strict';

var mockServer = require('./lib/mockServer');

/**
 * If no options object provided then default path will be used for mock rules and data directories.
 *
 * @param options
 * @return {{getMockData: *, getMockDataForNestedReq: *}}
 */
module.exports = function(options) {

    var config = require('./lib/config');
    config.setConfig(options);

    return {
        getMockData: mockServer.getMockData,
        getMockDataForNestedReq: mockServer.getMockDataForNestedReq
    };

};