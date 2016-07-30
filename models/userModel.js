/**
 * Created by user on 23.07.2016.
 */
"use strict";

let models = require('./models');


module.exports = {
    getUserBy: (params,callback) =>{


       models.Users.findOne({ where: params })
           .then(function(user) {
                callback(null,user)
           })
           .catch(function(err){
                callback(err)
           });
    }

};