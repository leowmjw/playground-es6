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

    // ASSUMPTIONS ===========================
    // Input for a Aduan case looks like: 17-00042
    // Number is 5 digits; 1 -> 99999
    // Rate about 50-100 per day; 80 per day; 1 month 2400 per month

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
        // Execute test of same type
        t.strictSame(
            latest_aduan.initID(single_test_case.input.current_month, single_test_case.input.current_day),
            single_test_case.output,
            single_test_case.scenario
        )
    })


    const test_cases_scenario_find_equilibrium = [
        {
            "scenario": "Both High Mark and Low Mark too Optimistic (ID = 5)",
            "input": {
                "current_high_mark": 300,
                "high_mark_page_exists": false,
                "current_low_mark": 80,
                "low_mark_page_exists": false
            },
            "output": {"error": null, "high_mark": 80, "low_mark": 40}
        },
        {
            "scenario": "Both High Mark and Low Mark too Pessimistic (id = 80000)",
            "input": {
                "current_high_mark": 15000,
                "high_mark_page_exists": true,
                "current_low_mark": 3000,
                "low_mark_page_exists": true
            },
            "output": {"error": null, "high_mark": 57500, "low_mark": 15000}
        },
        /*
         * This will brak things; but needs to be solved at the higher level
        {
            "scenario": "Found the page (id = 2)!",
            "input": {
                "current_high_mark": 2,
                "high_mark_page_exists": true,
                "current_low_mark": 1,
                "low_mark_page_exists": true
            },
            "output": {"error": null, "high_mark": 2, "low_mark": 2}
        },
        */
        {
            "scenario": "High Mark overshot but Low Mark is OK (id = 50000)",
            "input": {
                "current_high_mark": 60000,
                "high_mark_page_exists": false,
                "current_low_mark": 40000,
                "low_mark_page_exists": true
            },
            "output": {"error": null, "high_mark": 50000, "low_mark": 40000}
        },
        {
            "scenario": "Inconsistent state of the world (Network failure)",
            "input": {
                "current_high_mark": 60000,
                "high_mark_page_exists": true,
                "current_low_mark": 40000,
                "low_mark_page_exists": false
            },
            "output": {"error": "Inconsistent state - retry!", "high_mark": 60000, "low_mark": 40000}
        },
        {
            "scenario": "Invalid High Mark Value",
            "input": {
                "current_high_mark": "abc",
                "high_mark_page_exists": false,
                "current_low_mark": -200,
                "low_mark_page_exists": false
            },
            "output": {"error": "Undefined input!"}
        },
        {
            "scenario": "Invalid status of Page Exists",
            "input": {
                "current_high_mark": 100,
                "high_mark_page_exists": 0,
                "current_low_mark": 50,
                "low_mark_page_exists": "yes"
            },
            "output": {"error": "Undefined input!"}
        },
    ]

    test_cases_scenario_find_equilibrium.map(function (single_test_case) {
        // console.error("SINGLE_TEST_CASE: " + util.inspect(single_test_case) + "\n\n")
        // Execute test of same type
        t.strictSame(
            latest_aduan.nextID(
                single_test_case.input.current_high_mark, single_test_case.input.high_mark_page_exists,
                single_test_case.input.current_low_mark, single_test_case.input.low_mark_page_exists
            ),
            single_test_case.output,
            single_test_case.scenario
        )
    })

    const test_cases_scenario_simulate_equilibrium = [
        {
            "scenario": "",
            "starting_context": {
                prefix: null,
                current_month: 0,
                current_day: 0,
                high_mark: null,
                low_mark: null,
                current_latest_id: null,
                still_active: []
            },
            "input": [
                {"will_high_mark_hit": false, "will_low_mark_hit": false},
                {"will_high_mark_hit": false, "will_low_mark_hit": false},
                {"will_high_mark_hit": false, "will_low_mark_hit": false},
            ],
            "output": {"error": null, "chosen_id": ""}
        },
    ]
    test_cases_scenario_simulate_equilibrium.map(function (single_test_case) {
        // Reset stuff ..
        const prefix = "17-"
        // Have a rule of thumb for 1/2 extra month as the MAX
        // What about a look-ahead
        // When hit a negative; lower the MAX there and then?
        // Simulate getting the next item

    })

    t.end()
})

mytest.test("Extract status from single page", {buffered: true}, function (t) {
    t.fail("********************************** TODO!!!")

    t.end()
})