/**
 * Created by user on 23.07.2016.
 */
'use strict';

let express = require('express');
let app = express();

let bodyParser = require('body-parser');
let CookieParser = require('cookie-parser');
let cors = require('cors');


let route = require('./route');




app.use(cors());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
app.use(CookieParser());


app.use(route);
app.use(express.static(__dirname+'/public'));

module.exports = app;
