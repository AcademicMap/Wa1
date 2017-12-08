(function () {
    'use strict';

    angular
        .module('app')
        .controller('IndexController', IndexController);

    IndexController.$inject = ['$location','$scope','DataService']; 

    function IndexController($location,$scope, DataService) {
        /* jshint validthis:true */
        $scope.title = 'controller';

        $scope.name = "";

        $scope.search = function(input){
            DataService.search(input);
        }

        activate();

        function activate() { }
    }
})();
