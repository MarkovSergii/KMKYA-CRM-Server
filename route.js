/**
 * Created by user on 23.07.2016.
 */
'use strict';

let express = require('express');
let router = express.Router();
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
let directionCategoryCtrl = require('./controllers/directionCategoryCtrl');
let seasonsCtrl = require('./controllers/seasonsCtrl');
let exhibitionsCtrl = require('./controllers/exhibitionsCtrl');
let accessTypesCtrl = require('./controllers/accessTypesCtrl');
let accessCtrl = require('./controllers/accessCtrl');

let countryCtrl = require('./controllers/countryCtrl');
let oblastCtrl = require('./controllers/oblastCtrl');
let cityCtrl = require('./controllers/cityCtrl');


let databasesCtrl = require('./controllers/databasesCtrl');
let firmsCtrl = require('./controllers/firmsCtrl');
let fileCtrl = require('./controllers/fileCtrl');
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
router.get('/api/dictionary/exhibitionCategory/all',directionCategoryCtrl.selectAll);
router.get('/api/dictionary/exhibitionCategory/:id/select',directionCategoryCtrl.selectByID);
router.post('/api/dictionary/exhibitionCategory/insert',upload_public.single('file'),directionCategoryCtrl.insert);
router.post('/api/dictionary/exhibitionCategory/:id/delete',directionCategoryCtrl.remove);
router.post('/api/dictionary/exhibitionCategory/:id/update',upload_public.single('file'),directionCategoryCtrl.update);
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
//access_types
router.get('/api/dictionary/access_types/all',accessTypesCtrl.selectAll);
router.get('/api/dictionary/access_types/:id/select',accessTypesCtrl.selectByID);
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
router.get('/api/dictionary/firms/:id/select',firmsCtrl.selectByID);
router.post('/api/dictionary/firms/insert',firmsCtrl.insert);
router.post('/api/dictionary/firms/:id/delete',firmsCtrl.remove);
router.post('/api/dictionary/firms/:id/update',firmsCtrl.update);
//--------------------------------------------------------------------------------------------------------------------
// tags
router.get('/api/dictionary/tags/all/:id',tagsCtrl.selectAll);
router.post('/api/dictionary/tags/insert',tagsCtrl.insert);
router.post('/api/dictionary/tags/:id/delete',tagsCtrl.remove);
//--------------------------------------------------------------------------------------------------------------------
// files
router.get('/api/dictionary/file/namesByIds',fileCtrl.namesByIds);
router.get('/api/dictionary/file/:id/get',fileCtrl.getByID);
router.post('/api/dictionary/file/insert',fileCtrl.insert);
router.post('/api/dictionary/file/:id/delete',fileCtrl.remove);

//--------------------------------------------------------------------------------------------------------------------



// test deploy
module.exports = router;