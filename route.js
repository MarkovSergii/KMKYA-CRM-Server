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

let loginCtrl = require('./controllers/loginCtrl');
let directionCategoryCtrl = require('./controllers/directionCategoryCtrl');
let seasonsCtrl = require('./controllers/seasonsCtrl');
let accessGroupsCtrl = require('./controllers/accessGroupsCtrl');
let accessTypesCtrl = require('./controllers/accessTypesCtrl');


router.post('/api/login',loginCtrl.login);
router.post('/api/token',loginCtrl.sendUserByToken);

router.use(loginCtrl.checkToken);

// to this area have access only token auth users 
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
//access_groups
router.get('/api/dictionary/access_groups/all',accessGroupsCtrl.selectAll);
router.get('/api/dictionary/access_groups/all_with_types',accessGroupsCtrl.selectAllWithTypes);
router.get('/api/dictionary/access_groups/:id/select',accessGroupsCtrl.selectByID);
router.post('/api/dictionary/access_groups/insert',accessGroupsCtrl.insert);
router.post('/api/dictionary/access_groups/:id/delete',accessGroupsCtrl.remove);
router.post('/api/dictionary/access_groups/:id/update',accessGroupsCtrl.update);
//--------------------------------------------------------------------------------------------------------------------
//access_types
router.get('/api/dictionary/access_types/all',accessTypesCtrl.selectAll);
router.get('/api/dictionary/access_types/:id/select',accessTypesCtrl.selectByID);
router.post('/api/dictionary/access_types/insert',accessTypesCtrl.insert);
router.post('/api/dictionary/access_types/:id/delete',accessTypesCtrl.remove);
router.post('/api/dictionary/access_types/:id/update',accessTypesCtrl.update);
//--------------------------------------------------------------------------------------------------------------------





module.exports = router;