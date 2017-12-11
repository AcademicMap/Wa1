(function () {
    'use strict';

    angular
        .module('app')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['$scope', 'DataService', '$window', '$location'];

    function LoginController($scope, DataService, $window, $location) {
        $scope.User = {};
        $scope.checkLogin = function (obj) {
            console.log('Begin!');
            DataService.login(obj).then(function (response) {
                console.log('Almost there!');
                if (response.data != "-1") {

                    $window.location.href = "http://" + $window.location.host + "/Admin/AcademicPapers/Index";
                }
                else {

                    console.log("Login failed!");
                }

            })
        }


    }
})();