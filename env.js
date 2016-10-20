/**
 * Created by user on 20.10.2016.
 */
const R = require('ramda');
const config = require('./config');

const initEnvVariable = (_default,k)=>
    process.env[k] = R.defaultTo(_default, process.env[k]);

R.mapObjIndexed(initEnvVariable, {
    port:config.port,
    socket_port: config.socket_port
});

process.env.DEBUG = [
    'event*',
    'socket.io:socket got packet*',
    'socket.io:socket emitting event*',
    'app*',
    process.env.DEBUG
].join(',');

console.log(process.env);