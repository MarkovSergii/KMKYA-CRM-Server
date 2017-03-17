const R = require('ramda');
const models = require('./models')
const utils = require('./utils')
const dopDB = require('./connections').dopDB
const clientDB = require('./connections').clientDB
const express = require('express')


const app = express();


var PRICE_BUILD = dopDB.define('PRICE_BUILD',models.PRICE_BUILD);
PRICE_BUILD.mod = 'PRICE_BUILD';
PRICE_BUILD.schema = dopDB;

var OWNERSHIP = clientDB.define('OWNERSHIP',models.OWNERSHIP);
OWNERSHIP.mod = 'OWNERSHIP';
OWNERSHIP.schema = clientDB;

var COUNTRY = clientDB.define('COUNTRY',models.COUNTRY);
COUNTRY.mod = 'COUNTRY';
COUNTRY.schema = clientDB;

var OBLAST = clientDB.define('OBLAST',models.OBLAST);
OBLAST.mod = 'OBLAST';
OBLAST.schema = clientDB;

var CITY = clientDB.define('CITY',models.CITY);
CITY.mod = 'CITY';
CITY.schema = clientDB;

var FIRMS = clientDB.define('FIRMS',models.FIRMS);
FIRMS.mod = 'FIRMS';
FIRMS.schema = clientDB;




app.get('/',(req,res)=>{
    res.send('Hello')
})

app.get('/1',(req,res)=>{
    utils.query({q:{where:{ID:5} }, model:FIRMS})
        .then((data)=>utils.query({q:{where:{ID:data[0].OBLAST} }, model:OBLAST}))
        .then((data)=>res.send(data))
        .catch((e)=>res.send(e));
})

app.get('/2',(req,res)=>{
    utils.query({q:{where:{ID:5} }, model:FIRMS})
        .then((data)=>{
            res.send(data)
        })
        .catch((e)=>res.send(e));
})

app.listen(2525,()=>{
    console.log ('Migration started at 2525');
})


