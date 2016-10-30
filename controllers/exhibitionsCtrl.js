/**
 * Created by user on 18.08.2016.
 */
'use strict';


var models = require('../models/models');
let config  = require('../config');

var insert = function(req,res)
{
    models.Exhibitions.create({name:req.body.name})
        .then(function(exhibition) {
            res.send({error:false,data:exhibition});
        })
        .catch(function(error){
            res.send({error:error});
        });
};
var update = function(req,res)
{

    models.Exhibitions.update({name:req.body.name},{where:{id:req.params.id}})
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
var selectAll = function(req,res)
{
    models.Exhibitions.findAll()
        .then(function(exhibitions) {
            res.send({error:false,data:exhibitions});
        })
        .catch(function(error){
            res.send({error:error});
        });
};
var selectByID = function(req,res)
{
    models.Exhibitions.findAll({ where: {id:req.params.id} })
        .then(function(exhibition) {
            res.send({error:false,data:exhibition});
        })
        .catch(function(error){
            res.send({error:error});
        });
};
var remove = function(req,res)
{
    models.Exhibitions.destroy({where: {id: req.params.id}})
        .then(function() {
            res.send({error:false});
        })
        .catch(function(error){
            res.send({error:error});
        });
};


module.exports = {insert,update,selectAll,selectByID,remove};