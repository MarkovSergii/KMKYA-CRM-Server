/**
 * Created by sergii on 12.11.16.
 */
'use strict';
let models = require('../models/models');
let config  = require('../config');
let tagCtrl = require('../controllers/tagsCtrl');
let databaseCtrl = require('../controllers/databasesCtrl');
let R = require('ramda');
let fileTypes = require('../services/utils').fileTypes;
let fs = require('fs');
let path = require('path');


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
    let file_reg = /(.+\.)(.+)/g;
    let fileType = req.file.originalname.split(file_reg)[2] ? req.file.originalname.split(file_reg)[2] : '_blank' ;

    fileType = fileTypes.includes(fileType) ? fileType :  '_blank' ;

    models.Files.create({save_path:savePath, original_name: req.file.originalname, save_name:req.file.filename, file_type: fileType})
        .then(function(file) {
            fileId = file.id;
        })
        .then(()=> models.Firms.findOne({where:{id:req.body.firmId},raw:true}))
        .then((firm)=>{
            firm.files = firm.files ? firm.files: '[]';
            let tempFiles = JSON.parse(firm.files);
            tempFiles.push(fileId);
            return tempFiles;
        })
        .then((arrFiles) => {
            models.Firms.update({files: JSON.stringify(arrFiles)},{where:{id:req.body.firmId}});
            return arrFiles;
        })
        .then((arrFiles)=>
            models.Files.findAll({where: {id: arrFiles},raw:true})
                .then((files)=>
                         R.map(item=>{
                             return {
                                       id: item.id,
                                       name: item.original_name,
                                        fileType: item.file_type
                                    }},files)
                ))
        .then((arr)=>res.send({error:false,message:"",data:arr}))
        .catch((e)=>res.send({error:true,message:e,data:[]}))

    //add in log

};

var deleteFile = function(req,res){
    let one_firm;
    console.log('firmId - ',req.params.id);
    console.log('fileId - ',req.body.fileId);
    let fileList;
    models.Firms.findOne({where:{id:req.params.id},raw:true})
        .then((firm)=>{
            one_firm = firm;
            fileList = JSON.parse(firm.files);
            fileList.splice(fileList.indexOf(req.body.fileId),1);
            models.Firms.update({files: JSON.stringify(fileList)},{where:{id:req.params.id}});
            models.Files.destroy({where: {id: req.body.fileId}});
            one_firm.files = JSON.stringify(fileList);
            return firm;
        })
        .then((firm)=>addFilelistToRes(firm))
        .then((firm)=>res.send({error:false,data:firm}))
        .catch((e)=>console.log(error));

    //add in log
};

var sendFile = function(req, res) {
    let file_path = path.join(__dirname, '..') ;
    models.Files.findOne({where: {id: req.params.id}})
        .then((file)=>{
            console.log((path.resolve(file_path + file.save_path)));
            res.setHeader("Content-Disposition", "attachment; filename='test.txt'");
            res.download(path.resolve(file_path + file.save_path))
        })

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
        .then(()=>addFilelistToRes(one_firm))
        .then((firm)=>res.send({error:false,data:firm}))
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

var addFilelistToRes = function(firm) {
    let one_firm = firm;
    return models.Files.findAll({where: {
        id: {$in: JSON.parse(firm.files)}
    }})
        .then((files)=>
            one_firm.fileList = R.map(item=>{
                return {
                    id: item.id,
                    name: item.original_name,
                    fileType: item.file_type
                }},files)
        )
        .then(()=>one_firm)
};

module.exports = {
    insert,
    sendFile,
    update,
    addFile,
    deleteFile,
    selectAll,
    selectByID,
    byDirectionId,
    remove
}