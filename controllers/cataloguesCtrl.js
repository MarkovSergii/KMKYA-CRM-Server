/**
 * Created by user on 18.08.2016.
 */
'use strict';


var models = require('../models/models');
let config  = require('../config');

var insert = function(req,res)
{
    console.log(req);
    models.Catalogues.create({name:req.body.name})
        .then(function(subexhibition) {
            res.send({error:false,data:subexhibition});
        })
        .catch(function(error){
            res.send({error:error});
        });
};
var selectAll = function(req,res)
{
    models.Catalogues.findAll()
        .then(function(catalogs) {
            res.send({error:false,data:catalogs});
        })
        .catch(function(error){
            res.send({error:error});
        });
};
var update = function(req,res)
{

    models.Catalogues.update({name:req.body.name},{where:{id:req.params.id}})
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

module.exports = {insert,selectAll,update};