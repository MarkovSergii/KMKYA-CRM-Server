/**
 * Created by user on 23.07.2016.
 */
"use strict";

module.exports.secret = 'some_sekret!';


module.exports.db_config = {
    db : '',
    user : '',
    password : '',
    mysql : {
        host: '93.171.158.114',
        dialect: 'mysql',
        collate: "utf8_general_ci",
        pool: {
            max: 10,
            min: 0,
            idle: 10000
        }
    }
};