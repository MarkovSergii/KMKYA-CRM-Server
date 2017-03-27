/**
 * Created by user on 23.07.2016.
 */
'use strict';

let router = require('express').Router();
let multer  = require('multer');
let config  = require('./config');
var models = require('./models/models');

let storage_public = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, __dirname+config.public_path)
    },
    filename: function (req, file, cb) {
        cb(null, Date.now()+'-' +file.originalname )
    }
});

let storage_auth = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, __dirname+config.auth_path)
    },
    filename: function (req, file, cb) {
        cb(null,  Date.now()+'-' +file.originalname)
    }
});

var upload_public = multer({ storage: storage_public });
var upload_auth = multer({ storage: storage_auth });

let loginCtrl = require('./controllers/usersCtrl');
let directionsCtrl = require('./controllers/directionsCtrl');
let exhibitionsCtrl = require('./controllers/exhibitionsCtrl');
let accessCtrl = require('./controllers/accessCtrl');
let firmsCtrl = require('./controllers/firmsCtrl');
let tagsCtrl = require('./controllers/tagsCtrl');

let simpleTableCtrl = require('./controllers/simpleTableCtrl');

//***********************************************************************************************

router.post('/api/login',loginCtrl.login);
router.post('/api/token',loginCtrl.sendUserByToken);

router.use(loginCtrl.checkToken);

// to this area have access only token auth users
//--------------------------------------------------------------------------------------------------------------------
//users
router.get('/api/dictionary/user/all',loginCtrl.selectAll);
router.get('/api/dictionary/user/:id/select',loginCtrl.selectByID);
router.post('/api/dictionary/user/insert',loginCtrl.insert);
router.post('/api/dictionary/user/:id/update',loginCtrl.update);

//--------------------------------------------------------------------------------------------------------------------
//directionCategory
router.post('/api/dictionary/directions/insert',upload_public.single('file'),directionsCtrl.insert);
router.post('/api/dictionary/directions/:id/delete',directionsCtrl.remove);
router.post('/api/dictionary/directions/:id/update',upload_public.single('file'),directionsCtrl.update);

//--------------------------------------------------------------------------------------------------------------------
//Exhibitions
router.get('/api/dictionary/exhibitions/all',exhibitionsCtrl.selectAll);
router.get('/api/dictionary/exhibitions/:id/select',exhibitionsCtrl.selectByID);
router.post('/api/dictionary/exhibitions/insert',exhibitionsCtrl.insert);
router.post('/api/dictionary/exhibitions/:id/delete',exhibitionsCtrl.remove);
router.post('/api/dictionary/exhibitions/:id/update',exhibitionsCtrl.update);

//--------------------------------------------------------------------------------------------------------------------
//access
router.post('/api/dictionary/access/insert',accessCtrl.insert);

//--------------------------------------------------------------------------------------------------------------------
// firms
router.get('/api/dictionary/firms/all',firmsCtrl.selectAll);
router.get('/api/dictionary/firms/:id/byDirectionId',firmsCtrl.byDirectionId);
router.get('/api/dictionary/firms/selectBy/:field/:value',firmsCtrl.selectBy);
router.get('/api/dictionary/firms/:id/select',firmsCtrl.selectByID);
router.get('/api/dictionary/firms/:id/sendFile',firmsCtrl.sendFile);
router.post('/api/dictionary/firms/insert',firmsCtrl.insert);
router.post('/api/dictionary/firms/:id/update',firmsCtrl.update);
router.post('/api/dictionary/firms/addFile',upload_auth.single('firmFile'),firmsCtrl.addFile);
router.post('/api/dictionary/firms/:id/deleteFile/',firmsCtrl.deleteFile);

//--------------------------------------------------------------------------------------------------------------------
// tags
router.get('/api/dictionary/tags/selectBy/:field/:value',tagsCtrl.selectBy);
router.post('/api/dictionary/tags/insert',tagsCtrl.insert);
router.post('/api/dictionary/tags/:id/delete',tagsCtrl.remove);




//--------------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------------
// simple table
router.get('/api/dictionary/:table/all',simpleTableCtrl.selectAll);
router.get('/api/dictionary/:table/selectBy/:field/:value',simpleTableCtrl.selectBy);
router.get('/api/dictionary/:table/:id/select',simpleTableCtrl.selectByID);
router.post('/api/dictionary/:table/insert',simpleTableCtrl.insert);
router.post('/api/dictionary/:table/:id/update',simpleTableCtrl.update);
router.post('/api/dictionary/:table/:id/delete',simpleTableCtrl.remove);

//--------------------------------------------------------------------------------------------------------------------
module.exports = router;