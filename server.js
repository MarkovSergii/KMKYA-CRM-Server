/**
 * Created by user on 23.07.2016.
 */
"use strict";

global.debug = require('debug');
require('./env');
require('./listeners');

let app = require('./app');

app.listen(process.env.port, () => {
    console.log('Server started at '+process.env.port)
});