'use strict';

describe('Service: DataService', function () {

    // load the service's module
    beforeEach(module('app'));

    // instantiate service
    var DataService;
    var $httpBackend;

    beforeEach(inject(function (_$httpBackend_, _DataService_) {
        DataService = _DataService_;
        $httpBackend = _$httpBackend_;
    }));

    it('should GET requested paper from the server', function () {
        $httpBackend.expectGET('/DataHandler.ashx?opr=search&Name=Paper').respond(200, {"PaperId":0 ,"Name":"Paper", "Writer":"Ahmet Asd","link":"someurl","PublishDate":1304 });

        var paper = DataService.search("Paper");

        $httpBackend.flush();

        expect(paper).not.toBe(null);
    });


    it('should GET paper list from the server', function () {
        $httpBackend.expectGET('/DataHandler.ashx?opr=getpaperlist').respond(200, [{ "PaperId": 0, "Name": "Paper", "Writer": "Ahmet Asd", "link": "someurl", "PublishDate": 1304 }, { "PaperId": 1, "Name": "Aca", "Writer": "Ahmet Asd", "link": "someurl1", "PublishDate": 431 }, { "PaperId": 2, "Name": "Demic", "Writer": "Ahmet Asd", "link": "someurl1", "PublishDate": 431 }]);

        var list = DataService.getStatus();

        $httpBackend.flush();

        expect(list).not.toBe(null);
        expect(list.length).toBe(3);
    });


    it('should POST user information to the server', function () {
        var profile = {"username":"Ahmet" , "password":"123456"} ;

        $httpBackend.expectPOST('/Admin/Users/Login/User', profile).respond(303, '-1');

        DataService.checkLogin(profile);

        $httpBackend.flush();

    });

    afterEach(function () {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });
});