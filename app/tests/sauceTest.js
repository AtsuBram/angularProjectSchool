describe("SauceFactory", function () {
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

    it("should get All sauce", function(){
        var factory = $injector.get('sauceFactory');
        $localStorage.setItem('sauce', JSON.stringify({"name":"Ketchup", "description":"A sauce from tomato's", "place": "Outside bread after baking"}));
        var returnData = factory.getAllSauce();
        expect(returnData).toEqual({"name":"Ketchup", "description":"A sauce from tomato's", "place": "Outside bread after baking"});
    });

    it("should delete 1 one Sauce", function(){
        $localStorage.setItem('sauce', JSON.stringify([{"name":"Ketchup", "description":"A sauce from tomato's", "place": "Outside bread after baking"}, {"name":"KetchupTestDelete", "description":"A sauce from tomato's", "place": "Outside bread after baking"}]));
        var factory = $injector.get('sauceFactory');
        factory.deleteSauce('KetchupTestDelete');
        var returnData = factory.getAllSauce();
        expect(returnData.length == 1);
    });

    it("should update the Sauce", function(){
        $localStorage.setItem('sauce', JSON.stringify([{"name":"Ketchup", "description":"A sauce from tomato's", "place": "Outside bread after baking"}, {"name":"KetchupTestDelete", "description":"A sauce from tomato's", "place": "Outside bread after baking"}]));
        var factory = $injector.get('sauceFactory');
        var data = JSON.parse(localStorage.getItem("sauce"));
        data.push({"name":"Ketchup123", "description":"A sauce from tomato's", "place": "Outside bread after baking"});
        factory.updateSauce(data);
        var returnData = factory.getAllSauce();
        expect(returnData).toEqual(data);
    });

    it("should save the Sauce", function(){
        $localStorage.setItem('sauce', JSON.stringify([{"name":"Ketchup", "description":"A sauce from tomato's", "place": "Outside bread after baking"}, {"name":"KetchupTestDelete", "description":"A sauce from tomato's", "place": "Outside bread after baking"}]));
        var factory = $injector.get('sauceFactory');
        factory.saveSauce({"name":"Mostert", "description":"a sauce for some extra flavor", "place": "On top of"});
        var returnData = factory.getAllSauce();
        expect(returnData[2]).toEqual({"name":"Mostert", "description":"a sauce for some extra flavor", "place": "On top of"});
    });



});