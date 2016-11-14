'use strict';

let models = require('./models/models');

module.exports = function (io) {
    io.on('connection', function(client) {
        console.log('Client connected...');

        client.on('country', function() {
            models.Country.findAll()
                .then((data)=>{
                    client.emit('country',data);
                })
        });

        client.on('oblast', function() {
            models.Oblast.findAll()
                .then((data)=>{
                    client.emit('oblast',data);
                })
        });

        client.on('city', function() {
            models.City.findAll()
                .then((data)=>{
                    client.emit('city',data);
                })
        });


    });
};










