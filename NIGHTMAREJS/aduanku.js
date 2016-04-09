"use strict";

let util = require('util')
let fs = require('fs')

let Nightmare = require('nightmare')
let nightmare = Nightmare({ show: true })

// nightmare.goto("https://aduanku.my/open311/v2/requests.json?jurisdiction_id=aduanku&start_date=2016-02-01&end_date=2016-02-29")
// nightmare.goto("https://aduanku.my")
// Below is partial; per month
// nightmare.goto("https://aduanku.my/open311/v2/requests.json?jurisdiction_id=aduanku&start_date=2016-02-01&end_date=2016-02-29")
// Below is get ALL (up till 1k)
nightmare.goto("https://aduanku.my/open311/v2/requests.json?jurisdiction_id=aduanku")
    .evaluate(function() {
        // console.log(util.inspect(document.querySelector("body")))
        // return document.querySelector("body");
        return document.body.innerText
    })
    .end()
    .then(function(doc) {
        // DEBUG:
        // let raw_output = JSON.parse(doc).requests[0].request
        // console.log(util.inspect(raw_output));
        console.log("Write out file ... ")
        fs.writeFileSync('./a.json', doc)
    })
