const utils = require('../utils')

module.exports = ({tables,models,socket})=>{

    socket.on('go1',()=>{
        utils.query({q:{where:{ID:6} }, model:tables.FIRMS,models:models})
            .then((data)=>{
                socket.emit('go1',data[0])
            })
            .catch((e)=>console.log(e));
    })


}