/**
 * Configuration store for location of rules and response data files.
 *
 * Created by prrathore on 8/30/15.
 */

'use strict';

//TODO: validate rules file and it's format

function config() {

    console.log('Current Path: ' + process.cwd());

    var rulesPath = '../rules';
    var dataPath = '../data';

}

config.prototype.setConfig = function (options) {

    if(!options) {
        throw new Error('Valid options object is needed to set up mock server rules and data files');
    }

    if(!options.rulesPath) {
        throw new Error('Need rules file path where your have defined mock server rules');
    }

    if(!options.dataPath) {
        throw new Error('Need rules file path where your have defined mock server rules');
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
