/**
 * Created by leow on 2/12/17.
 */
"use strict";

// Stdlib
const util = require("util")

// Constants
const NON_FATAL_INCONSISTENT = "Inconsistent state - retry!"
const FATAL_CONTENT = "Page does not exist!"
const FATAL_UNKNOWN = "Unknown Error!"


// Libs
const cheerio = require('cheerio')
const tableParser = require('cheerio-tableparser')

function recognize_page_type(page_parsed) {

    // console.error("TYPE: " + typeof(page_parsed))
    // DEBUG:
    // console.error("TITLE IS " + pageParsed('head title').text())
    // If title is "PublicViewStatus"; is OK; otherwise ERROR out!!
    if (page_parsed('head title').text() == "PublicViewStatus") {
        // Aduan Information
        // id="dlAduan"
        // DEBUG:
        // console.error("ADUAN: " + pageParsed('#Table9'))
        /*
         console.error("====== ADUAN_DATA: =====\n" + util.inspect(
         pageParsed('#Table9').parsetable(false, false, true).reduce(
         (p, n) => n.map((item, i) => [...(p[i] || []), n[i]]), []
         )))
         */
        /* NO NEED TRANSPOSE!! :P
         const aduanData = pageParsed('#Table9').parsetable(false, false, true).reduce(
         (p, n) => n.map((item, i) => [...(p[i] || []), n[i]]), []
         )
         */
        const aduan_data = page_parsed('#Table9').parsetable(false, false, true)
        // DEBUG:
        /*
         console.error("SIZE: " + aduan_data.length)
         aduanData[0].every((element, index, array) => {
         console.error("EL: " + util.inspect(element) + " ID: " + index )
         })
         */
        // Choose the column number; then we can get out the key/value
        // aduanData[0] for the label
        // aduanData[1] for the value
        // DEBUG:
        /*
         aduan_data[1].forEach((element, index) => {
         console.error('a[' + index + '] = ' + element)
         })
         */
        // console.error("ADUANID: " + aduan_data[1][0])

        // Tindakan Table
        // id="dsTindakan"
        // DEBUG:
        // console.error("TINDAKAN: " + pageParsed('#dsTindakan'))
        // References:
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array
        // Transpose assumes matrix (same size both end); not suitable
        // const transpose = a => a.map((_, c) => a.map(r => r[c]))
        // Last solution by @tatomyr works!!
        const tindakan_data = page_parsed('#dsTindakan').parsetable(false, false, true).reduce(
            (p, n) => n.map((item, i) => [...(p[i] || []), n[i]]), []
        )
        // DEBUG:
        /*
         console.error("TINDAKAN_DATA:" + util.inspect(tindakan_data))
         console.error("TINDAKAN_LENGTH: " + tindakan_data.length)
         */
        if (tindakan_data.length == 1) {
            return {
                "page_type": "empty",
                "aduan_id": aduan_data[1][0]
            }
        } else {
            return {
                "page_type": "good",
                "aduan_id": aduan_data[1][0]
            }
        }


    } else {
        return {
            "page_type": "error"
        }

    }
    // Should not get here .. is bad!
    return {
        "page_type": "unknown"
    }

}

function extract_table(loaded_raw_content) {

    if (loaded_raw_content === null || loaded_raw_content === undefined) {
        return {
            "error": FATAL_CONTENT
        }
    }

    const page_parsed = cheerio.load(loaded_raw_content)
    // Setup cheerio-tableparser
    tableParser(page_parsed)
    // Extract out page type and other goodies?
    const res = recognize_page_type(page_parsed)

    if (res.page_type == "error") {
        // Assumes Error Page; but it is loaded correctly ..
        return {
            "error": null,
            "type": "error"
        }

    } else if (res.page_type == "unknown") {
        return {
            "error": FATAL_UNKNOWN,
            "type": "error"
        }
    }

    // Type: "good" or "empty"

    return {
        "error": null,
        "type": res.page_type,
        "aduan_id": res.aduan_id
    }
}

module.exports = {
    execute: extract_table
}