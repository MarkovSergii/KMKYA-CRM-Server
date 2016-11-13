/**
 * Created by sergii on 12.11.16.
 */
'use strict';
var models = require('../models/models');
let config  = require('../config');


const selectAll = (req,res)=>{
    
    models.Tags.findAll()
        .then(function(tags) {
            res.send({error:false,data:tags});
        })
        .catch(function(error){
            res.send({error:error});
        });
}

const insert = (req,res)=>{

    models.Tags.create(req.name)
        .then(()=>res.send({error:false,data:req.name}))
        .catch(function(error){
            res.send({error:error});
        });
}

const remove = (req,res)=>{

    models.Tags.destroy({where: {name: req.params.name}})
        .then(()=>res.send({error:false,data:req.name}))
        .catch(function(error){
                res.send({error:error});
        });
}

module.exports = {
    selectAll,
    insert,
    remove
}