/**
 * Created by prrathore on 9/4/15.
 */

'use strict';

var assert = require('assert');

describe('config test', function() {

    it('should use default configurations if no custom configuration is provided', function() {

        var config = require('../lib/config');

        assert.equal(config.getConfig().rulesPath, '/rules');
        assert.equal(config.getConfig().dataPath, '/data');

    });

    it('should use default configuration if custom configuration is undefined', function() {

        var config = require('../lib/config');

        config.setConfig(undefined);

        assert.equal(config.getConfig().rulesPath, '/rules');
        assert.equal(config.getConfig().dataPath, '/data');


    });

    it('should use default configuration if custom configuration is null', function() {

        var config = require('../lib/config');

        config.setConfig(null);

        assert.equal(config.getConfig().rulesPath, '/rules');
        assert.equal(config.getConfig().dataPath, '/data');

    });

    it('should throw error if custom configuration object is not in right format', function() {

        var config = require('../lib/config');

        assert.throws(function() {
            config.setConfig('someConfiguration');
        }, Error);

        assert.throws(function() {
            config.setConfig('someConfiguration');
        }, 'Need rules file path where your have defined mock server rules');

    });

    it('should throw error if custom configuration object does not have rules file path with right key name', function() {

        var config = require('../lib/config');

        assert.throws(function() {
            config.setConfig({
                newRulesPath: '../rules',
                dataPath: '../data'
            });
        }, Error);

    });

    it('should throw error if custom configuration object does not have data file path with right key name', function() {

        var config = require('../lib/config');

        assert.throws(function() {
            config.setConfig({
                rulesPath: '../rules',
                randomDataPath: '../data'
            });
        }, Error);

        assert.throws(function() {
            config.setConfig({
                rulesPath: '../rules',
                randomDataPath: '../data'
            });
        }, 'Need data file path where your have copied all your response data');

    });

    it('should accept custom configuration while creating mock server and verify custom configuration is set', function() {

        var customConfiguration = {
            rulesPath: './data/rules',
            dataPath: './data/mockResponse'
        };

        var config = require('../lib/config');
        config.setConfig(customConfiguration);

        assert.equal(config.getConfig().rulesPath, './data/rules');
        assert.equal(config.getConfig().dataPath, './data/mockResponse');

    });

});
