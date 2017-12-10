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

        $scope.model = new go.GraphLinksModel(
        [
          { key: 1, name: "Alpha", color: "lightblue" },
          { key: 2, name: "Beta", color: "orange" },
          { key: 3, name: "Gamma", color: "lightgreen" },
          { key: 4, name: "Delta", color: "pink" }
        ],
        [
          { from: 1, to: 2 },
          { from: 1, to: 3 },
          { from: 2, to: 2 },
          { from: 3, to: 4 },
          { from: 4, to: 1 }
        ]);
        $scope.model.selectedNodeData = null;

        activate();

        function activate()
        {
            DataService.search($scope.params).then(function (response) {
                $scope.rel = response.Value;
            });
        }
    }
})();
