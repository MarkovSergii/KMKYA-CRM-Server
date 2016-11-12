/**
 * Created by user on 08.11.2016.
 */
'use strict';

var models = require('../models/models');
let config  = require('../config');



var _selectExhibitionsUsersByUserID = (user_id) =>
    models.Exhibition_users.findAll({ where: {user_id:user_id} })
        .then((exhibitions)=> exhibitions.map(function(item){ return item.exhibition_id}))
        .catch(function(error){
            return(error);
        });

var selectExhibitionsUsersByUserID =  function(req,res)
{
    _selectExhibitionsUsersByUserID(req.params.user_id)
        .then((ac)=>res.send({error:false,data:ac}))
        .catch((error) => res.send({error:error}));
};

module.exports = {
    _selectExhibitionsUsersByUserID,
    selectExhibitionsUsersByUserID
};