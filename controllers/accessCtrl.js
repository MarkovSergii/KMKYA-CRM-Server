/**
 * Created by user on 23.08.2016.
 */
'use strict';


var models = require('../models/models');
let config  = require('../config');

var insert = function(req,res)
{
    models.Access.create({name:req.body.name})
        .then(function(season) {
            res.send({error:false,data:season});
        })
        .catch(function(error){
            res.send({error:error});
        });
};

var selectByUserID =  function(req,res)
{
    models.Access.findAll({ where: {user_id:req.params.user_id} })
        .then(function(user_access) {
            res.send({error:false,data:user_access});
        })
        .catch(function(error){
            res.send({error:error});
        });
};

var update = function(req,res)
{

    models.Access.update({name:req.body.name},{where:{id:req.params.id}})
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
    models.Access.findAll()
        .then(function(seasons) {
            res.send({error:false,data:seasons});
        })
        .catch(function(error){
            res.send({error:error});
        });
};
var selectByID = function(req,res)
{
    models.Access.findAll({ where: {id:req.params.id} })
        .then(function(season) {
            res.send({error:false,data:season});
        })
        .catch(function(error){
            res.send({error:error});
        });
};
var remove = function(req,res)
{
    models.Access.destroy({where: {id: req.params.id}})
        .then(function() {
            res.send({error:false});
        })
        .catch(function(error){
            res.send({error:error});
        });
};


module.exports = {
    insert,
    update,
    selectAll,
    selectByID,
    selectByUserID,
    remove
};