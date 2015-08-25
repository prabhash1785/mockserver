/**
 * Sample client code to test Object Deep Comparator.
 *
 * Created by prrathore on 1/7/15.
 */

'use strict';

var deepComparator = require('../lib/DeepComparator');

var nestedObj1 = {
    location: ['India', 'US'],
    name : {
        firstName : 'Ricky',
        lastName : "Rathore",
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
}

var nestedObj2 = {
    name : {
        firstName : 'Ricky',
        lastName : "Green-Rathore",
        parents : {
            father : {
                a : 'a',
                b : 'b'
            },
            mother : "Barb"
        }
    },
    age : 29,
    city : 'San Jose',
    state : 'CA',
    country : 'US'
}

var nestedObj3 = {
    location: ['India', 'US'],
    name : {
        firstName : 'Ricky',
        lastName : "Rathore",
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
}

var list1 = deepComparator.flattenObject(nestedObj1, []);

console.log("\n\n\First Flattened object:");
for(var i = 0; i < list1.length; i++) {
    console.log(list1[i].key + " :: " + list1[i].value);
}

var list2 = deepComparator.flattenObject(nestedObj3, []);

console.log("\n\n\Second flattened object:");
for(var i = 0; i < list2.length; i++) {
    console.log(list2[i].key + " :: " + list2[i].value);
}

var equalityCheck = deepComparator.compareFlattenedArray(list1, list2);

if(equalityCheck) {
    console.log("Objects are Deep Equal!!");
} else {
    console.log("Objects are not Deep Equal!!");
}