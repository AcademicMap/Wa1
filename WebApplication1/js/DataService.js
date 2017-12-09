(function () {
    'use strict';

    angular
        .module('app')
        .factory('DataService', DataService);

    DataService.$inject = ['$http'];

    function DataService($http) {

        var searchResults = {};

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
                console.log(response)
                if (response.data == "Err")
                {
                    return false;
                }
                return true;
            }, function (response) {
                console.log("Search failed!");
                return false;
            });
        }


        return {
            search: function (input) {
                return sendSearch(input);
            }
        };

        
    }

})();