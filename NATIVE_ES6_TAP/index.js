"use strict";

const util = require("util")

let fixture = {
    "test1": {
        "message": "Hello World"
    }
}


console.log("Fixture is " + util.inspect(fixture))
