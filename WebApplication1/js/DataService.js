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

        var getPaperList = function () {

            return $http.get('/DataHandler.ashx?opr=GetPaperList').then(function (response) {
                return response.data;
            }, function (response) {
                console.log('Paper list failed!');
            })
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