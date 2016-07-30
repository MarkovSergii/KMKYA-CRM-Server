/**
 * Created by user on 30.07.2016.
 */
'use strict';

var md5 = require('md5');
var salt = require('../config').salt;


let encode_password = function(password){
    return (md5(password+salt));
};

module.exports = {
    md5,
    encode_password
    
};
