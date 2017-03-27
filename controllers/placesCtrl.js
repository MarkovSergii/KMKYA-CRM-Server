/**
 * Created by Марина on 27.03.2017.
 */

'use strict';

var models = require('../models/models');
let config  = require('../config');

var insert = function(req,res)
{
    console.log(req.body.name);
    models.Places.create({name:req.body.name})
        .then(function(place) {

            res.send({error:false,data:place});
        })
        .catch(function(error){
            res.send({error:error});
        });
};
var selectAll = function(req,res)
{
    models.Places.findAll()
        .then(function(place) {
            res.send({error:false,data:place});
        })
        .catch(function(error){
            res.send({error:error});
        });
};
var update = function(req,res)
{

    models.Places.update({name:req.body.name},{where:{id:req.params.id}})
        .then(function(affectedRows) {
            if (affectedRows == 0)
            {
                res.send({error:true,message:"Ничего не обновлено"});
            }
            else
            {
                res.send({error:false});
            }
        })
        .catch(function(error){
            res.send({error:error});
        });
};

module.exports = {insert,selectAll,update};