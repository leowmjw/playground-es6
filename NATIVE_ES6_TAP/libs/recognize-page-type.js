/**
 * Created by leow on 2/12/17.
 */
"use strict";

// Constants
const NON_FATAL_INCONSISTENT = "Inconsistent state - retry!"
const FATAL_CONTENT = ""

function recognize_page_type(loaded_raw_content) {
    if (loaded_raw_content === null || loaded_raw_content === undefined) {
        return {
            "error": FATAL_CONTENT,
            "type": "error"
        }
    }
}

module.exports = {
    execute: recognize_page_type
}