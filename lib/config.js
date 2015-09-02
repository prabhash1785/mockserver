/**
 * Configuration store for location of rules and response data files.
 *
 * Created by prrathore on 8/30/15.
 */

'use strict';

module.exports = (function() {

    var configData;

    var initConfig = function() {

        configData = {
            rulesPath: '../rules',
            dataPath: '../data'
        }

    };

    return {

        setConfig: function (options) {

            // if options is undefined then just return. In this case default values will be used set up during condif instantiation
            if(!options) {
                return;
            }

            if(!options.rulesPath) {
                throw new Error('Need rules file path where your have defined mock server rules');
            }

            if(!options.dataPath) {
                throw new Error('Need data file path where your have copied all your response data');
            }

            configData.rulesPath = options.rulesPath;
            configData.dataPath = options.dataPath;

        },

        getConfig: function() {

            if(!configData) {
                initConfig();
            }

            return configData;
        }

    };

})();


//TODO: validate rules file and it's format

//var configData;
//
//function config() {
//    /*jshint validthis: true */
//    console.log('Current Path: ' + process.cwd());
//
//    if (!configData) {
//
//        configData = {
//            rulesPath: '../rules',
//            dataPath: '../data'
//        };
//
//    }
//
//}

/**
 * Singleton function to keep only one copy of application throughout this application.
 *
 * @param options
 */
//config.prototype.setConfig = function (options) {
//
//    // if options is undefined then just return. In this case default values will be used set up during condif instantiation
//    if(!options) {
//        return;
//    }
//
//    if(!options.rulesPath) {
//        throw new Error('Need rules file path where your have defined mock server rules');
//    }
//
//    if(!options.dataPath) {
//        throw new Error('Need data file path where your have copied all your response data');
//    }
//
//    configData.rulesPath = options.rulesPath;
//    configData.dataPath = options.dataPath;
//
//};
//
//config.prototype.getConfig = function() {
//
//    return configData;
//
//};
//
//module.exports = config;
