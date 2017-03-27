/**
 * Created by user on 23.07.2016.
 */
'use strict';

let router = require('express').Router();
let multer  = require('multer');
let config  = require('./config');

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
let seasonsCtrl = require('./controllers/seasonsCtrl');
let exhibitionsCtrl = require('./controllers/exhibitionsCtrl');
let subexhibitionsCtrl = require('./controllers/subexhibitionsCtrl');
let cataloguesCtrl = require('./controllers/cataloguesCtrl');
let accessTypesCtrl = require('./controllers/accessTypesCtrl');
let accessCtrl = require('./controllers/accessCtrl');
let squaretypesCtrl = require('./controllers/squareTypesCtrl');

let countryCtrl = require('./controllers/countryCtrl');
let oblastCtrl = require('./controllers/oblastCtrl');
let cityCtrl = require('./controllers/cityCtrl');


let databasesCtrl = require('./controllers/databasesCtrl');
let firmsCtrl = require('./controllers/firmsCtrl');
let tagsCtrl = require('./controllers/tagsCtrl');


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
router.get('/api/dictionary/directions/all',directionsCtrl.selectAll);
router.get('/api/dictionary/directions/:id/select',directionsCtrl.selectByID);
router.post('/api/dictionary/directions/insert',upload_public.single('file'),directionsCtrl.insert);
router.post('/api/dictionary/directions/:id/delete',directionsCtrl.remove);
router.post('/api/dictionary/directions/:id/update',upload_public.single('file'),directionsCtrl.update);
//--------------------------------------------------------------------------------------------------------------------
//Seasons
router.get('/api/dictionary/seasons/all',seasonsCtrl.selectAll);
router.get('/api/dictionary/seasons/:id/select',seasonsCtrl.selectByID);
router.post('/api/dictionary/seasons/insert',seasonsCtrl.insert);
router.post('/api/dictionary/seasons/:id/delete',seasonsCtrl.remove);
router.post('/api/dictionary/seasons/:id/update',seasonsCtrl.update);
//--------------------------------------------------------------------------------------------------------------------
//Exhibitions
router.get('/api/dictionary/exhibitions/all',exhibitionsCtrl.selectAll);
router.get('/api/dictionary/exhibitions/:id/select',exhibitionsCtrl.selectByID);
router.post('/api/dictionary/exhibitions/insert',exhibitionsCtrl.insert);
router.post('/api/dictionary/exhibitions/:id/delete',exhibitionsCtrl.remove);
router.post('/api/dictionary/exhibitions/:id/update',exhibitionsCtrl.update);
//--------------------------------------------------------------------------------------------------------------------
// Square types
router.get('/api/dictionary/squaretypes/all',squaretypesCtrl.selectAll);
router.post('/api/dictionary/squaretypes/insert',squaretypesCtrl.insert);
router.post('/api/dictionary/squaretypes/:id/update',squaretypesCtrl.update);
//--------------------------------------------------------------------------------------------------------------------
// catalogs
router.get('/api/dictionary/catalogues/all',cataloguesCtrl.selectAll);
//router.get('/api/dictionary/catalogues/:id/select',cataloguesCtrl.selectByID);
router.post('/api/dictionary/catalogues/insert',cataloguesCtrl.insert);
//router.post('/api/dictionary/catalogues/:id/delete',cataloguesCtrl.remove);
router.post('/api/dictionary/catalogues/:id/update',cataloguesCtrl.update);
//--------------------------------------------------------------------------------------------------------------------
// Subexhibitions
router.get('/api/dictionary/subexhibitions/all',subexhibitionsCtrl.selectAll);
//router.get('/api/dictionary/subexhibitions/:id/select',subexhibitionsCtrl.selectByID);
 router.post('/api/dictionary/subexhibitions/insert',subexhibitionsCtrl.insert);
// router.post('/api/dictionary/subexhibitions/:id/delete',subexhibitionsCtrl.remove);
 router.post('/api/dictionary/subexhibitions/:id/update',subexhibitionsCtrl.update);
//--------------------------------------------------------------------------------------------------------------------
//access_types
router.get('/api/dictionary/access_types/all',accessTypesCtrl.selectAll);
router.get('/api/dictionary/access_types/:id/select',accessTypesCtrl.selectByID);
router.get('/api/dictionary/access_types/selectBy/:field/:value',accessTypesCtrl.selectBy);
router.post('/api/dictionary/access_types/insert',accessTypesCtrl.insert);
router.post('/api/dictionary/access_types/:id/delete',accessTypesCtrl.remove);
router.post('/api/dictionary/access_types/:id/update',accessTypesCtrl.update);
//--------------------------------------------------------------------------------------------------------------------
//access
router.get('/api/dictionary/access/all',accessCtrl.selectAll);
router.get('/api/dictionary/access/byUserId/:user_id',accessCtrl.selectAccessByUserID);
router.post('/api/dictionary/access/insert',accessCtrl.insert);
router.post('/api/dictionary/access/:id/delete',accessCtrl.remove);
//--------------------------------------------------------------------------------------------------------------------
// city
router.get('/api/dictionary/city/all',cityCtrl.selectAll);
router.get('/api/dictionary/city/byOblastId/:oblast_id',cityCtrl.selectByOblastId);
router.get('/api/dictionary/city/:id/select',cityCtrl.selectByID);
//--------------------------------------------------------------------------------------------------------------------
// oblast
router.get('/api/dictionary/oblast/all',oblastCtrl.selectAll);
router.get('/api/dictionary/oblast/:id/select',oblastCtrl.selectByID); 
//--------------------------------------------------------------------------------------------------------------------
// country
router.get('/api/dictionary/country/all',countryCtrl.selectAll);
router.get('/api/dictionary/country/:id/select',countryCtrl.selectByID);
//--------------------------------------------------------------------------------------------------------------------
// databases
router.get('/api/dictionary/database/all',databasesCtrl.selectAll);
router.get('/api/dictionary/database/:id/select',databasesCtrl.selectByID);
router.post('/api/dictionary/database/insert',databasesCtrl.insert);
router.post('/api/dictionary/database/:id/delete',databasesCtrl.remove);
router.post('/api/dictionary/database/:id/update',databasesCtrl.update);
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



// test deploy
module.exports = router;