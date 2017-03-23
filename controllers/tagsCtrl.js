/**
 * Created by sergii on 12.11.16.
 */
'use strict';
var models = require('../models/models');
let config  = require('../config');


const selectBy = (req,res)=>{

    let p = {};
    p[req.params.field] = req.params.value;

    models.Tags.findAll({where:p})
        .then(function(tags) {
            res.send({error:false,data:tags});
        })
        .catch(function(error){
            res.send({error:error});
        });
};

const insertCheck = (tag,directions_id)=>{
    models.Tags.findOrCreate({where:{name:tag,directions_id:directions_id}})
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
    insertCheck,
    insert,
    remove,
    selectBy
};