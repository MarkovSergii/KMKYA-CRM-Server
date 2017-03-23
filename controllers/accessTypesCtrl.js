/**
 * Created by user on 23.08.2016.
 */
'use strict';


var models = require('../models/models');
let config  = require('../config');

var insert = function(req,res)
{
    models.Access_types.create({name:req.body.name})
        .then(function(access_type) {
            res.send({error:false,data:access_type});
        })
        .catch(function(error){
            res.send({error:error});
        });
};

var update = function(req,res)
{

    models.Access_types.update({name:req.body.name},{where:{id:req.params.id}})
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
    models.Access_types.findAll()
        .then(function(access_types) {
            res.send({error:false,data:access_types});
        })
        .catch(function(error){
            res.send({error:error});
        });
};

var selectBy = function(req,res){
    
    let p = {};
    p[req.params.field] = req.params.value;

    models.Access_types.findAll({ where: p })
        .then(function(access_type) {
            res.send({error:false,data:access_type});
        })
        .catch(function(error){
            res.send({error:error});
        });
}

var selectByID = function(req,res)
{
    models.Access_types.findAll({ where: {id:req.params.id} })
        .then(function(access_type) {
            res.send({error:false,data:access_type});
        })
        .catch(function(error){
            res.send({error:error});
        });
};
var remove = function(req,res)
{
    models.Access_types.destroy({where: {id: req.params.id}})
        .then(function() {

            models.Access.destroy({where: {access_type_id: req.params.id}})
                .then(function(){

                    res.send({error:false});
                })
                .catch(function(error){
                    res.send({error:error});
                });

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
    selectBy,
    remove
};