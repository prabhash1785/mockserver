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

            var list1 = deepComparator.flattenObject(nestedObj1);
            var list2 = deepComparator.flattenObject(nestedObj2);

            assert.equal(deepComparator.compareFlattenedArray(list1, list2), true);

        });

        it('should compare two deep objects successfully where object members are in different order', function() {

            var nestedObj1 = {
                location: ['India', 'US'],
                name : {
                    firstName : 'Ricky',
                    lastName : "Travolta",
                    parents : {
                        mother : "Emmy",
                        father : {
                            a : 'a',
                            b : 'b'
                        }
                    }
                },
                city : 'San Jose',
                state : 'CA',
                country : 'US',
                age : 29
            };

            var nestedObj2 = {
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
                country : 'US',
                location: ['India', 'US']
            };

            var list1 = deepComparator.flattenObject(nestedObj1);
            var list2 = deepComparator.flattenObject(nestedObj2);

            assert.equal(deepComparator.compareFlattenedArray(list1, list2), true);

        });

    });

    describe('flat object comparison', function() {

        it('should compare two flat objects successfully', function() {

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

            var list1 = deepComparator.flattenObject(obj1);
            var list2 = deepComparator.flattenObject(obj2);

            assert.equal(deepComparator.compareFlattenedArray(list1, list2), true);

        });

    });

    describe('Simple Array comparison', function() {

        it('should compare two simple arrays successfully', function() {

           var list1 = [
               'hello',
               'world'
           ];

            var list2 = [
                'hello',
                'world'
            ];

            var flattenedList1 = deepComparator.flattenObject(list1);
            var flattenedList2 = deepComparator.flattenObject(list2);

            assert.equal(deepComparator.compareFlattenedArray(flattenedList1, flattenedList2), true);

        });

    });

    describe('Array with nested objects comparison', function() {

        it('should compare two arrays with nested objects successfully', function() {

            var nestedArray1 = [
                'US',
                'India',
                {
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
                },
                ['hello', 'world'],
                {
                    card: {
                        'network': 'Discover',
                        'cvv': '111'
                    }
                }
            ];

            var nestedArray2 = [
                'US',
                'India',
                {
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
                },
                ['hello', 'world'],
                {
                    card: {
                        'network': 'Discover',
                        'cvv': '111'
                    }
                }
            ];

            var flattenedList1 = deepComparator.flattenObject(nestedArray1);
            var flattenedList2 = deepComparator.flattenObject(nestedArray2);

            assert.equal(deepComparator.compareFlattenedArray(flattenedList1, flattenedList2), true);

        });

    });

    describe('Unequal objects comparison', function() {

        it('should return false while comparing unequal objects', function() {

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

            var flattenedObj1 = deepComparator.flattenObject(nestedObj1);
            var flattenedObj2 = deepComparator.flattenObject(nestedObj2);

            assert.equal(deepComparator.compareFlattenedArray(flattenedObj1, flattenedObj2), false);
            assert.equal(deepComparator.compareFlattenedArray(flattenedObj2, flattenedObj1), false);

        });

        it('should return false while comparing unequal objects', function() {

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
                state : 'CA',
                country : 'US'
            };

            var flattenedObj1 = deepComparator.flattenObject(nestedObj1);
            var flattenedObj2 = deepComparator.flattenObject(nestedObj2);

            assert.equal(deepComparator.compareFlattenedArray(flattenedObj1, flattenedObj2), false);
            assert.equal(deepComparator.compareFlattenedArray(flattenedObj2, flattenedObj1), false);

        });

        it('should return false while comparing unequal objects', function() {

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
                state : 'CA',
                country : 'US',
                city : 'San Jose'
            };

            var flattenedObj1 = deepComparator.flattenObject(nestedObj1);
            var flattenedObj2 = deepComparator.flattenObject(nestedObj2);

            assert.equal(deepComparator.compareFlattenedArray(flattenedObj1, flattenedObj2), false);
            assert.equal(deepComparator.compareFlattenedArray(flattenedObj2, flattenedObj1), false);

        });

        it('should return false while comparing unequal objects', function() {

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
                state : 'CA',
                country : 'US',
                city : 'San Jose'
            };

            var flattenedObj1 = deepComparator.flattenObject(nestedObj1);
            var flattenedObj2 = deepComparator.flattenObject(nestedObj2);

            assert.equal(deepComparator.compareFlattenedArray(flattenedObj1, flattenedObj2), false);
            assert.equal(deepComparator.compareFlattenedArray(flattenedObj2, flattenedObj1), false);

        });

        it('should return false while comparing unequal objects', function() {

            var nestedObj1 = {
                location: ['India', 'US'],
                name : {
                    firstName : 'Ricky',
                    lastName : "Travolta",
                    parents : {
                        father : {
                            a : 'foo',
                            b : 'bar'
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
                state : 'CA',
                country : 'US',
                city : 'San Jose'
            };

            var flattenedObj1 = deepComparator.flattenObject(nestedObj1);
            var flattenedObj2 = deepComparator.flattenObject(nestedObj2);

            assert.equal(deepComparator.compareFlattenedArray(flattenedObj1, flattenedObj2), false);
            assert.equal(deepComparator.compareFlattenedArray(flattenedObj2, flattenedObj1), false);

        });



    });

    describe('Bad input', function() {

        it('should throw exception when array is sent as undefined', function() {

            assert.throws(function() {
                deepComparator.compareFlattenedArray(['abc', 'yyz'], undefined);
            }, /Can't proceed comparison with undefined objects/);

            assert.throws(function() {
                deepComparator.compareFlattenedArray(undefined, ['abc', 'yyz']);
            }, Error);

        });

    });

});