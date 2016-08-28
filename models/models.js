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
    }),
    Exhibitions: sequelize.define('exhibitions', {

        name: {
            type: Sequelize.STRING
        },
        direction_category_id: {
            type: Sequelize.INTEGER
        }
    }, {
        freezeTableName: true // Model tableName will be the same as the model name
    }),
    Seasons: sequelize.define('seasons', {

        name: {
            type: Sequelize.STRING
        }
    }, {
        freezeTableName: true // Model tableName will be the same as the model name
    }),
    Access_types: sequelize.define('access_types', {

        name: {
            type: Sequelize.STRING
        }
    }, {
        freezeTableName: true // Model tableName will be the same as the model name
    }),
    Access: sequelize.define('access', {

        user_id: {
            type: Sequelize.STRING
        },
        access_type_id : {
            type: Sequelize.INTEGER
        }
    }, {
        freezeTableName: true // Model tableName will be the same as the model name
    }),
    City : sequelize.define('city', {

        name: {
            type: Sequelize.STRING
        },
        oblast_id : {
            type: Sequelize.INTEGER
        },
        order_by: {
            type: Sequelize.INTEGER
        }
    }, {
        freezeTableName: true // Model tableName will be the same as the model name
    }),
    Oblast : sequelize.define('oblast', {

        name: {
            type: Sequelize.STRING
        },
        order_by: {
            type: Sequelize.INTEGER
        }
    }, {
        freezeTableName: true // Model tableName will be the same as the model name
    })
    ,
    Country : sequelize.define('country', {

        name: {
            type: Sequelize.STRING
        },
        order_by: {
            type: Sequelize.INTEGER
        }
    }, {
        freezeTableName: true // Model tableName will be the same as the model name
    })

};

// if uncomment then drop and recreate table

//obj.Users.sync({force: true});
//obj.Direction_category.sync({force: true});
//obj.Exhibitions.sync({force: true});
//obj.Seasons.sync({force: true});
//obj.Access_types.sync({force: true});
//obj.Access.sync({force: true});
//obj.City.sync({force: true});
//obj.Oblast.sync({force: true});
//obj.Country.sync({force: true});


module.exports = obj;