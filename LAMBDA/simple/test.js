var util = require("util")
var async = require('async');

var srcKey = "Mike.jpg"
var KeyArray = srcKey.split(".")

console.error(srcKey.split("."))
console.error(KeyArray.pop())
console.error(KeyArray)


async.waterfall([

        function download(next) {
            return next(null, "response")
        },
        function transform_upload(response, next) {
            console.error("REPONSE: ", response)
            var mysizeArray = [8, 16, 32]
            mysizeArray.map(
                function (mysize) {
                    async.waterfall([
                        function transform(innext) {
                            console.error("SIZE:", mysize)
                            innext(null, "upload")
                        },
                        function upload(upload, innext) {
                            innext(null, mysize)
                        }

                    ], function (inerr, inmsg) {

                        console.log("INNER FINAL ERR: ", inerr)
                        console.log("INNER FINAL MSG: ", inmsg)
                    })
                }
            )

            next(null, "err")
        }
    ], function (err, msg) {

        console.log("FINAL ERR: ", err)
        console.log("FINAL MSG: ", msg)
    }
)
