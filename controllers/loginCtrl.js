/**
 * Created by user on 23.07.2016.
 */
"use strict";

let userModel = require('../models/userModel');
let jwt = require('jsonwebtoken');
let secret = require('../config').secret;
let password_service = require('../services/password');

module.exports = (function () {
    return {
        login: function (req, res) {

            userModel.getUserBy({email: req.body.email, password: password_service.encode_password(req.body.password)}, function (err, user) {

                    if (err) {
                    res.json({
                        error: true,
                        message: err.msg
                    });
                }
                else {

                    if (!user)
                    {
                        res.json({
                            error:true,
                            message: 'User not found'
                        });
                    }
                    else
                    {   user = {id:user.id,name:user.name,type:user.type};
                        let token = jwt.sign(user, secret, {
                            expiresIn: "1y" // expires 1 year in
                        });
                        res.cookie('Authorization',token,{ domain: '127.0.0.1', path: '/' });
                        res.status(200).json({
                            error:false,
                            token:token,
                            user:user
                        });
                    }
                }
            });

        },
        sendUserByToken:function(req,res)
        {
            let token = req.body.token;
            if (token) {
                jwt.verify(token, secret, function (err, decoded) {
                    if (err) {
                        return res.status(401).json({err:'Bad token provided.'});
                    } else {
                        // if everything is good, save to request for use in other routes

                        res.status(200).send({
                            error:false,
                            message:"",
                            user:decoded
                        });
                    }
                });

            } else {

                res.status(401).send({
                    error:true,
                    message:"need auth"
                });

            }

        },
        checkToken: function (req, res, next) {
            let token = req.headers['authorization'] || 0;
            if (token) {
                jwt.verify(token, secret, function (err, decoded) {
                    if (err) {
                        return res.status(401).json({err:'Bad token provided.'});
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
        }

    }

})();
