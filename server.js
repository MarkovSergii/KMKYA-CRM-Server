/**
 * Created by user on 23.07.2016.
 */
"use strict";

let app = require('./app');


app.listen(process.env.PORT || 3000, process.env.IP || 'localhost',function(){
    console.log('Server started at port 3000');
});