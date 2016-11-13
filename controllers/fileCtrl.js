/**
 * Created by sergii on 12.11.16.
 */
'use strict';
var models = require('../models/models');
let config  = require('../config');


const namesByIds=(req,res)=>
{
    res.end('ok')
}

const getByID=(req,res)=>
{
    res.end('ok')
}

const insert=(req,res)=>
{
    res.end('ok')
}

const remove=(req,res)=>
{
    res.end('ok');
}

module.exports = {
    namesByIds,
    getByID,
    insert,
    remove
}