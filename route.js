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


router.post('/api/login',loginCtrl.login);
router.post('/api/token',loginCtrl.sendUserByToken);

router.use(loginCtrl.checkToken);

// to this area have access only token auth users 
//--------------------------------------------------------------------------------------------------------------------
//directionCategory
router.get('/api/dictionary/exhibitionCategory/all',directionCategoryCtrl.selectAllCategories);
router.get('/api/dictionary/exhibitionCategory/:id/select',directionCategoryCtrl.selectCategoryByID);
router.post('/api/dictionary/exhibitionCategory/insert',upload_public.single('file'),directionCategoryCtrl.insertCategory);
router.post('/api/dictionary/exhibitionCategory/:id/delete',directionCategoryCtrl.deleteCategory);
router.post('/api/dictionary/exhibitionCategory/:id/update',upload_public.single('file'),directionCategoryCtrl.updateCategory);
//--------------------------------------------------------------------------------------------------------------------


module.exports = router;