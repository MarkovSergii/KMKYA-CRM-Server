/**
 * Created by user on 23.08.2016.
 */
'use strict';


var models = require('../models/models');
let config  = require('../config');

var insert = function(req,res)
{
    models.Access.create({user_id:req.body.user_id,access_type_id:req.body.access_type_id})
        .then(function(access) {
            res.send({error:false,data:access});
        })
        .catch(function(error){
            res.send({error:error});
        });
};

var selectAccessByUserID =  function(req,res)
{
    let ac = {};
    models.Access.findAll({ where: {user_id:req.params.user_id} })
        .then((user_access)=>{ac.access = user_access.map(function(item){ return item.access_type_id})})
        .then(()=>models.Direction_user.findAll({ where: {user_id:req.params.user_id} }))
        .then((direction_user)=>{ac.direction_user = direction_user.map(function(item){ return item.direction_category_id})})
        .then(()=>models.Exhibition_users.findAll({ where: {user_id:req.params.user_id} }))
        .then((exhibition_user)=>{ac.exhibition_user = exhibition_user.map(function(item){ return item.exhibition_id})})
        .then(function() {
            console.log(ac);
            res.send({error:false,data:ac});
        })
        .catch(function(error){
            res.send({error:error});
        });
};

var selectAll = function(req,res)
{
    models.Access.findAll()
        .then(function(accesss) {
            res.send({error:false,data:accesss});
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
    selectAll,
    selectAccessByUserID,
    remove
};