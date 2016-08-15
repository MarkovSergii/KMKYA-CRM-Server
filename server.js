/**
 * Created by user on 23.07.2016.
 */
"use strict";

let app = require('./app');

app.listen(3000, '93.171.158.114',function(){
    console.log('Server started on 93.171.158.114 at port 3000');
});
app.listen(3000, 'localhost',function(){
    console.log('Server started on localhost at port 3000');
});
