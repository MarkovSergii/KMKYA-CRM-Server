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
    $scope.hh = 2;
}



migrate.controller('mainCtrl',mainCtrl);