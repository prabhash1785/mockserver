/**
 *
 * Created by Prabhash Rathore on 8/23/15.
 *
 */

'use strict';

module.exports = function (grunt) {

    grunt.initConfig({
        jshint: {
            files: ['Gruntfile.js', 'index.js', 'lib/**/*.js', 'test/**/*.js'],
            options: {
                jshintrc: '.jshintrc'
            }
        },
        mochacli: {
            src: ['test/*.js'],
            options: {
                timeout: 6000,
                'check-leaks': true,
                ui: 'bdd',
                reporter: 'spec'
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-mocha-cli');

    grunt.registerTask('test', ['jshint', 'mochacli']);
    grunt.registerTask('lint', ['jshint']);

};


