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
                   lastName : "Walker",
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

           var flattenedArray = deepComparator.flattenObject(nestedObj1, []);

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

});