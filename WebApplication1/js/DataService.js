(function () {
    'use strict';

    angular
        .module('app')
        .factory('DataService', DataService);

    DataService.$inject = ['$http'];

    function DataService($http) {


        var sendSearch = function (input)
        {
            var formData = new FormData();
            console.log('Hello!');
            formData.append('postData', JSON.stringify(input));

            return $http({
                method: 'POST',
                url: '/DataHandler.ashx?op=search',
                data: formData,
                //transformRequest: angular.identity,
                headers: {
                    'Content-Type': undefined
                }


            }).then(function (response) {
                console.log('Search successful!');
            }, function (response) {
                console.log("Search failed!");
            });
        }
        return {
            search: function (input) {
                return sendSearch(input);
            }
        };

        
    }

})();