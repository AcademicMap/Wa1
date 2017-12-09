(function () {
    'use strict';

    angular
        .module('app')
        .controller('IndexController', IndexController);

    IndexController.$inject = ['$location','$scope','DataService','$window']; 

    function IndexController($location,$scope, DataService, $window) {
        /* jshint validthis:true */
        $scope.title = 'controller';

        $scope.name = "";

        $scope.isResult = true;

        $scope.search = function(input){
            DataService.search(input).then(function (response) {
                console.log(response);
                $scope.isResult = response;
                if ($scope.isResult == true) {
                    $scope.toGraph();
                }
            })

            

        }


        $scope.toGraph = function () {
            $window.location.href = "http://" + $window.location.host + "/Home/Result";
        }

        activate();

        function activate() { }
    }
})();
