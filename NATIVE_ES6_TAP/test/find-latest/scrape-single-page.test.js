"use strict";
const util = require("util")
const tap = require("tap")

const ssp = require("../../libs/scrape-single-page")

// tap.pass("This is fine! mY first test!!!")

const myresp = ssp("mbpj.gov.my")
console.log(util.inspect(myresp))
tap.equal(myresp.status, "OK")


tap.end()
