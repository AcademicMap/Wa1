(function () {
    'use strict';

    angular
        .module('app')
        .factory('DataService', DataService);

    DataService.$inject = ['$http'];

    function DataService($http) {
        
        var result = {};

        result.list = [];


        result.add = function (input) {
            result.list.push({ data: input });
        }
        
        var func = function()
        {
            console.log(result);
            return result;
        }
        

        var sendSearch = function (input)
        {
            var formData = new FormData();
            console.log(input);
            formData.append('postData', JSON.stringify(input));

            return $http({
                method: 'GET',
                url: '/DataHandler.ashx?opr=search&Name=' + input,
                data: formData,
                //transformRequest: angular.identity,
                headers: {
                    'Content-Type': undefined
                }


            }).then(function (response) {
                console.log('Search successful!');
                console.log(response);
                return response.data;
            }, function (response) {
                console.log("Search failed!");
            });
        }


        return {
            search: function (input) {
                return sendSearch(input);
            },
            res: function () {
                return func();
            },
        };

        
    }
    

})();