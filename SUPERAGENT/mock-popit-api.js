"use strict";

var req = require('superagent')
var util = require('util')
let money = "Outside MONEY!!!"
let ASQ = require("asynquence")
let myGen = null
let myData = {
    msg: null
}

module.exports = {
    money: "Inside MONEY!!",
    executeAPICall() {
        console.log("Inside mock-popit-api!")
        // Call gate 1
        this.executeOpen311Call()
        // Call gate 2 
        this.executeMapItCall()
        // Do this now after both done; but individually they can proceed!
        let myBob = uglyBob.bind(this)
        myBob()

    },
    generatorAPI: function* (myData) {
        myData.msg = "generatorAPI"
        let open311 = yield this.executeOpen311Call();
        console.log("OPEN311: " + open311)
        let mapit = yield this.executeMapItCall();
        console.log("MAPIT: " + mapit)
        return "done!"
    },
    executeOpen311Call() {
        console.log("Inside executeOpen311Call!!!")

        /* 
        * Sample URL
        * Parameter to tweak
        *
        */

        return req.get("https://aduanku.my/open311/v2/requests.json?jurisdiction_id=aduanku&start_date=2015-03-10&end_date=2016-10-10")
            .end(function(err, res) {
                // util.inspect(res.txt, { colors: true })
                if (err || !res.ok) {
                    console.log('Oh no! error MSG: ' + err.message);
                    console.log(util.inspect(res, { colors: true }))
                } else {
                    // Alternative
                    // console.log("STRINGIFY: " + JSON.stringify(res.body))
                    /*
                    util.inspect(
                        JSON.parse(res.text),
                        {
                            colors: true
                        })
                      */
                    // let items = JSON.parse(res.body);
                    // console.log("BODY-ITEMS: " + util.inspect(res.body, { colors: true }))
                    let myjson = JSON.parse(res.text)
                    // console.log("All OK" + util.inspect(myjson['requests'][0]['request'], { colors: true }) )

                    for (let k of Object.keys(myjson['requests'][0]['request'])) {
                        // console.log("Item key " + k + " is " + JSON.stringify(myjson['requests'][0]['request'][k]))
                    }
                    // Done, move to next in iterator!!
                    myGen.next("OPEN311")
                    myData.msg = "OPEN311"
                }

            })

        // Combine calling Mapit??
        // By the extracted lat, lng?
        // Calculate within the border??
        // Map out the marker each?
        // RefID? -> Lat, Lng ..
    },
    executeMapItCall() {
        console.log("Inside executeMapItCall!!!")
        return req.get("http://localhost:8080/api")
            .end(function(err, res) {
                // util.inspect(res.txt, { colors: true })
                if (err || !res.ok) {
                    console.log('Oh no! error MSG: ' + err.message);
                    console.log(util.inspect(res, { colors: true }))
                } else {
                    // Alternative
                    // console.log("STRINGIFY: " + JSON.stringify(res.text))
                    /*
                    util.inspect(
                        JSON.parse(res.text),
                        {
                            colors: true
                        })
                      */
                    // let items = JSON.parse(res.body);
                    // console.log("BODY-ITEMS: " + util.inspect(res.body, { colors: true }))
                    let myjson = JSON.parse(res.text)
                    // console.log("All OK" + util.inspect(myjson['requests'][0]['request'], { colors: true }) )

                    for (let k of Object.keys(myjson)) {
                        /*
                        console.log("Item key " + k + " is "
                            + JSON.stringify(myjson[k]))
                        console.log("      ---     ")
                        */
                    }
                    // Server-side needs to have HEADER of application/json!!
                    // console.log("PAR is " + res.body.par)
                    myGen.next("MAPIT")
                    console.log("PREV is " + myData.msg)
                    myData.msg = "MAPIT"
                }

            })

    },
    bob() {
        console.log("BOB!!!")
        // this.executeAPICall()
        myGen = this.generatorAPI(myData)
        // Kick it off ...
        myGen.next()
    }

}

function uglyBob() {
    let abc = "hi UGLY"
    console.log(abc)
    console.log(this.money)
}




