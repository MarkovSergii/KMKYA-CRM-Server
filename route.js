/**
 * Created by user on 23.07.2016.
 */
'use strict';

let express = require('express');
let router = express.Router();
let multer  = require('multer');

let storage_public = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '/filestore/public')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname + '-' + Date.now())
    }
});

let storage_auth = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '/filestore/auth/')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname + '-' + Date.now())
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
router.post('/api/dictionary/exhibitionCategory/insert',upload_public.single('logo'),directionCategoryCtrl.insertCategory);
router.post('/api/dictionary/exhibitionCategory/:id/delete',directionCategoryCtrl.deleteCategory);
router.post('/api/dictionary/exhibitionCategory/:id/update',upload_public.single('logo'),directionCategoryCtrl.updateCategory);
//--------------------------------------------------------------------------------------------------------------------


module.exports = router;