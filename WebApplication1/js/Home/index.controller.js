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

        $scope.item = {};

        $scope.search = function(input){
            DataService.search(input).then(function (response) {
                console.log(response.Value);
                $scope.item = response.Value;
            })

        }

        activate();

        function activate() { }
    }
})();
