const utils = require('../utils')

module.exports = ({tables,models,socket})=>{

    socket.on('go1',()=>{
        utils.query({q:{where:{ID:5} }, model:tables.FIRMS,models:models})
            .then((data)=>{
                socket.emit('go1',data[0])
            })
            .catch((e)=>console.log(e));
    })

    // use newDatabase.Users.findAll({raw: true}) to get data from new database
    

}