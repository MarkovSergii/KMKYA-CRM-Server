/**
 * Created by user on 23.07.2016.
 */
"use strict";

let app = require('./app');


app.listen(process.env.port || 3000, () => {
    console.log('Server started at '+process.env.port || 3000)
});