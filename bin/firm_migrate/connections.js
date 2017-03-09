const caminte = require('caminte');
const Schema = caminte.Schema;

const connections = 
    {
        dopDB : {
            driver     : "firebird", 
            host       : "10.1.1.3",
            port       : "3050",
            username   : "SYSDBA",
            password   : "masterkey",
            database   : "z:\\KMKYA_CRM_2\\kmkya_dop_base.fdb",
            pool       : false 
            },
        clientDB:{
            driver     : "firebird", 
            host       : "10.1.1.3",
            port       : "3050",
            username   : "SYSDBA",
            password   : "masterkey",
            database   : "z:\\KMKYA_CRM_2\\FASHION\\kmkya_crm_base.fdb",
            pool       : false 
            }
        
   };


const dopDB  = new Schema('firebird', connections.dopDB);
const clientDB  = new Schema('firebird', connections.clientDB);





module.exports = {
    connections,
    dopDB,
    clientDB
};