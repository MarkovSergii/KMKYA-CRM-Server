/**
 * Created by user on 28.08.2016.
 */
'use strict';


var models = require('../models/models');
let config  = require('../config');


var selectAll = function(req,res)
{
    models.Country.findAll()
        .then(function(country) {
            res.send({error:false,data:country});
        })
        .catch(function(error){
            res.send({error:error});
        });
};
var selectByID = function(req,res)
{
    models.Country.findAll({ where: {id:req.params.id} })
        .then(function(country) {
            res.send({error:false,data:country});
        })
        .catch(function(error){
            res.send({error:error});
        });
};



module.exports = {selectAll,selectByID};