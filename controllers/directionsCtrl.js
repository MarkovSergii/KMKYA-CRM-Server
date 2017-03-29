/**
 * Created by user on 23.07.2016.
 */
'use strict';

    var models = require('../models/models');
    let config  = require('../config');

    var insert = function(req,res)
    {
        console.log(req.file)
        var logo = req.file.filename ? config.public_path+req.file.filename : null;
        models.Directions.create({name:req.body.name,logo:logo})
            .then(function(directions) {
                models.Directions.update({"order_by":directions.id},{where:{id:directions.id}})
                    .then(function(){
                        directions.order_by = directions.id;
                        res.send({error:false,data:directions});
                    })
                    .catch(function(error){
                        res.send({error:error});
                    });
            })
            .catch(function(error){
                res.send({error:error});
            });
    };
    var update = function(req,res)
    {
        var logo = ((req.file) && (req.file.filename)) ? config.public_path+req.file.filename : req.body.logo;
        models.Directions.update({name:req.body.name,logo:logo},{where:{id:req.params.id}})
            .then(function(directions) {
                models.Directions.findOne({where:{id:req.params.id}})
                    .then(function(updated){
                        res.send({error:false,data:updated});
                    })
                    .catch(function(error){
                        res.send({error:error});
                    });

            })
            .catch(function(error){
                res.send({error:error});
            });
    };


    var remove = function(req,res)
    {
        models.Exhibitions.update({directions_id:req.body.directions_id},{where:{id:req.params.id}})
            .then(function(){
                models.Directions.destroy({where: {id: req.params.id}})
                    .then(function() {
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
    remove
};


