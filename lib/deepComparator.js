/**
 * This algorithm will be used to deep comparison of n-level nested objects.
 *
 * Created by Prabhash Rathore on 1/7/15.
 */

'use strict';

var debug = require('debuglog')('comparator');

/**
 * This function will accept a n-level nested object as source and then return the flattened object as an array.
 *
 * @param sourceObj
 * @returns flattendObject
 */
var flattenObject = function(sourceObj) {

    var objBranchPath = [];
    var flattenedObjectArray = [];

    return flattenObjectHelper(sourceObj, objBranchPath, flattenedObjectArray);
};

/**
 * This is the helper function which is called recursively to find all the nested elements in an object and the object in the form of
 * flattened object.
 *
 * @param obj
 * @param path
 * @param objectMap
 * @returns flattened object
 */
function flattenObjectHelper(obj, path, objectMap) {

    if(!obj) {
        debug('Undefined object encountered!');
        throw new Error('Undefined object encountered');
    }

    if(typeof obj !== 'object') {
        throw new Error('Only object types are permitted for this function');
    }

    for(var x in obj) {

        var dataType = typeof obj[x];

        if(dataType === 'function') {
            var exception = 'these are data objects, functions are not allowed in data objects';
            debug(exception);
            throw new Error(exception);
        }

        if(dataType === 'object') {
            debug('Object type encountered!!');

            path.push(x);
            objectMap = flattenObjectHelper(obj[x], path, objectMap); //recursive function call for nested objects

            //pop last path element from array if there are no embedded objects
            var hasEmbeddedObject = false;
            for(var t in obj) {
                if(typeof t === 'object') {
                    hasEmbeddedObject = true;
                    return hasEmbeddedObject;
                }
            }

            if(!hasEmbeddedObject) {
                path.pop();
            }

        }

        var fullyQualifiedName;

        var tempObj = {}; //temporary object to store key-value object key value pairs for pushing it to final array

        //create qualified names from elements stored in path array
        if(path.length > 0) {
            var objectPath = path[0];
            for(var p = 1; p < path.length; p++) {
                objectPath += '.' + path[p];
            }

            if(obj[x] !== 'object') {
                fullyQualifiedName = objectPath + '.' + x;
                debug('Fully Qualified Path of element is: ' + fullyQualifiedName);
                tempObj.key = fullyQualifiedName;
            }
        }



        //print the element if it's not an object
        if(typeof obj[x] !== 'object') {
            debug(x + ' => ' + obj[x]);
            tempObj.value = obj[x];

            if(tempObj.key === undefined) {
                tempObj.key = x;
            }

            objectMap.push(tempObj); //push tempObj to array for final response

        }

    }

    debug('Here is final object map:');
    for(var i = 0; i < objectMap.length; i++) {
        debug(objectMap[i]);
    }

    return objectMap;

}

/**
 * This is used to deep compare two flattened objects and return boolean based on comparison result.
 *
 * @param list1
 * @param list2
 * @returns {boolean}
 */
var compareFlattenedArray = function(list1, list2) {

    if(!list1) {
        throw new Error('Can\'t proceed comparison with undefined objects');
    }

    if(!list2) {
        throw new Error('Can\'t proceed comparison with undefined objects');
    }

    return compareFlattenedArrayHelper(list1, list2) && compareFlattenedArrayHelper(list2, list1);

};

/**
 * Private helper method to determine if list1 is a subset of list2.
 *
 * @param list1
 * @param list2
 * @returns {boolean}
 */
var compareFlattenedArrayHelper = function(list1, list2) {

    var keyList = [];
    var valueList = [];

    //explode the object from list2 and store them in 2 separate arrays.
    // one containing key and other containing value.
    // this is done to do easy comparison of list1 to list2 objects.
    for(var x in list2) {
        keyList.push(list2[x].key);
        valueList.push(list2[x].value);
    }

    var keyFound = false;

    for(var m in list1) {

        keyFound = false;

        for(var i = 0; i < keyList.length; i++) {
            if(list1[m].key === keyList[i]) {
                debug('key matched... ' + list1[m].key);

                if(list1[m].value === valueList[i]) {
                    debug('Value matched... ' + list1[m].value);
                    keyFound = true;
                }

            }

            if(keyFound) {
                break;
            }

        }

        if(!keyFound) {
            break;
        }

    }

    return keyFound;

};

//export functions for public use
exports.flattenObject = flattenObject;
exports.compareFlattenedArray = compareFlattenedArray;
