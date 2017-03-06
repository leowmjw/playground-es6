"use strict";

let util = require("util")
let mocha = require('mocha')

let a = {
    b: "c",
    d: 12
}

console.log(util.inspect(a))
