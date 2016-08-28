/**
 * Created by user on 28.08.2016.
 */
var models = require('../models/models');
let config  = require('../config');


var selectAll = function(req,res)
{
    models.City.findAll()
        .then(function(city) {
            res.send({error:false,data:city});
        })
        .catch(function(error){
            res.send({error:error});
        });
};
var selectByID = function(req,res)
{
    models.City.findAll({ where: {id:req.params.id} })
        .then(function(city) {
            res.send({error:false,data:city});
        })
        .catch(function(error){
            res.send({error:error});
        });
};
var selectByOblastId = function(req,res)
{
    models.City.findAll({ where: {oblast_id:req.params.oblast_id} })
        .then(function(city) {
            res.send({error:false,data:city});
        })
        .catch(function(error){
            res.send({error:error});
        });
};


module.exports = {selectAll,selectByID,selectByOblastId};