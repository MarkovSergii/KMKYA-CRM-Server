
let connection = (direction)=> require('./connections')(direction)

let tables = (clientDB,dopDB) =>{

    let models = require('./models')(clientDB,dopDB)
    let obj = {};

    obj.PRICE_BUILD = dopDB.define('PRICE_BUILD',models.PRICE_BUILD);
    obj.PRICE_BUILD.mod = 'PRICE_BUILD';
    obj.PRICE_BUILD.schema = dopDB;

    obj.OWNERSHIP = clientDB.define('OWNERSHIP',models.OWNERSHIP);
    obj.OWNERSHIP.mod = 'OWNERSHIP';
    obj.OWNERSHIP.schema = clientDB;

    obj.COUNTRY = clientDB.define('COUNTRY',models.COUNTRY);
    obj.COUNTRY.mod = 'COUNTRY';
    obj.COUNTRY.schema = clientDB;

    obj.OBLAST = clientDB.define('OBLAST',models.OBLAST);
    obj.OBLAST.mod = 'OBLAST';
    obj.OBLAST.schema = clientDB;

    obj.CITY = clientDB.define('CITY',models.CITY);
    obj.CITY.mod = 'CITY';
    obj.CITY.schema = clientDB;

    obj.FIRMS = clientDB.define('FIRMS',models.FIRMS);
    obj.FIRMS.mod = 'FIRMS';
    obj.FIRMS.schema = clientDB;


    return {tables:obj,models}
};

module.exports = {tables,connection}