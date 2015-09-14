/**
 * Singleton Configuration store for location of rules and response data files path.
 *
 * Created by prrathore on 8/30/15.
 */

'use strict';

module.exports = (function() {

    var configData;

    var initConfig = function() {

        configData = {
            rulesPath: '/rules',
            dataPath: '/data'
        };

    };

    return {

        setConfig: function (options) {

            // if options is undefined then just return. In this case default values will be used set up during config instantiation
            if(!options) {
                return;
            }

            if(!options.rulesPath) {
                throw new Error('Need rules file path where your have defined mock server rules');
            }

            if(!options.dataPath) {
                throw new Error('Need data file path where your have copied all your response data');
            }

            configData = configData ? configData : {}; // if configData is undefined then lets initialize as an empty object

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