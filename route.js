/**
 * Created by user on 23.07.2016.
 */
'use strict';

let express = require('express');
let router = express.Router();
let loginCtrl = require('./controllers/loginCtrl');
let dictionaryCtrl = require('./controllers/dictionaryCtrl');


router.post('/api/login',loginCtrl.login);
router.post('/api/token',loginCtrl.sendUserByToken);

router.use(loginCtrl.checkToken);

// to this area have access only token auth users
router.get('/api/dictionary/country',dictionaryCtrl.CountryGet);



module.exports = router;