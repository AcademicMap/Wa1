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

            return $http.get('/DataHandler.ashx?opr=getpaperlist').then(function (response) {
                
                return response.data;
            }, function (response) {
                console.log('Paper list failed!');
            })
        }

        var checkLogin = function (obj) {
            console.log(obj);
            console.log('Log Service!');
            var response = $http({
                method: 'POST',
                url: '/Admin/Users/Login/User',
                data: JSON.stringify(obj),
                //transformRequest: angular.identity,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            return response;
        }

        return {
            search: function (input) {
                return sendSearch(input);
            },
            getPapers: function () {
                return getPaperList();
            },

            login: function (obj) {
                return checkLogin(obj);
            }
        };

        
    }
    

})();