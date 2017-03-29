'use strict';


var models = require('../models/models');
let config  = require('../config');



    let insert = function(req,res)
    {
        models[req.params.table].create(req.body)
            .then(function(obj) {
                res.send({error:false,data:obj});
            })
            .catch(function(error){
                res.send({error:error});
            });
    };

    let update = function(req,res) {

        models[req.params.table].update(req.body, {where: {id: req.params.id}})
            .then(function (affectedRows) {
                if (affectedRows == 0) {
                    res.send({error: true, message: "Ничего не обновлено"});
                }
                else {
                    res.send({error: false});
                }
            })
            .catch(function (error) {
                res.send({error: error});
            });
    }

    let selectAll = function(req,res)
    {
        models[req.params.table].findAll({raw:true})
            .then(function(obj) {
                res.send({error:false,data:obj});
            })
            .catch(function(error){
                res.send({error:error});
            });
    };
    let selectBy = function(req,res){
    
        let p = {};
        p[req.params.field] = req.params.value;
    
        models[req.params.table].findAll({ where: p,raw:true })
            .then(function(obj) {
                res.send({error:false,data:obj});
            })
            .catch(function(error){
                res.send({error:error});
            });
    }

    let remove = function(req,res)
    {
        models[req.params.table].destroy({where: {id: req.params.id}})
            .then(function() {
                res.send({error:false});
            })
            .catch(function(error){
                res.send({error:error});
            });
    };



module.exports = {
    insert,
    remove,
    selectBy,
    selectAll,
    update
}

