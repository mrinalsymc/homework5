/**
 * this is a test runner
 */
//override the NODE_ENV variable
process.env.NODE_ENV = 'testing';

//create the app logic for the test runner
_app = {};

//container for the tests
_app.tests = {};

_app.tests.unit = require('./unit');

// This is to run all the tests
_app.runTests = function() {
    var errors = [];
    var succesess = 0;
    var limit = _app.countTests();
    var counter = 0;

    for (var key in _app.tests) {
        if(_app.tests.hasOwnProperty(key)) {
            var subTests = _app.tests[key];
            for(var testName in subTests) {
                if(subTests.hasOwnProperty(testName)) {
                    (function(){
                        var tmpTestName = testName;
                        var testValue = subTests[testName]

                        //call the tests
                        try {
                            Promise.resolve(testValue()).then(() => {
                                //if it calls back without throwing it succeded, log it in green
                                console.log('\x1b[32m%s\x1b[0m',tmpTestName);
                                counter++;
                                succesess++;
                                if (counter == limit) {
                                    _app.produceTestReport(limit, succesess, errors)
                                }
                            }).catch(e => {
                                errors.push({
                                    'name': testName,
                                    'error': e
                                });
                                console.log('\x1b[31m%s\x1b[0m',tmpTestName);
                                counter++;
                                if (counter == limit) {
                                    _app.produceTestReport(limit, succesess, errors)
                                }
                            })
                        } catch (e) {
                            errors.push({
                                'name': testName,
                                'error': e
                            });
                            console.log('\x1b[31m%s\x1b[0m',tmpTestName);
                            counter++;
                            if (counter == limit) {
                                _app.produceTestReport(limit, succesess, errors)
                            }
                        }
                    })();
                }
            }
        }
    }
}

//count all the tests
_app.countTests = function() {
    var counter = 0;
    for (var key in _app.tests) {
        if(_app.tests.hasOwnProperty(key)) {
            var subTests = _app.tests[key];
            for(var testName in subTests) {
                if(subTests.hasOwnProperty(testName)) {
                    counter++;
                }
            }
        }
    }
    console.log('count:', counter);
    return counter;
}

//Produce a test outcome report
_app.produceTestReport = function(limit, succesess, errors) {
    console.log("");
    console.log("----------------BEGIN TEST REPORT----------------");
    console.log("");
    console.log("Total Tests:", limit);
    console.log("Pass:", succesess);
    console.log("Fail:", errors.length);
    console.log("");

    //if there are error then print them in detail
    if (errors.length > 0) {
        console.log("----------------BEGIN ERROR DETAILS----------------");
        console.log("");
        errors.forEach(element => {
            console.log('\x1b[31m%s\x1b[0m',element.name);
            console.log(element.error);
            console.log("");
        });

        console.log("");
        console.log("-----------------END ERROR DETAILS-----------------");
    }
    console.log("");
    console.log("-----------------END TEST REPORT-----------------");
    process.exit(0);
}

_app.runTests();