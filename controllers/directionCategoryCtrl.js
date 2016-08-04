/**
 * Created by user on 23.07.2016.
 */
    var models = require('../models/models');


    var insertCategory = function(req,res,next)
    {
        //req.file.path
        
        models.Direction_category.create(req.direction_category)
            .then(function(direction_categories) {
                res.send({error:false,data:direction_category});
            })
            .catch(function(error){
                res.send({error:error});
            });
    };
    var updateCategory = function(req,res,next)
    {
        //req.file.path

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


