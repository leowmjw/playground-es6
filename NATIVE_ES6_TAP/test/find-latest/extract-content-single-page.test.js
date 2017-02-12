/**
 * Created by leow on 2/12/17.
 */
"use strict";
const util = require("util")
const mytest = require("tap")


mytest.test("Extract status from single page", {buffered: true}, function (t) {
    // t.fail("********************************** TODO!!!")

    const test_cases_scenario_recognize_page_types = [{
        "scenario": "Check for recognizing error page",
        "input": {"fixture_folder": "error-complaints-result-page", "fixture_name": "error-complaints-result-page"},
        "output": {"error": null, "type": "error"}
    }, {
        "scenario": "Check for recognizing successful page",
        "input": {"fixture_folder": "good-complaints-result-page", "fixture_name": "good-complaints-result-page"},
        "output": {"error": null, "type": "good", "content": ""}
    }, {
        "scenario": "Check for recognizing empty page",
        "input": {
            "fixture_folder": "good-complaints-result-page",
            "fixture-name": "good-complaints-empty-result-page"
        },
        "output": {"error": null, "type": "empty"}
    }, {
        "scenario": "Page does not exist",
        "input": {"fixture_folder": null, "fixture_name": null},
        "output": {"error": "Page does not exist!"}
    }]

    test_cases_scenario_recognize_page_types.map(function (single_test_case) {
        // console.error("SINGLE_TEST_CASE: " + util.inspect(single_test_case) + "\n\n")
        // Execute test of same type
        /*
         t.strictSame(
         FUNCTION_UNDER_TEST(single_test_case.input.INPUT1, single_test_case.input.INPUT2),
         single_test_case.output,
         single_test_case.scenario
         )
         */
        let content = null
        const mycontent = helper_load_fixture(
            single_test_case.input.fixture_folder,
            single_test_case.input.fixture_name
        )
        mycontent.then(function (myret) {
            console.error("Content Returned!")
            // console.error("MYRET" + util.inspect(myret))
        }).catch((err) => {
            console.error("ERROR!!!" + util.inspect(err))
        })
        // t.fail("Content is " + util.inspect(mycontent))
    })

    t.end()
})

function helper_load_fixture(fixture_folder, fixture_name) {
    const fs = require('fs')
    const promisify = require('es6-promisify')

    // Inputs
    // DEBUG:
    console.error(`FOLDER: ${fixture_folder} NAME: ${fixture_name}`)
    const readfile = promisify(fs.readFile)

    // Skip problem one ..
    if (fixture_folder === null || fixture_name === null) {
        // do nothing
        return Promise.reject("PRE_REQ FAILED!!!")
    }
    return readfile(`./test/fixture/${fixture_folder}/${fixture_name}.html`, {"encoding": "utf-8"})
}