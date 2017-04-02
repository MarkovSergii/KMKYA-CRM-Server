/**
 * Created by user on 10.03.2017.
 */
var migrate = angular.module('migrate',['btford.socket-io'])

migrate.factory('mSocket', function (socketFactory) {
    var myIoSocket = io.connect('http://localhost:2526');

    mySocket = socketFactory({
        ioSocket: myIoSocket
    });

    return mySocket;
});





let mainCtrl = ($scope,mSocket)=>{



    mSocket.on('connect',()=>{
       console.log('socket connected')
        mSocket.emit('getDirectionList')
        mSocket.emit('getMigrationList')
    });

    mSocket.on('getDirectionList',(data)=>{
        $scope.directions = data;
        $scope.$apply();
    });

    mSocket.on('getMigrationList',(data)=>{
        $scope.migrations = data;
        $scope.$apply();
    });


    $scope.selectMigration = (type)=>{
            $scope.startMigration = true;
            $scope.migrationType = type;
            mSocket.emit('setMigration',type)
    }

    $scope.migrationStat = 'Запись 12 из 3045';

    $scope.connect = ()=>{
        mSocket.emit('setDirection',$scope.selectedDir)
    }

    $scope.testGO = ()=>{
        mSocket.emit('go1')
    }

    
    
    mSocket.on('setDirection',()=>{
        $scope.connected = true
        $scope.$apply();
    });

    mSocket.on('setMigration',()=>{
        console.log('ready for start')
    });

    mSocket.on('go1',(data)=>{
        console.log(data)
    });




}



migrate.controller('mainCtrl',mainCtrl);