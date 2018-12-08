/**
 * Different types of functions
 */

var lib = {};

//sync function
lib.addTwoNumbers = (a,b) => {
    if (typeof(a) !== 'number') {
        var error = new Error('should be a number');
        throw(error);
    }

    if (typeof(b) !== 'number') {
        var error = new Error('should be a number');
        throw(error);
    }
    return (a+b);
}

//async function
lib.addTwoNumbersAsync = async (a,b) => {
    if (typeof(a) !== 'number') {
        var error = new Error('should be a number');
        return Promise.reject(error)
    }

    if (typeof(b) !== 'number') {
        var error = new Error('should be a number');
        return Promise.reject(error)
    }
    return Promise.resolve(a+b);
}

module.exports = lib;