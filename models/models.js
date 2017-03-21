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
    Subexhibitions: sequelize.define('subexhibitions', {

        name: {
            type: Sequelize.STRING
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
    }),
    Databases: sequelize.define('databases', {

        name: {
            type: Sequelize.STRING
        },
        database_category_id: {
            type: Sequelize.INTEGER
        }
    }, {
        freezeTableName: true // Model tableName will be the same as the model name
    }),
    Exhibition_users: sequelize.define('exhibition_users', {

        user_id: {
            type: Sequelize.INTEGER
        },
        exhibition_id: {
            type: Sequelize.INTEGER
        }
    }, {
        freezeTableName: true // Model tableName will be the same as the model name
    }),
    Direction_users: sequelize.define('direction_users', {

        user_id: {
            type: Sequelize.INTEGER
        },
        direction_category_id: {
            type: Sequelize.INTEGER
        }
    }, {
        freezeTableName: true // Model tableName will be the same as the model name
    }),
    Firms: sequelize.define('firms', {

        name: {
            type: Sequelize.STRING
        },
        director:{
            type: Sequelize.STRING
        },
        contact_person:{
            type: Sequelize.STRING
        },
        database_id: {
            type: Sequelize.INTEGER
        },
        country_id: {
            type: Sequelize.INTEGER
        },
        country: {
            type: Sequelize.STRING
        },
        oblast_id: {
            type: Sequelize.INTEGER
        },
        oblast: {
            type: Sequelize.STRING
        },
        city_id: {
            type: Sequelize.INTEGER
        },
        city: {
            type: Sequelize.STRING
        },
        address: {
            type: Sequelize.TEXT
        },
        postindex: {
            type: Sequelize.STRING
        },
        tels:{
            type: Sequelize.TEXT
        },
        emails:{
            type: Sequelize.TEXT
        },
        web:{
            type: Sequelize.TEXT
        },
        note:{
            type: Sequelize.TEXT
        },
        tags: {
            type: Sequelize.TEXT
        },
        tagsNames: {
            type: Sequelize.TEXT
        },
        files: {
            type: Sequelize.TEXT
        }
    }, {
        freezeTableName: true // Model tableName will be the same as the model name
    }),
    FirmExhibitions: sequelize.define('direction_users', {

        firm_id: {
            type: Sequelize.INTEGER
        },
        exhibition_id: {
            type: Sequelize.INTEGER
        },
        direction_category_id: {
            type: Sequelize.INTEGER
        }
    }, {
        freezeTableName: true // Model tableName will be the same as the model name
    }),
    Tags: sequelize.define('tags', {

        name: {
            type: Sequelize.STRING
        },
        direction_category_id: {
            type: Sequelize.INTEGER
        }
    }, {
        freezeTableName: true // Model tableName will be the same as the model name
    }),
    Files: sequelize.define('files', {

        original_name: {
            type: Sequelize.STRING
        },
        save_name: {
            type: Sequelize.STRING
        },
        save_path: {
            type: Sequelize.STRING
        },
        file_type: {
            type: Sequelize.STRING
        }
    }, {
        freezeTableName: true // Model tableName will be the same as the model name
    })

};







// if uncomment then drop and recreate table

//obj.Users.sync({force: true});
//obj.Direction_category.sync({force: true});
//obj.Direction_users.sync({force: true});
//obj.Exhibitions.sync({force: true});
//obj.Subexhibitions.sync({force: true});
//obj.Seasons.sync({force: true});
//obj.Access_types.sync({force: true});
//obj.Access.sync({force: true});
//obj.City.sync({force: true});
//obj.Oblast.sync({force: true});
//obj.Country.sync({force: true});
//obj.Databases.sync({force: true});
//obj.Database_category.sync({force: true});
//obj.Exhibition_users.sync({force: true});
//obj.Firms.sync({force: true});
//obj.Tags.sync({force: true});
//obj.FirmExhibitions.sync({force: true});
//obj.Files.sync({force: true});







module.exports = obj;