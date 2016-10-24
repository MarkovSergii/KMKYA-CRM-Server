/**
 * Created by user on 23.07.2016.
 */
"use strict";

let jwt = require('jsonwebtoken');
let secret = require('../config').secret;
let password_service = require('../services/password');
let models = require('../models/models');


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
    models.Users.findAll()
        .then(function(users) {
            res.send({error:false,data:users});
        })
        .catch(function(error){
            res.send({error:error});
        });
};
// TODO : добавить доступ с пользователю или делать два запроса
const insert = function(req,res){
    models.Users.create({name:req.body.name,email:req.body.email,password:password_service.encode_password(req.body.password),type:req.body.type})
        .then(function(user) {
            res.send({error:false,data:user});
        })
        .catch(function(error){
            res.send({error:error});
        });
};
// TODO : добавить доступ с пользователю или делать два запроса
var selectByID = function(req,res)
{
    models.Users.findAll({ where: {id:req.params.id} })
        .then(function(user) {
            res.send({error:false,data:user});
        })
        .catch(function(error){
            res.send({error:error});
        });
};
// TODO : добавить доступ с пользователю или делать два запроса
const update = function(req,res){
    models.Users.update({name:req.body.name,email:req.body.email,password:password_service.encode_password(req.body.password),type:req.body.type},{where:{id:req.params.id}})
        .then(function(affectedRows) {
            if (affectedRows == 0)
            {
                res.send({error:true,message:"Ничего не обновлено"});
            }
            else
            {
                res.send({error:false});
            }
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