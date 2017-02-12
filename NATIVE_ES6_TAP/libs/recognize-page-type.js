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
         console.error("SIZE: " + aduanData.length)
         aduanData[0].every((element, index, array) => {
         console.error("EL: " + util.inspect(element) + " ID: " + index )
         })
         */
        // Choose the column number; then we can get out the key/value
        // aduanData[0] for the label
        // aduanData[1] for the value
        aduan_data[1].forEach((element, index) => {
            console.error('a[' + index + '] = ' + element)
        })
        console.error("ADUANID: " + aduan_data[1][0])

        // Tindakan Table
        // id="dsTindakan"
        // DEBUG:
        // console.error("TINDAKAN: " + pageParsed('#dsTindakan'))
        // References:
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array
        // Transpose assumes matrix (same size both end); not suitable
        // const transpose = a => a.map((_, c) => a.map(r => r[c]))
        // Last solution by @tatomyr works!!
        /*
         console.error("DATA:" + util.inspect(
         //    transpose(
         pageParsed('#dsTindakan').parsetable(false, false, true).reduce(
         (p, n) => n.map((item, i) => [...(p[i] || []), n[i]]), []
         )
         )
         //)
         )
         */

    } else {
        return "error"
    }

    return "unknown"
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
    const page_type = recognize_page_type(page_parsed)

    if (page_type == "error") {
        // Assumes Error Page; but it is loaded correctly ..
        return {
            "error": null,
            "type": "error"
        }

    } else if (page_type == "unknown") {
        return {
            "error": FATAL_UNKNOWN,
            "type": "error"
        }
    }

    // Type: "good" or "empty"

    return {
        "error": null,
        "type": page_type,
        "aduan_id": "BOBO"
    }
}

module.exports = {
    execute: extract_table
}