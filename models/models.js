/**
 * Created by user on 23.07.2016.
 */
'use strict';

let Sequelize = require('sequelize');
let db_config = require('../config').db_config;

let sequelize = new Sequelize(db_config.db , db_config.user, db_config.password, db_config.mysql);

let obj = {
    sequelize: sequelize,
    Users: sequelize.define('users', {

        email: {
            type: Sequelize.STRING
        },
        password: {
            type: Sequelize.STRING
        },
        name:{
            type: Sequelize.STRING
        },
        type:{
            type: Sequelize.STRING
        }
    }, {
        freezeTableName: true // Model tableName will be the same as the model name
    })


};

//obj.Users.sync({force: true});

module.exports = obj;