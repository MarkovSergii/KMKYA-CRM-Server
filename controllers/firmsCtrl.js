/**
 * Created by sergii on 12.11.16.
 */
'use strict';
var models = require('../models/models');
let config  = require('../config');

var insert = function(req,res)
{
    let firmId;
    console.log(req.body);
    models.Firms.create(req.body)
        .then(function(firm) {
            firmId = firm.id;
        })
        .then(()=>models.Firms.findOne({where:{id:firmId},raw:true}))
        .then((addedFirm)=>{addedFirm.files_ids = []; res.send({error:false,data:addedFirm})})
        .catch(function(error){
            res.send({error:error});
        });
};

var update = function(req,res)
{
    models.Firms.update(req.firm,{where:{id:req.params.id}})
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
    models.Firms.findAll()
        .then(function(firms) {
            res.send({error:false,data:firms});
        })
        .catch(function(error){
            res.send({error:error});
        });
};

var byDirectionId = function(req,res)
{
    models.Firms.findAll({where: {database_id:req.params.id}})
        .then(function(firms) {
            res.send({error:false,data:firms});
        })
        .catch(function(error){
            res.send({error:error});
        });
};

var selectByID = function(req,res)
{
    models.Firms.findAll({ where: {id:req.params.id} })
        .then(function(firm) {
            res.send({error:false,data:firm});
        })
        .catch(function(error){
            res.send({error:error});
        });
};

var remove = function(req,res)
{
    models.FirmExhibitions.update({firm_id:req.body.firm_id},{where:{id:req.params.id}})
        .then(function(){
            models.Firms.destroy({where: {id: req.params.id}})
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
    selectAll,
    selectByID,
    byDirectionId,
    remove
}