/**
 * Created by leow on 2/12/17.
 */
"use strict";
const util = require("util")
const mytest = require("tap")


mytest.test("Extract status from single page", {buffered: true}, function (t) {
    t.fail("********************************** TODO!!!")

    const test_cases_scenario_DESCRIPTION = [{
        "scenario": "SCENARIO1",
        "input": {"var": "abc", "var2": null},
        "output": {"error": "Undefined input!"}
    }, {
        "scenario": "SCENARIO2",
        "input": {"var": "abc", "var2": null},
        "output": {"error": "Undefined input!"}
    }]

    test_cases_scenario_DESCRIPTION.map(function (single_test_case) {
        // console.error("SINGLE_TEST_CASE: " + util.inspect(single_test_case) + "\n\n")
        // Execute test of same type
        /*
         t.strictSame(
         FUNCTION_UNDER_TEST(single_test_case.input.INPUT1, single_test_case.input.INPUT2),
         single_test_case.output,
         single_test_case.scenario
         )
         */

    })

    t.end()
})