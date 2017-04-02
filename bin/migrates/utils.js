const iconv = require('iconv-lite');
const R = require('ramda');



let convertToWin = (buf)=> (buf) ?  iconv.decode(new Buffer(buf), 'win1251') : "";

let convertResult = (res,types)=>

{
    return res.map((oneElem)=>{
        for (let prop in oneElem){            
            if ((types[prop] == 'String') || (types[prop] == 'Text'))
            {
                oneElem[prop] = convertToWin(oneElem[prop])
            }
        }
        return oneElem
        
    });
}

let getTypeArray = (model,models) =>
    new Promise((resolve,reject)=>{
        try{
            let arr = R.keys(models[model.mod]).map((x)=>{
                let obj ={};
                obj[x] = model.schema.models[model.mod].whatTypeName(x)
                if (models[model.mod][x].need == false) obj ={};
                return obj
            })
            let keys = arr.map(x=>R.keys(x))
            let values = arr.map(x=>R.values(x)[0])
            resolve(R.zipObj(keys,values))
        }
        catch (e) {reject(e)   }
    });

let query = ({q,model,models})=>
    new Promise((resolve,reject)=>{
        model.all(q,(err,data)=>{
            if (err) reject(err);
            getTypeArray(model,models)
                .then((types)=> resolve(convertResult(data,types)))
                .catch((e)=>reject(e))
        })
    });

module.exports = {
    convertToWin,
    convertResult,
    getTypeArray,
    query
}