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
    }),
    Direction_category: sequelize.define('direction_category', {

        name: {
            type: Sequelize.STRING
        },
        logo:{
            type: Sequelize.STRING
        },
        order_by: {
            type: Sequelize.INTEGER
        }        
    }, {
        freezeTableName: true // Model tableName will be the same as the model name
    })
    
    
    
    


};

//obj.Users.sync({force: true});
//obj.Direction_category.sync({force: true});

module.exports = obj;