/**
 * This is the unit tests
 */

var assert = require('assert');
var lib = require('./../app/lib');

//Holder for tests
var unit = {};

unit['lib.addTwoNumbers should return a number when passed valid numbers'] = function() {
    var val = lib.addTwoNumbers(2, 3);
    assert.equal(typeof(val), 'number');
    assert.equal(5, val);
}

unit['lib.addTwoNumbers throws an exception when the first parameter is not a number'] = function() {
    assert.throws( () => {
        var val = lib.addTwoNumbers('2', 3);
    },
     'should be a number');   
}

unit['lib.addTwoNumbers throws an exception when the second parameter is not a number'] = function() {
    assert.throws( () => {
        var val = lib.addTwoNumbers(2, '3');
    },
     'should be a number');   
}

unit['lib.addTwoNumbers throws an exception when the second parameter is not present'] = function() {
    assert.throws( () => {
        var val = lib.addTwoNumbers(2);
    },
     'should be a number');   
}

unit['lib.addTwoNumbersAsync should return a number when passed valid numbers'] = async function() {
    await lib.addTwoNumbersAsync(2, 3).then(val => {
        assert.equal(typeof(val), 'number');
        assert.equal(5, val);
    });
}

unit['lib.addTwoNumbersAsync should return an error when first parameter is invalid'] = async function() {
    await lib.addTwoNumbersAsync('2', 3).then(val => {
        assert.fail('should not have resolved');
    }).catch(err => {
        assert.ok(err);
        assert.equal('should be a number', err.message);
    })
}

unit['lib.addTwoNumbersAsync should return an error when second parameter is invalid'] = async function() {
    await lib.addTwoNumbersAsync(2, '3').then(val => {
        assert.fail('should not have resolved');
    }).catch(err => {
        assert.ok(err);
        assert.equal('should be a number', err.message);
    })
}

unit['lib.addTwoNumbersAsync should return an error when second parameter is not present'] = async function() {
    await lib.addTwoNumbersAsync(2).then(val => {
        assert.fail('should not have resolved');
    }).catch(err => {
        assert.ok(err);
        assert.equal('should be a number', err.message);
    })
}

module.exports = unit;