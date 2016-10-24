'use strict';

module.exports = function (io) {
    io.on('connection', function(client) {
        console.log('Client connected...');

        console.log(client.id);
        client.on('join', function(data) {
            console.log(data);
            client.emit('join',data);
        });
    });
};










