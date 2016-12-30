/**
 * Created by sergii on 12.11.16.
 */
'use strict';
var models = require('../models/models');
let config  = require('../config');


const selectAll = (req,res)=>{
    
    models.Tags.findAll({where:{direction_category_id:req.params.id}})
        .then(function(tags) {
            res.send({error:false,data:tags});
        })
        .catch(function(error){
            res.send({error:error});
        });
};

const insertCheck = (tag,direction_category_id)=>{
    models.Tags.findOrCreate({where:{name:tag,direction_category_id:direction_category_id}})
};

const insert = (req,res)=>{

res.send('ok');
};

const remove = (req,res)=>{
    models.Tags.destroy({where: {id: req.params.id}})
        .then(()=>res.send({error:false}))
        .catch(function(error){
                res.send({error:error});
        });
};

module.exports = {
    selectAll,
    insertCheck,
    insert,
    remove
};