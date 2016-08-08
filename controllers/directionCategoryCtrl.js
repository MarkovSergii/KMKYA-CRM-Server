/**
 * Created by user on 23.07.2016.
 */
'use strict';

    var models = require('../models/models');
    let config  = require('../config');

    var insertCategory = function(req,res)
    {
        models.Direction_category.create({name:req.body.name,logo:config.public_path+req.file.filename})
            .then(function(direction_categories) {
                models.Direction_category.update({"order_by":direction_categories.id},{where:{id:direction_categories.id}})
                    .then(function(){
                        direction_categories.order_by = direction_categories.id;
                        res.send({error:false,data:direction_categories});
                    })
                    .catch(function(error){
                        res.send({error:error});
                    });
            })
            .catch(function(error){
                res.send({error:error});
            });
    };
    var updateCategory = function(req,res)
    {
        models.Direction_category.update(req.direction_categories,{where:{id:req.direction_categories.id}})
            .then(function(direction_categories) {
                res.send({error:false,data:direction_categories});
            })
            .catch(function(error){
                res.send({error:error});
            });
    };
    var selectAllCategories = function(req,res)
    {
        models.Direction_category.findAll()
            .then(function(direction_categories) {
                res.send({error:false,data:direction_categories});
            })
            .catch(function(error){
                res.send({error:error});
            });
    };
    var selectCategoryByID = function(req,res)
    {
        models.Direction_category.findAll({ where: {id:req.params.id} })
            .then(function(direction_categories) {
                res.send({error:false,data:direction_categories});
            })
            .catch(function(error){
                res.send({error:error});
            });
    };
    var deleteCategory = function(req,res)
    {
        models.Direction_category.destroy({where: {id: req.params.id}})
            .then(function() {
                res.send({error:false});
            })
            .catch(function(error){
                res.send({error:error});
            });
    };



module.exports = {insertCategory,updateCategory,selectAllCategories,selectCategoryByID,deleteCategory};


