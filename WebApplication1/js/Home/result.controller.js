(function () {
    'use strict';

    angular
        .module('app')
        .controller('ResultController', ResultController);

    ResultController.$inject = ['$location','$scope','DataService','$window']; 

    function ResultController($location,$scope,DataService,$window) {
        
        $scope.title = 'Results';



        activate();

        function activate() { }
    }
})();
