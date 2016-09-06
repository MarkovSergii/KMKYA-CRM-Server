/**
 * Created by user on 03.09.2016.
 */
'use strict';


var models = require('../models/models');
let config  = require('../config');

var insert = function(req,res)
{
    models.Database_category.create(req.body)
        .then(function(database_category) {
            res.send({error:false,data:database_category});
        })
        .catch(function(error){
            res.send({error:error});
        });
};

var update = function(req,res)
{

    models.Database_category.update(req.body,{where:{id:req.params.id}})
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
    models.Database_category.findAll()
        .then(function(database_categories) {
            res.send({error:false,data:database_categories});
        })
        .catch(function(error){
            res.send({error:error});
        });
};
var selectByID = function(req,res)
{
    models.Database_category.findAll({ where: {id:req.params.id} })
        .then(function(database_category) {
            res.send({error:false,data:database_category});
        })
        .catch(function(error){
            res.send({error:error});
        });
};

var remove = function(req,res)
{
    models.Database_category.destroy({where: {id: req.params.id}})
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
    remove
};