/**
 * Created by user on 23.08.2016.
 */
'use strict';


var models = require('../models/models');
let config  = require('../config');

var insert = function(req,res)
{
    models.Access_groups.create({name:req.body.name})
        .then(function(season) {
            res.send({error:false,data:season});
        })
        .catch(function(error){
            res.send({error:error});
        });
};

var selectAllWithTypes = function(req,res)
{
    // TODO: добавить запрос когда появятся данные
};

var update = function(req,res)
{

    models.Access_groups.update({name:req.body.name},{where:{id:req.params.id}})
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
    models.Access_groups.findAll()
        .then(function(seasons) {
            res.send({error:false,data:seasons});
        })
        .catch(function(error){
            res.send({error:error});
        });
};
var selectByID = function(req,res)
{
    models.Access_groups.findAll({ where: {id:req.params.id} })
        .then(function(season) {
            res.send({error:false,data:season});
        })
        .catch(function(error){
            res.send({error:error});
        });
};
var remove = function(req,res)
{
    models.Access_groups.destroy({where: {id: req.params.id}})
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
    remove,
    selectAllWithTypes
};