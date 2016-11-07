/**
 * Created by user on 07.11.2016.
 */
'use strict';


var models = require('../models/models');
let config  = require('../config');


var insertDirections = (user_id,directions) =>
    Promise.all(directions.map((one_direction)=> models.Direction_users.create({user_id:user_id,direction_category_id:one_direction})));

var deleteDirections = (user_id) =>
    models.Direction_users.destroy({where: {user_id: user_id}});

var _selectDirectionUsersByUserID = (user_id) =>
    models.Direction_users.findAll({ where: {user_id:user_id} })
        .then((directions)=> directions.map(function(item){ return item.direction_category_id}))
        .catch(function(error){
            return(error);
        });

var selectDirectionUsersByUserID =  function(req,res)
{
    _selectDirectionUsersByUserID(req.params.user_id)
        .then((ac)=>res.send({error:false,data:ac}))
        .catch((error) => res.send({error:error}));
};

module.exports = {
    insertDirections,
    deleteDirections,
    _selectDirectionUsersByUserID,
    selectDirectionUsersByUserID
};