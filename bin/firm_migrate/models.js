const dopDB = require('./connections').dopDB
const clientDB = require('./connections').clientDB

let models = {
    PRICE_BUILD: {
        ID: {type: dopDB.Number},
        NUM: {type: dopDB.String},
        NAME: {type: dopDB.String},
        PRICE: {type: dopDB.String},
        PRICE_RAZDEL: {type: dopDB.Number}
    },
    OWNERSHIP: {
        ID: {type: clientDB.Number},
        NAME: {type: clientDB.String}
    },
    COUNTRY: {
        ID: {type: clientDB.Number},
        NAME: {type: clientDB.String}
    },
    OBLAST: {
        ID: {type: clientDB.Number},
        NAME: {type: clientDB.String},
        COUNTRY_ID: {type: clientDB.Number}
    },
    CITY: {
        ID: {type: clientDB.Number},
        NAME: {type: clientDB.String},
        COUNTRY_ID: {type: clientDB.Number}
    },
    FIRMS: {
        ID: {type: clientDB.Number},
        FIRM_NAME: {type: clientDB.String,need:false},
        OWNERSHIP: {type: clientDB.Number},
        DIRECTOR: {type: clientDB.String,need:false},
        CONTACT_PERSON: {type: clientDB.String,need:false},
        COUNTRY: {type: clientDB.Number},
        OBLAST: {type: clientDB.Number},
        CITY: {type: clientDB.Number},
        POSTINDEX: {type: clientDB.String},
        STREET: {type: clientDB.String,need:false},
        TELEPHONE: {type: clientDB.String},
        FAX: {type: clientDB.String},
        MOBILE: {type: clientDB.String},
        EMAIL: {type: clientDB.String},
        WWW: {type: clientDB.String},
        NOTE: {type: clientDB.String,need:false},
        ID_DB: {type: clientDB.Number},
        LAST_UPDATE_DATETIME: {type: clientDB.Date}
    }
};


module.exports = models