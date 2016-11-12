/**
 * Created by user on 23.07.2016.
 */
"use strict";

let jwt = require('jsonwebtoken');
let secret = require('../config').secret;
let password_service = require('../services/password');
let models = require('../models/models');
let accessCtrl = require('../controllers/accessCtrl');
let directionUsersCtrl = require('../controllers/directionUsersCtrl');
let exhibitionsUsersCtrl = require('../controllers/exhibitionsUsersCtrl');
let R = require('ramda');

const login = function (req, res) {
    models.Users.findOne({
        where: {
            email: req.body.email,
            password: password_service.encode_password(req.body.password)
        }
    })
        .then((user)=> {
            if (!user) {
                res.json({
                    error: true,
                    message: 'User not found'
                });
            }
            else {
                user = {id: user.id, name: user.name, type: user.type};
                let token = jwt.sign(user, secret, {
                    expiresIn: "1y" // expires 1 year in
                });
                res.cookie('Authorization', token, {domain: '127.0.0.1', path: '/'});
                res.status(200).json({
                    error: false,
                    token: token,
                    user: user
                });
            }
        })
        .catch((err)=> {
            res.json({
                error: true,
                message: err.msg
            });
        });

};

const sendUserByToken = function (req, res) {
    let token = req.body.token;
    if (token) {
        jwt.verify(token, secret, function (err, decoded) {
            if (err) {
                return res.status(401).json({err: 'Bad token provided.'});
            } else {
                // if everything is good, save to request for use in other routes

                res.status(200).send({
                    error: false,
                    message: "",
                    user: decoded
                });
            }
        });

    } else {

        res.status(401).send({
            error: true,
            message: "need auth"
        });

    }

};

const checkToken = function (req, res, next) {
    let token = req.headers['authorization'] || req.cookies['token'] || 0;
    if (token) {
        jwt.verify(token, secret, function (err, decoded) {
            if (err) {
                return res.status(401).json({err: 'Bad token provided.'});
            } else {
                // if everything is good, save to request for use in other routes
                req.user = decoded;
                next();
            }
        });

    } else {

        // if there is no token
        // return an error
        return res.status(401).send('error no token');

    }
};

const selectAll = function(req,res){
    let arrPA = [];
    let arrPD = [];
    let arrA = [];
    let arrD = [];
    let users = [];
    models.Users.findAll({raw: true})
        .then((u)=>{users=u; return u;})
        .then((users)=>{users.forEach((user)=>arrPA.push(accessCtrl._selectAccessByUserID(user.id))); return users})
        .then((users)=>{users.forEach((user)=>arrPD.push(directionUsersCtrl._selectDirectionUsersByUserID(user.id))); return users})
        .then(()=>Promise.all(arrPA))
        .then((a)=>(arrA=a))
        .then(()=>Promise.all(arrPD))
        .then((d)=>(arrD=d))
        .then(function() {
            let fullUsers = users.map((user,i)=>{
                user.access = arrA[i];
                user.directions = arrD[i];
                return user;
            });
            res.send({error:false,data:fullUsers});
        })
        .catch(function(error){
            console.log(error);
            res.send({error:error});
        });
};

const insert = function(req,res){
    var newUser_id;
    let user = {};
    models.Users.create({name:req.body.name,email:req.body.email,password:password_service.encode_password(req.body.password),type:req.body.type})
        .then((user)=>{newUser_id = user.id; return user})
        .then(()=>accessCtrl.insertAccess(newUser_id,req.body.access_types || []))
        .then(()=>directionUsersCtrl.insertDirections(newUser_id,req.body.directions || []))
        .then(()=>models.Users.findOne({where:{id:newUser_id},raw: true}))
        .then((u)=>{user = u;return u;})
        .then(function() {
            user.directions = req.body.directions || [];
            user.access = req.body.access_types || [];
            res.send({error:false,data:user});
        })
        .catch(function(error){
            console.log(error);
            res.send({error:error});
        });
};

var selectByID = function(req,res)
{   let user = {};
    let some_f = {};
    models.Users.findOne({where:{id:req.params.id},raw: true})
        .then((u)=>{user = u;return u;})
        .then(()=> accessCtrl._selectAccessByUserID(req.params.id))
        .then((access)=>some_f.access = access)
        .then(()=>directionUsersCtrl._selectDirectionUsersByUserID(req.params.id))
        .then((directions)=>some_f.directions = directions)
        .then(()=>exhibitionsUsersCtrl._selectExhibitionsUsersByUserID(req.params.id))
        .then((exhibitions)=>some_f.exhibitions = exhibitions)
        .then(function() {
            res.send({error:false,data:R.merge(user,some_f)});
        })
        .catch(function(error){
            console.log(error);
            res.send({error:error});
        });
};

const update = function(req,res){

    let new_password;
    if (req.body.password) new_password = password_service.encode_password(req.body.password);

    models.Users.update({name:req.body.name,email:req.body.email,password:new_password,type:req.body.type},{where:{id:req.params.id}})
        .then(()=>accessCtrl.deleteAccess(req.params.id))
        .then(()=>directionUsersCtrl.deleteDirections(req.params.id))
        .then(()=>accessCtrl.insertAccess(req.params.id,req.body.access_types))
        .then(()=>directionUsersCtrl.insertDirections(req.params.id,req.body.directions))
        .then(()=> {
            //TODO: добавить socket событие на отправку измененных доступов или данных
            res.send({error:false})
        })
        .catch(function(error){
            res.send({error:error});
        });
};




module.exports = {
    checkToken,
    sendUserByToken,
    login,
    selectAll,
    selectByID,
    insert,
    update
};