
/**
 * Created by Марина on 24.03.2017.
 */
'use strict';


var models = require('../models/models');
let config  = require('../config');

var insert = function(req,res)
{
    console.log(req.body.name);
    models.Squaretypes.create({name:req.body.name})
        .then(function(squareType) {

            res.send({error:false,data:squareType});
        })
        .catch(function(error){
            res.send({error:error});
        });
};
var selectAll = function(req,res)
{
    models.Squaretypes.findAll()
        .then(function(squaretypes) {
            res.send({error:false,data:squaretypes});
        })
        .catch(function(error){
            res.send({error:error});
        });
};
var update = function(req,res)
{

    models.Squaretypes.update({name:req.body.name},{where:{id:req.params.id}})
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