describe("TostieFactory", function () {
    var $injector, $store, $localStorage;
    beforeEach(function(){
        angular.module('tostie-library')
    });

    beforeEach(inject(function () {
        $injector = angular.injector(['tostie-library']);
        $store = {};
        $localStorage = window.localStorage;
        spyOn($localStorage, 'getItem').and.callFake(function (key) {
            return $store[key];
        });
        spyOn($localStorage, 'setItem').and.callFake(function (key, value) {
            return $store[key] = value + '';
        });
        spyOn($localStorage, 'clear').and.callFake(function () {
            $store = {};
        });
    }));

    it("should get All Tostie", function(){
        var factory = $injector.get('TostieFactory');
        $localStorage.setItem('tosties', JSON.stringify({"name":"Normal", "ingredients": ["Ham", "Goudse Cheese", "White bread"], "sauce": ["Ketchup"], "season": ["winter", "summer"]}));
        var returnData = factory.getAllTosties();
        expect(returnData).toEqual({"name":"Normal", "ingredients": ["Ham", "Goudse Cheese", "White bread"], "sauce": ["Ketchup"], "season": ["winter", "summer"]});
    });

    it("should delete 1 one Tostie", function(){
        $localStorage.setItem('tosties', JSON.stringify([{"name":"Normal", "ingredients": ["Ham", "Goudse Cheese", "White bread"], "sauce": ["Ketchup"], "season": ["winter", "summer"]}, {"name":"Tropical", "ingredients": ["Ham", "Goudse Cheese", "White bread"], "sauce": ["Ketchup"], "season": ["winter", "summer"]}]));
        var factory = $injector.get('TostieFactory');
        factory.deleteTostie('Normal');
        var returnData = factory.getAllTosties();
        expect(returnData.length == 1);
    });

    it("should update the Tostie", function(){
        $localStorage.setItem('tosties', JSON.stringify([{"name":"Normal", "ingredients": ["Ham", "Goudse Cheese", "White bread"], "sauce": ["Ketchup"], "season": ["winter", "summer"]}, {"name":"Tropical", "ingredients": ["Ham", "Goudse Cheese", "White bread"], "sauce": ["Ketchup"], "season": ["winter", "summer"]}]));
        var factory = $injector.get('TostieFactory');
        var data = JSON.parse(localStorage.getItem("tosties"));
        data.push({"name":"Super", "ingredients": ["Ham", "White bread"], "sauce": ["Ketchup"], "season": ["winter"]});
        factory.updateTostie(data);
        var returnData = factory.getAllTosties();
        expect(returnData).toEqual(data);
    });

    it("should save the Tostie", function(){
        $localStorage.setItem('tosties', JSON.stringify([{"name":"Normal", "ingredients": ["Ham", "Goudse Cheese", "White bread"], "sauce": ["Ketchup"], "season": ["winter", "summer"]}, {"name":"Tropical", "ingredients": ["Ham", "Goudse Cheese", "White bread"], "sauce": ["Ketchup"], "season": ["winter", "summer"]}]));
        var factory = $injector.get('TostieFactory');
        factory.saveTostie({"name":"Super", "ingredients": ["Ham", "White bread"], "sauce": ["Ketchup"], "season": ["winter"]});
        var returnData = factory.getAllTosties();
        expect(returnData[2]).toEqual({"name":"Super", "ingredients": ["Ham", "White bread"], "sauce": ["Ketchup"], "season": ["winter"], "reviews": []});
    });



});