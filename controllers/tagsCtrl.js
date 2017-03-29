/**
 * Created by sergii on 12.11.16.
 */
'use strict';
var models = require('../models/models');
let config  = require('../config');




const insertCheck = (tag,directions_id)=>{
    models.Tags.findOrCreate({where:{name:tag,directions_id:directions_id}})
};


module.exports = {
    insertCheck

};