/**
 * Created by user on 28.08.2016.
 */
'use strict';


var models = require('../models/models');
let config  = require('../config');


var selectAll = function(req,res)
{
    models.Oblast.findAll()
        .then(function(oblast) {
            res.send({error:false,data:oblast});
        })
        .catch(function(error){
            res.send({error:error});
        });
};
var selectByID = function(req,res)
{
    models.Oblast.findAll({ where: {id:req.params.id} })
        .then(function(oblast) {
            res.send({error:false,data:oblast});
        })
        .catch(function(error){
            res.send({error:error});
        });
};



module.exports = {selectAll,selectByID};