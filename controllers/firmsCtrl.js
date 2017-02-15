/**
 * Created by sergii on 12.11.16.
 */
'use strict';
let models = require('../models/models');
let config  = require('../config');
let tagCtrl = require('../controllers/tagsCtrl');
let databaseCtrl = require('../controllers/databasesCtrl');
let R = require('ramda');

var insert = function(req,res)
{
    let firmId;
    console.log(req.body);
    models.Firms.create(req.body)
        .then(function(firm) {
            firmId = firm.id;
        })
        .then(()=>databaseCtrl.getDirectionByDatabaseID(req.body.database_id))
        .then((directionId)=>{ // add new tags
            if (req.body.tags){
                let tagsArr = JSON.parse(req.body.tags);
                console.log(tagsArr);
                tagsArr.map((tag)=> tagCtrl.insertCheck(tag.text,directionId))
            }
        }) 
        .then(()=>models.Firms.findOne({where:{id:firmId},raw:true}))        
        .then((addedFirm)=>{addedFirm.files_ids = []; res.send({error:false,data:addedFirm})})
        .catch(function(error){
            res.send({error:error});
        });
};

var addFile = function(req,res){
    var savePath = req.file.filename ? config.auth_path+req.file.filename : null;

    let fileId;
    models.Files.create({save_path:savePath, original_name: req.file.originalname, save_name:req.file.filename})
        .then(function(file) {
            fileId = file.id;
        })
        .then(()=> models.Firms.findOne({where:{id:req.body.firmId},raw:true}))
        .then((firm)=>{
            firm.files = firm.files ? firm.files: '[]';
            let tempFiles = JSON.parse(firm.files);
            console.log(tempFiles);
            tempFiles.push(fileId);
            return tempFiles;
        })
        .then((arrFiles) => {
            console.log(arrFiles);
            models.Firms.update({files: JSON.stringify(arrFiles)},{where:{id:req.body.firmId}});
            return arrFiles
        })
        .then((arrFiles) =>{
            console.log(arrFiles);
            models.Files.findAll({where: {id: arrFiles}})
                .then((files)=>{
                         R.map(item=>{
                             return {
                                        id: item.id,
                                        name: item.original_name
                                    }},files);
                })
        })
        .then((arr)=>{
            res.send({error:false,message:"",data:arr});
        })
        .catch((e)=>{
            res.send({error:true,message:e,data:[]});
        })

    //add in log

};

var deleteFile = function(req,res){
   
    console.log('firmId - ',req.params.id);
    console.log('fileId - ',req.body.fileId);

    //remove file from db
    //add in log
    //update file field in firms
    //send back to user
    res.send({error:false,message:"",data:[{id:1,name:"hh.jpg"}]});
};

var update = function(req,res)
{
    models.Firms.update(req.body,{where:{id:req.params.id}})
        .then(function(affectedRows) {
            if (affectedRows == 0)
                res.send({error:true,message:"Ничего не обновлено"});
            else
                models.Firms.findOne({where:{id:req.params.id},raw:true})
                .then((addedFirm)=>{addedFirm.files_ids = []; res.send({error:false,data:addedFirm})})
        })
        .catch(function(error){
            res.send({error:error});
        });
};

var selectAll = function(req,res)
{
    models.Firms.findAll()
        .then(function(firms) {
            res.send({error:false,data:firms});
        })
        .catch(function(error){
            res.send({error:error});
        });
};

var byDirectionId = function(req,res)
{
    models.Firms.findAll({where: {database_id:req.params.id}})
        .then(function(firms) {
            res.send({error:false,data:firms});
        })
        .catch(function(error){
            res.send({error:error});
        });
};

var selectByID = function(req,res)
{
    let one_firm;
    models.Firms.findAll({ where: {id:req.params.id}, raw:true })
        .then((firm)=>{
            one_firm = firm[0];
            if (!one_firm.files) one_firm.files = '[]'
        })
        .then(()=>models.Files.findAll({where: {
            id: {$in:   JSON.parse(one_firm.files)}
        }}))
    .then((files)=>{
    console.log('files',files)
    one_firm.fileList =  R.map(item=>{
        return {
            id: item.id,
            name: item.original_name
        }},files);
        return one_firm;
    })
        .then(()=>console.log(one_firm)) // если хо посмотреть что внутри
        .then(function() {
            res.send({error:false,data:one_firm});
        })
        .catch(function(error){
            res.send({error:error});
        });
};

var remove = function(req,res)
{
    models.FirmExhibitions.update({firm_id:req.body.firm_id},{where:{id:req.params.id}})
        .then(function(){
            models.Firms.destroy({where: {id: req.params.id}})
                .then(function() {
                    res.send({error:false});
                })
                .catch(function(error){
                    res.send({error:error});
                });
        })
        .catch(function(error){
            res.send({error:error});
        });
};

module.exports = {
    insert,
    update,
    addFile,
    deleteFile,
    selectAll,
    selectByID,
    byDirectionId,
    remove
}