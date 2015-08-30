/**
 * Test flatten object function.
 *
 * Created by prrathore on 8/30/15.
 */

'use strict';

var assert = require('assert');
var deepComparator = require('../lib/DeepComparator');

describe('Flatten object', function() {

    describe('flatten nested object', function() {

       it('should flatten nested object', function() {

           var nestedObj1 = {
               location: ['India', 'US'],
               name : {
                   firstName : 'Paul',
                   lastName : 'Walker',
                   parents : {
                       father : {
                           a : 'a',
                           b : 'b'
                       },
                       mother : "Emmy"
                   }
               },
               age : 35,
               city : 'San Jose',
               state : 'CA',
               country : 'US'
           };

           var flattenedArray = deepComparator.flattenObject(nestedObj1);

           var expectedOutput = [
               { key: 'location.0', value: 'India' },
               { key: 'location.1', value: 'US' },
               { key: 'name.firstName', value: 'Paul' },
               { key: 'name.lastName', value: 'Walker' },
               { key: 'name.parents.father.a', value: 'a' },
               { key: 'name.parents.father.b', value: 'b' },
               { key: 'name.parents.mother', value: 'Emmy' },
               { value: 35, key: 'age' },
               { value: 'San Jose', key: 'city' },
               { value: 'CA', key: 'state' },
               { value: 'US', key: 'country' }

           ];

           for(var i = 0; i < expectedOutput.length; i++) {

               assert.equal(flattenedArray[i].key, expectedOutput[i].key, true);
               assert.equal(flattenedArray[i].value, expectedOutput[i].value, true);

           }

       });

    });

    describe('flatten non-nested object', function() {

        it('should flatten non-nested object', function() {

            var nestedObj1 = {
                firstName : 'Paul',
                lastName : 'Walker',
                age : 35,
                city : 'San Jose',
                state : 'CA',
                country : 'US'
            };

            var flattenedArray = deepComparator.flattenObject(nestedObj1);

            var expectedOutput = [
                { value: 'Paul', key: 'firstName' },
                { value: 'Walker', key: 'lastName' },
                { value: 35, key: 'age' },
                { value: 'San Jose', key: 'city' },
                { value: 'CA', key: 'state' },
                { value: 'US', key: 'country' }
            ];

            for(var i = 0; i < expectedOutput.length; i++) {

                assert.equal(flattenedArray[i].key, expectedOutput[i].key, true);
                assert.equal(flattenedArray[i].value, expectedOutput[i].value, true);

            }

        });

    });

    describe('flatten array object', function() {

        it('should flatten array object', function() {

            var nestedObj1 = [
                'Vin',
                'Diesel',
                35,
                'San Jose',
                'CA',
                'US'
            ];

            var flattenedArray = deepComparator.flattenObject(nestedObj1);

            var expectedOutput = [
                { value: 'Vin', key: '0' },
                { value: 'Diesel', key: '1' },
                { value: 35, key: '2' },
                { value: 'San Jose', key: '3' },
                { value: 'CA', key: '4' },
                { value: 'US', key: '5' }
            ];

            for(var i = 0; i < expectedOutput.length; i++) {

                assert.equal(flattenedArray[i].key, expectedOutput[i].key, true);
                assert.equal(flattenedArray[i].value, expectedOutput[i].value, true);

            }

        });

    });

    describe('behavior for empty object', function() {

        it('should return empty array for empty object', function() {

            var emptyList = deepComparator.flattenObject({});

            assert(typeof emptyList, 'array', true);
            assert.equal(emptyList.length, 0, true);

        });

    });

    describe('behavior for bad inputs', function() {

        it('should throw error when bad input is provided', function() {

            assert.throws(function() {
                deepComparator.flattenObject(undefined);
            }, /Undefined object encountered/);

            assert.throws(function() {
                deepComparator.flattenObject(null);
            }, /Undefined object encountered/);

            assert.throws(function() {
                deepComparator.flattenObject('some string');
            }, /Only object types are permitted for this function/);

            assert.throws(function() {
                deepComparator.flattenObject(function() {
                    return 'some crap';
                });
            }, /Only object types are permitted for this function/);

        });

    });

});