/**
 * Created by user on 03.09.2016.
 */
'use strict';


var models = require('../models/models');
let config  = require('../config');

var insert = function(req,res)
{
    models.Databases.create(req.body)
        .then(function(database) {
            res.send({error:false,data:database});
        })
        .catch(function(error){
            res.send({error:error});
        });
};

var getDirectionByDatabaseID = (database_id) =>

    models.Databases.findOne({ where: {id:database_id},raw:true })
        .then(function(row) {
            return row.database_category_id
        })
        .catch(function(error){

        });


var update = function(req,res)
{

    models.Databases.update(req.body,{where:{id:req.params.id}})
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
    getDirectionByDatabaseID,
    selectByDatabaseCategoryID,
    selectByID,
    remove
};