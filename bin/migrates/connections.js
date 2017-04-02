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
        fashion:{
            driver     : "firebird", 
            host       : "10.1.1.3",
            port       : "3050",
            username   : "SYSDBA",
            password   : "masterkey",
            database   : "z:\\KMKYA_CRM_2\\FASHION\\kmkya_crm_base.fdb",
            pool       : false 
            },
        build:{
            driver     : "firebird",
            host       : "10.1.1.3",
            port       : "3050",
            username   : "SYSDBA",
            password   : "masterkey",
            database   : "z:\\KMKYA_CRM_2\\BUILD\\kmkya_crm_base.fdb",
            pool       : false
        },
        jewel:{
            driver     : "firebird",
            host       : "10.1.1.3",
            port       : "3050",
            username   : "SYSDBA",
            password   : "masterkey",
            database   : "z:\\KMKYA_CRM_2\\JEWEL\\kmkya_crm_base.fdb",
            pool       : false
        },
        pack_ptm:{
            driver     : "firebird",
            host       : "10.1.1.3",
            port       : "3050",
            username   : "SYSDBA",
            password   : "masterkey",
            database   : "z:\\KMKYA_CRM_2\\PACK_PTM\\kmkya_crm_base.fdb",
            pool       : false
        },
        rest:{
            driver     : "firebird",
            host       : "10.1.1.3",
            port       : "3050",
            username   : "SYSDBA",
            password   : "masterkey",
            database   : "z:\\KMKYA_CRM_2\\REST\\kmkya_crm_base.fdb",
            pool       : false
        },
        mebel:{
            driver     : "firebird",
            host       : "10.1.1.3",
            port       : "3050",
            username   : "SYSDBA",
            password   : "masterkey",
            database   : "z:\\KMKYA_CRM_2\\MEBEL\\kmkya_crm_base.fdb",
            pool       : false
        },
        agro:{
            driver     : "firebird",
            host       : "10.1.1.3",
            port       : "3050",
            username   : "SYSDBA",
            password   : "masterkey",
            database   : "z:\\KMKYA_CRM_2\\AGRO\\kmkya_crm_base.fdb",
            pool       : false
        }

   };


module.exports = (direction)=>{

  let dopDB  = new Schema('firebird', connections.dopDB);
  let clientDB  = new Schema('firebird', connections[direction]);
    
    return {
      dopDB,
      clientDB
  }  
};


