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
        $scope.plist = {};
        $scope.isResult = " ";

        $scope.search = function(input){
            DataService.search(input).then(function (response) {
                console.log(response);
                $scope.isResult = response;
                if ($scope.isResult !== "Err") {
                    $scope.toGraph(input);
                    
                }
            })

            

        }


        $scope.toGraph = function (input) {
            $window.location.href = "http://" + $window.location.host + "/Home/Result/" + input;
        }

        activate();

        function activate() {
            DataService.getPapers().then(function (response) {
                $scope.plist = response.Value;
            })
        }
    }
})();
