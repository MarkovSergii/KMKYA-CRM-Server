/**
 * Created by user on 23.07.2016.
 */
"use strict";

module.exports = {
    getUserBy: (params,cb) =>{
        let user = {id:12,name:"Serg"};

        cb(null,user);
    }

};