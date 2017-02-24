let fs = require('fs');

let fileTypes=[];
let filesPath = __dirname+'/../filestore/public/icons';

try {
    fileTypes = fs.readdirSync(filesPath).map((oneType)=>{
        oneType = oneType.replace('.png','');
        return oneType
    });
}
catch(e){
    console.log(e);
}

module.exports = {fileTypes}