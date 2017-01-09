"use strict";
const util = require("util")
const mytest = require("tap")

const ssp = require("../../libs/scrape-single-page")

// tap.pass("This is fine! mY first test!!!")

const myresp = ssp("mbpj.gov.my")
// DEBUG: console.log(util.inspect(myresp))
mytest.equal(myresp.status, "OK")


// mytest.end()
