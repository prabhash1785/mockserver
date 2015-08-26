/**
 * Unit test for Deep Object Comparator.
 *
 * Created by prrathore on 8/26/15.
 */

'use strict';

var assert = require('assert');
var deepComparator = require('../lib/DeepComparator');

describe('Deep Object comparator', function() {

    describe('deep object comparison', function() {

        it('should compare two deep objects successfully', function() {

            var nestedObj1 = {
                location: ['India', 'US'],
                name : {
                    firstName : 'Ricky',
                    lastName : "Travolta",
                    parents : {
                        father : {
                            a : 'a',
                            b : 'b'
                        },
                        mother : "Emmy"
                    }
                },
                age : 29,
                city : 'San Jose',
                state : 'CA',
                country : 'US'
            };

            var nestedObj2 = {
                location: ['India', 'US'],
                name : {
                    firstName : 'Ricky',
                    lastName : "Travolta",
                    parents : {
                        father : {
                            a : 'a',
                            b : 'b'
                        },
                        mother : "Emmy"
                    }
                },
                age : 29,
                city : 'San Jose',
                state : 'CA',
                country : 'US'
            };

            var list1 = deepComparator.flattenObject(nestedObj1, []);
            var list2 = deepComparator.flattenObject(nestedObj2, []);

            assert(deepComparator.compareFlattenedArray(list1, list2), true);

        });

    });

    describe('flat object comparison', function() {

        it('should compare two flat objects successfully', function () {

            var obj1 = {
                accountNumber: '12345',
                city: 'Campbell',
                country: 'US',
                zipCode: 95008
            };

            var obj2 = {
                accountNumber: '12345',
                city: 'Campbell',
                country: 'US',
                zipCode: 95008
            };

            var list1 = deepComparator.flattenObject(obj1, []);
            var list2 = deepComparator.flattenObject(obj2, []);

            assert(deepComparator.compareFlattenedArray(list1, list2), true);

        });

    });

});