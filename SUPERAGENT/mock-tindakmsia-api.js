'use strict'

var req = require('superagent')
var util = require('util')

module.exports = () => {
    console.log("Inside mock-tindakmsia-api!")
    req.get("http://localhost:8080/api")
        .end((err, res) => {

            // util.inspect(res.txt, { colors: true })
            if (err || !res.ok) {
                console.log('Oh no! error MSG: ' + err.message);
                console.log(util.inspect(res, { colors: true }))
            } else {
                // Alternative
                console.log("STRINGIFY: " + JSON.stringify(res.body))
                /*
                util.inspect(
                    JSON.parse(res.text),
                    {
                        colors: true
                    })
                  */
                // let items = JSON.parse(res.body);
                console.log("BODY-ITEMS: " + util.inspect(res.body, { colors: true }))
                let myjson = JSON.parse(res.text)
                // console.log("All OK" + util.inspect(myjson, { colors: true }) )
                
                for (let k of Object.keys(myjson)) {
                    console.log("Item key " + k + " is " + myjson[k])
                }
            }
        })
}