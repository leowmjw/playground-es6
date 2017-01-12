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

const nextID = function (current_high_mark, high_mark_page_exists, current_low_mark, low_mark_page_exists) {
    const MAX_HIGH_MARK = 100000
    const MIN_LOW_MARK = 0
    // DEBUG:
    // console.error(`HM: ${current_high_mark} Exists?: ${high_mark_page_exists} \nLM: ${current_low_mark} Exists?: ${low_mark_page_exists}\n\n`)
    let non_fatal_error = null
    let high_mark = 0
    let low_mark = 0

    // Squeeze it into integers
    current_high_mark = parseInt(current_high_mark)
    current_low_mark = parseInt(current_low_mark)

    // DEBUG:
    // console.error("\n\nMONTH: " + current_month + " DAY:" + current_day)
    // JOI Validation?
    if (
        current_high_mark == undefined || current_low_mark == undefined
        || Number.isNaN(current_high_mark) || Number.isNaN(current_low_mark)
        || current_high_mark < 1 || current_low_mark < 1 || current_high_mark < current_low_mark
        || typeof high_mark_page_exists != 'boolean' || typeof low_mark_page_exists != 'boolean'
    ) {
        return {
            "error": "Undefined input!"
        }
    }
    // Firstly; evaluate the existence of low_mark
    if (low_mark_page_exists === true) {
        if (high_mark_page_exists === true) {
            // Both too pessimistic
            low_mark = current_high_mark
            high_mark = (MAX_HIGH_MARK - current_high_mark) / 2 + current_high_mark
            // Special case where it is high indication the page is already found
            /*
            if (high_mark > (current_high_mark - current_low_mark)){
                non_fatal_error = "Should not !"
                low_mark = current_low_mark
                high_mark = current_high_mark
            }
            */
        } else {
            // High overshot; get closer to the low_mark
            low_mark = current_low_mark
            high_mark = (current_high_mark - current_low_mark) / 2 + current_low_mark
        }
    } else {
        // If low_mark does not exist; the only logical choice is if the high_mark pag itself NOT exists!
        if (high_mark_page_exists === false) {
            // Both are too Optimistic; reset down
            low_mark = current_low_mark - (current_low_mark - MIN_LOW_MARK) / 2
            high_mark = current_low_mark
        } else {
            // In the case where there is some strange inconsistencies; note but can allow retrying!
            non_fatal_error = "Inconsistent state - retry!"
            low_mark = current_low_mark
            high_mark = current_high_mark
        }
    }
    return {
        "error": non_fatal_error,
        "high_mark": high_mark,
        "low_mark": low_mark
    }
}

const testID = function () {

}

module.exports = {
    "context": context,
    "initID": initID,
    "nextID": nextID,
    "testID": testID
}