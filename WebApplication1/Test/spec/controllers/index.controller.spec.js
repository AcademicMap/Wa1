'use strict';

describe('Controller: IndexController', function () {

    //load module
    beforeEach(module('app'));

    var IndexCtrl, scope;
    var mockService;
    var q, deferred;
    var paperlist;

    //Mock service
    beforeEach(function () {

        paperlist = [{ "id": 0, "name": "Academic", "writer": "Asa" }, { "id": 1, "name": "Paper", "writer": "Sada" }];

        mockService = {
            search: function () {
                deferred = q.defer();
                return deferred.promise;
            },

            getPapers: function () {
                deferred = q.defer();
                return deferred.promise;
            }
        }
    });

    //Initalize the controller and mocks
    beforeEach(inject(function ($controller, $rootScope,$q) {
        q = $q;
        scope = $rootScope.$new();
        IndexCtrl = $controller('IndexController', {
            $scope: scope,
            DataService: mockService
        });

    }));

    it('should request the paper list when activate is called', function () {
        spyOn(mockService, 'getPapers').and.CallThrough();

        scope.activate();

        deferred.resolve(paperlist);
        scope.$root.$digest();

        expect(scope.plist).not.toBe(null);
    });

    it('should get requested paper when search is called', function () {
        spyOn(mockService, 'search').and.CallThrough();

        scope.search("Academic");

        deferred.resolve(paperlist[0]);
        scope.$root.$digest();

        expect(scope.isResult).toBe({ "id": 0, "name": "Academic", "writer": "Asa" });
    });

    it('should return error when requested paper does not exist', function () {
        spyOn(mockService, 'search').and.CallThrough();

        scope.search("Asd");

        deferred.resolve("Err");
        scope.$root.$digest();

        expect(scope.isResult).toBe("Err");
    });
})