/**
 * Created by user on 23.07.2016.
 */
'use strict';

let express = require('express');
let router = express.Router();
let multer  = require('multer');

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '/public/filestore/')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname + '-' + Date.now())
    }
});


var upload = multer({ storage: storage });

let loginCtrl = require('./controllers/loginCtrl');
let directionCategoryCtrl = require('./controllers/directionCategoryCtrl');
let dictionaryCtrl = require('./controllers/dictionaryCtrl');


router.post('/api/login',loginCtrl.login);
router.post('/api/token',loginCtrl.sendUserByToken);

router.use(loginCtrl.checkToken);

// to this area have access only token auth users
//--------------------------------------------------------------------------------------------------------------------
//directionCategory
router.get('/api/dictionary/exhibitionCategory/all',directionCategoryCtrl.selectAll);
router.get('/api/dictionary/exhibitionCategory/:id/select',directionCategoryCtrl.selectBy);
router.post('/api/dictionary/exhibitionCategory/insert',upload.single('logo'),directionCategoryCtrl.insert);
router.post('/api/dictionary/exhibitionCategory/:id/delete',directionCategoryCtrl.delete);
router.post('/api/dictionary/exhibitionCategory/:id/update',upload.single('logo'),directionCategoryCtrl.update);
//--------------------------------------------------------------------------------------------------------------------


module.exports = router;