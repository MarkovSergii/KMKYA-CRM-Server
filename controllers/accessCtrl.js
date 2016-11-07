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

var insertAccess = (user_id,access_types) =>
  Promise.all(access_types.map((one_access)=> models.Access.create({user_id:user_id,access_type_id:one_access})));

var deleteAccess = (user_id) =>
    models.Access.destroy({where: {user_id: user_id}});

var _selectAccessByUserID = (user_id) =>
     models.Access.findAll({ where: {user_id:user_id} })
        .then((user_access)=> user_access.map(function(item){ return item.access_type_id}))     
        .catch(function(error){
            return(error);
        });

var selectAccessByUserID =  function(req,res)
{
    _selectAccessByUserID(req.params.user_id)
        .then((ac)=>{console.log(ac);res.send({error:false,data:ac})})
        .catch((error) => res.send({error:error}));
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
    insertAccess,
    deleteAccess,
    selectAccessByUserID,
    _selectAccessByUserID,
    remove
};