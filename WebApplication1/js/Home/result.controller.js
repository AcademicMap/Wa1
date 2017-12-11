(function () {
    'use strict';

    angular
        .module('app')
        .controller('ResultController', ResultController);

    ResultController.$inject = ['$location','$scope','DataService','$window']; 

    function ResultController($location,$scope,DataService,$window) {
        
        $scope.title = 'Results';
        $scope.params = location.pathname.split("/").pop();
        $scope.rel = {};

        $scope.getResults = function (params) {

        }

        

        activate();

        function activate()
        {
            DataService.search($scope.params).then(function (response) {
                $scope.rel = response.Value;
            });
        }
    }
})();
