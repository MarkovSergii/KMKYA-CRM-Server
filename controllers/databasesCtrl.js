/**
 * Created by user on 03.09.2016.
 */
'use strict';


var models = require('../models/models');
let config  = require('../config');

var getDirectionByDatabaseID = (database_id) =>

    models.Databases.findOne({ where: {id:database_id},raw:true })
        .then(function(row) {
            return row.database_category_id
        })
        .catch(function(error){

});


module.exports = {
    getDirectionByDatabaseID
};