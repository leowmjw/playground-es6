"use strict";
const util = require("util")
const mytest = require("tap")

mytest.test("Download a single page", {}, function (t) {
    const ssp = require("../../libs/scrape-single-page")

    // tap.pass("This is fine! mY first test!!!")

    const myresp = ssp("mbpj.gov.my")
    // DEBUG:
    // console.error(util.inspect(myresp))

    t.same(myresp, {
        "content": "There is some content",
        "status": "Ok"
    }, "Value check for single page content!")

    //  Test status error

    //  Test timeouts?

    // Needed to end it?
    t.end()
})

mytest.test("Find the newest running number", {buffered: true}, function (t) {
    const latest_aduan = require("../../libs/latest-aduan")
    let context = Object.create(latest_aduan.context)

    context.prefix = "17-"

    // Input   { current_month, current_day, high_mark, low_mark }
    // Output  { error, high_mark, low_mark }

    const test_cases_scenario_init = [
        {
            "scenario": "Next binary search number to try from scratch (Jan)",
            "input": {"current_month": 1, "current_day": 5, "high_mark": null, "low_mark": null},
            "output": {"error": null, "high_mark": 400, "low_mark": 0}
        },
        {
            "scenario": "Next binary search number to try from scratch (Feb)",
            "input": {"current_month": 2, "current_day": 1, "high_mark": null, "low_mark": null},
            "output": {"error": null, "high_mark": 2480, "low_mark": 2400}
        },
        {
            "scenario": "Next binary search number to try from scratch (Dec)",
            "input": {"current_month": 12, "current_day": 28, "high_mark": null, "low_mark": null},
            "output": {"error": null, "high_mark": 28640, "low_mark": 26400}
        },
        {
            "scenario": "Next binary search number to try from scratch (Apr)",
            "input": {"current_month": 4, "current_day": 13, "high_mark": null, "low_mark": null},
            "output": {"error": null, "high_mark": 8240, "low_mark": 7200}
        },
        {
            "scenario": "Next binary search number when undefined month",
            "input": {"current_month": undefined, "current_day": 1, "high_mark": null, "low_mark": null},
            "output": {"error": "Undefined input!"}
        },
        {
            "scenario": "Next binary search number to try from scratch (Feb)",
            "input": {"current_month": "abc", "current_day": 10, "high_mark": null, "low_mark": null},
            "output": {"error": "Undefined input!"}
        }
    ]

    test_cases_scenario_init.map(function (single_test_case) {
        // console.error("SINGLE_TEST_CASE: " + util.inspect(single_test_case) + "\n\n")
        // Reset stuff ..
        const prefix = "17-"
        // Execute test of same type
        t.strictSame(
            latest_aduan.initID(single_test_case.input.current_month, single_test_case.input.current_day),
            single_test_case.output,
            single_test_case.scenario
        )

    })

    // 17-00042
    // Number is 5 digits; 1 -> 99999
    // Rate about 50-100 per day; 80 per day; 1 month 2400 per month
    t.strictSame("", "TODO", "Next binary search number to try with lower set", {"skip": true})

    t.strictSame("", "TODO", "Next binary search number to try with higher set", {"skip": true})

    t.strictSame("", "TODO", "Next binary search number to try with chosen higher error", {"skip": true})

    t.strictSame("", "TODO", "Next binary search number to try with chosen higher ok", {"skip": true})

    t.end()
})

mytest.test("Extract status from single page", {buffered: true}, function (t) {
    t.fail("********************************** TODO!!!")

    t.end()
})