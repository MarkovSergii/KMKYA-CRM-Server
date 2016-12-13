/**
 * Created by user on 23.07.2016.
 */
"use strict";

module.exports.secret = 'some_sekret!';
module.exports.salt = '_solt';

module.exports.public_path = '/filestore/public/';
module.exports.auth_path = '/filestore/auth/';

module.exports.port = 3000;
module.exports.socket_port = 3001;

module.exports.db_config = {
    db : 'admin_KMKYA_CRM',
    user : 'admin_kmkya_crm',
    password : '1234567890',
    mysql : {
        host: '178.159.39.65',
        dialect: 'mysql',
        collate: "utf8_general_ci",
        pool: {
            max: 10,
            min: 0,
            idle: 10000
        }
    }
};