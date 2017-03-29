/**
 * Created by user on 23.08.2016.
 */
'use strict';


var models = require('../models/models');
let config  = require('../config');

var insertAccess = (user_id,access_types) =>
  Promise.all(access_types.map((one_access)=> models.Access.create({user_id:user_id,access_type_id:one_access})));

var deleteAccess = (user_id) =>
    models.Access.destroy({where: {user_id: user_id}});

var _selectAccessByUserID = (user_id) =>
     models.Access.findAll({ where: {user_id:user_id} })
        .then((user_access)=> user_access.map(function(item){ return item.access_type_id}))     
        .catch(function(error){
            return(error);
        });



module.exports = {
    insertAccess,
    deleteAccess,
    _selectAccessByUserID
};