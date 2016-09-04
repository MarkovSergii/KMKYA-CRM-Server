/**
 * Created by user on 03.09.2016.
 */
'use strict';


var models = require('../models/models');
let config  = require('../config');

var insert = function(req,res)
{
    models.Databases.create({name:req.body.name,database_category_id:req.body.database_category_id})
        .then(function(database) {
            res.send({error:false,data:database});
        })
        .catch(function(error){
            res.send({error:error});
        });
};

var update = function(req,res)
{

    models.Databases.update({name:req.body.name,database_category_id:req.body.database_category_id},{where:{id:req.params.id}})
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
    models.Databases.findAll()
        .then(function(databases) {
            res.send({error:false,data:databases});
        })
        .catch(function(error){
            res.send({error:error});
        });
};
var selectByID = function(req,res)
{
    models.Databases.findAll({ where: {id:req.params.id} })
        .then(function(databases) {
            res.send({error:false,data:databases});
        })
        .catch(function(error){
            res.send({error:error});
        });
};

var selectByDatabaseCategoryID = function(req,res)
{
    models.Databases.findAll({ where: {database_category_id:req.params.id} })
        .then(function(databases) {
            res.send({error:false,data:databases});
        })
        .catch(function(error){
            res.send({error:error});
        });
};

var remove = function(req,res)
{
    models.Databases.destroy({where: {id: req.params.id}})
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
    selectByDatabaseCategoryID,
    selectByID,
    remove
};