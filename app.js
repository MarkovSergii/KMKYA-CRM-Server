/**
 * Created by user on 23.07.2016.
 */
'use strict';

require('pmx').init({
    http : true
});

let express = require('express');
let app = express();

let bodyParser = require('body-parser');
let CookieParser = require('cookie-parser');
let cors = require('cors');
let helmet = require('helmet');


let route = require('./route');
let io = require('socket.io');

let server = require('http').Server(app);
    io = io.listen(server);

require('./socket')(io);

server.listen(process.env.socket_port || 3001,function(){
    console.log('Socket server started at '+process.env.socket_port || 3001);
});

app.use(helmet());
app.disable('x-powered-by');
app.use(cors());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
app.use(CookieParser());

app.use('/filestore/public',express.static(__dirname + '/filestore/public'));
app.use(route);
app.use('/filestore/auth',express.static(__dirname + '/filestore/auth'));

module.exports = app;
