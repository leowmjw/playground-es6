"use strict";

let util = require("util")

// ES2015-style 
// import arangojs, {Database, aqlQuery} from 'arangojs';
// let db1 = arangojs(); // convenience short-hand 
// let db2 = new Database();
// let {query, bindVars} = aqlQuery`RETURN ${Date.now()}`;

console.log("Testing ArangoDB")
// or plain old Node-style 
let arangojs = require('arangojs');
// let db1 = arangojs();
let db2 = new arangojs.Database({
    url: "http://localhost:8000"
});
db2.useDatabase("sinar")
// console.log(util.inspect(db1))
// console.log(util.inspect(db2.query))

db2.query('FOR p IN persons RETURN p._key', {}, { count: true }).then(
    cursor => {
        console.log("NUmber of result is ", cursor.count)
        cursor.all()
    },
    err => console.error('Something bad happedned', err)
).then(
    keys => {
        console.log("Got in here ...")
        // console.log('All keys:', keys.join(', '))
    },
    err => console.error('Failed to execute query:', err)
    );


/* Below does not work ..
db2.query('FOR p IN persons RETURN p._key').then(
    function (cursor) {
        cursor.all()
    }
).then(
  function(keys) {
      console.log('All keys:', keys.join(', '))
  },
  function (err) {
      console.error('Failed to execute query:', err)
  }    
)
*/

let aql = arangojs.aqlQuery(['RETURN ', ''], Date.now());
let query = aql.query;
let bindVars = aql.bindVars;

// Below is example hwo to use the template; to transfer from
// prototype AQL Editor to use in code ...
let startMPYear = "2013"
let findMPs = arangojs.aqlQuery`
LET u = (
    FOR p IN persons
        LET mymp = (
        FOR m IN p.data.memberships
            FILTER LOWER(m.role) == 'member of parliament'
            FILTER DATE_TIMESTAMP(m.start_date) 
                >= DATE_TIMESTAMP(${startMPYear})
            RETURN {
                s: m.start_date,
                e: m.end_date
            }
        )
    FILTER mymp != []
    RETURN {
        name: p.data.name,
        membership: mymp
    }
)

RETURN [
    u, LENGTH(u)    
]
`
/*
RETURN {
     data: u,
     count: LENGTH(u)
}`
*/

console.log(util.inspect(findMPs))
let cursor_findMPs = null
db2.query(findMPs, { count: true }).then(
    cursor => {
        cursor_findMPs = cursor
        console.log("Found ", cursor.count, " entries")
        while (cursor.hasNext()) {
            cursor.next().then(
                value => {
                    console.log("VAL:",
                        util.inspect(value))
                }
            )
        }
    },
    err => console.error("ERR: ", err)
)

module.exports = {
    showAllUniquePersons: function() {

    },
    showAllUniquePosts: function() {

    },
    showAllUniqueOrganzations: function() {

    }
}