'use strict'

var req = require('superagent')
var util = require('util')

module.exports = () => {
    console.log("Inside mock-tindakmsia-api!")
    req.get("http://localhost:8080/api")
        .end((err, res) => {

            if (err || !res.ok) {
                console.log('Oh no! error' + res.status);
                console.log(util.inspect(res, { colors: true }))
            } else {
                // Alternative
                // console.log(JSON.stringify(res.body))
                /*
                util.inspect(
                    JSON.parse(res.text),
                    {
                        colors: true
                    })
                  */  
                // Iterate through the keyparis?
                /* DEBUG
                let shapefiles = JSON.parse(res.text)
                let myshape = Object.create(shapefiles)
                myshape.keys
                
                console.log(
                    util.inspect(
                        shapefiles,
                        { colors: true }
                        )
                    )
                    
                    */
                // let ab = {par: [0,0]}
                    
            }
        })
}