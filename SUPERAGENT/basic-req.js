'use strict'

var req = require('superagent')
var util = require('util')

req.post("http://www.google.com.sg").end((err, res) => {
    if (err || !res.ok) {
        console.log('Oh no! error');
        // console.log(util.inspect(res, { showHidden: true, colors: true }))
    }
    else {
        console.log('yay got ' + JSON.stringify(res.body));
    }
})

module.exports = {

    test: function () {
            console.log("HELLO TEST!!!");
    }
}
