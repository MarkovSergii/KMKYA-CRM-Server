
const express = require('express')
const init = require('./initialization')
const address = require('./list/address')
global.newDatabase = require('../../models/models')
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

server.listen(2526,function(){
    console.log('Socket server started at '+ 2526);
});

let currentDirection;
let currentMigration;
let currentClintDB;
let currentDopDB;
let tables;
let models;

let directionList = [
    {
        name:'FASHION',
        id:'fashion'
    },
    {
        name:'BUILD',
        id:'build'
    },
    {
        name:'MEBEL',
        id:'mebel'
    },
    {
        name:'AGRO',
        id:'agro'
    },
    {
        name:'JEWEL',
        id:'jewel'
    },
    {
        name:'REST',
        id:'rest'
    },
    {
        name:'PACK_PTM',
        id:'pack_ptm'
    }
];

let migrationList = [
    {
        name:'Адрес',
        link:'address'
    },
    {
        name:'Фирмы',
        link:'firms'
    }
];


let clearConnection = ()=>{
    currentDirection = '';
    currentMigration = '';
};



io.on('connection', function(socket){
   console.log('some connected');
   clearConnection();


   socket.on('getDirectionList',()=>socket.emit('getDirectionList',directionList));
    
   socket.on('getMigrationList',()=>socket.emit('getMigrationList',migrationList));

   socket.on('setDirection',(dirrection)=>{
       currentDirection = dirrection.id;
       let data =  init.connection(dirrection.id);
       currentClintDB = data.clientDB;
       currentDopDB = data.dopDB;
       socket.emit('setDirection')
   });

   socket.on('setMigration',(migration)=>{
       console.log('migration',migration)
       currentMigration = migration;
       let data = init.tables(currentClintDB,currentDopDB);
       tables = data.tables;
       models = data.models;
       socket.emit('setMigration')

       require('./list/'+currentMigration)({tables,models,socket})
       
   });

});


app.use(express.static(__dirname+'/public'));

app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/public/index.html')
});

app.listen(2525,()=>{
    console.log ('Migration started at 2525');
})


