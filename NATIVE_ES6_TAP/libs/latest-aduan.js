/**
 * Created by leow on 1/9/17.
 */
"use strict";

let context = {
    prefix: null,
    current_month: 0,
    current_day: 0,
    high_mark: null,
    low_mark: null,
    current_latest_id: null,
    still_active: []
}

const initID = function (current_month, current_day) {
    // Objective: Get as close as possible 
    // Assumes a month has 30 days, and there is 80 problems per day; feel free to adjust
    const DAILY_ESTIMATE = 80
    const DAYS_IN_MONTH = 30
    // Squeeze it into integers
    current_month = parseInt(current_month)
    current_day = parseInt(current_day)
    // DEBUG:
    // console.error("\n\nMONTH: " + current_month + " DAY:" + current_day)
    // JOI Validation?
    if (
        current_month == undefined || current_day == undefined
        || Number.isNaN(current_month) || Number.isNaN(current_day)
        || current_month < 1 || current_day < 1
    ) {
        return {
            "error": "Undefined input!"
        }
    }
    // If somehow there is problem; it is caught earlier on
    let starting_lower_bound_multiplier = current_month - 1
    // DEBUG:
    // console.error("LOWER_BOUND: " + starting_lower_bound_multiplier)
    const low_mark = DAILY_ESTIMATE * starting_lower_bound_multiplier * DAYS_IN_MONTH
    return {
        "error": null,
        "high_mark": DAILY_ESTIMATE * current_day + low_mark,
        "low_mark": low_mark
    }
}

const nextID = function (prefix, high_mark, low_mark) {
    function binary_search() {

    }

    // console.error(`\n\nPREFIX: ${prefix}`)
    return "TODO"
}

const testID = function () {

}

module.exports = {
    "context": context,
    "initID": initID,
    "nextID": nextID,
    "testID": testID
}