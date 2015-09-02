/**
 * Configuration store for location of rules and response data files.
 *
 * Created by prrathore on 8/30/15.
 */

'use strict';

//TODO: validate rules file and it's format

function config() {
    /*jshint validthis: true */
    console.log('Current Path: ' + process.cwd());

    this.rulesPath = '../rules';
    this.dataPath = '../data';

}

config.prototype.setConfig = function (options) {

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

    this.rulesPath = options.rulesPath;
    this.dataPath = options.dataPath;

};

config.prototype.getConfig = function() {


    return {
        rulesPath: this.rulesPath,
        dataPath: this.dataPath
    };

};

module.exports = config;
