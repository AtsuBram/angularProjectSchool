describe("IngredientFactory", function () {
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

        it("should get All Ingredients", function(){
            var factory = $injector.get('IngredientFactory');
            $localStorage.setItem('ingredients', JSON.stringify({"name":"ham", "description":"Ham is meat from a pork.", "category": "meat" }));
            var returnData = factory.getAllIngredients();
            expect(returnData).toEqual({"name":"ham", "description":"Ham is meat from a pork.", "category": "meat" });
        });

    it("should delete 1 one Ingredient", function(){
        $localStorage.setItem('ingredients', JSON.stringify([{"name":"ham", "description":"Ham is meat from a pork.", "category": "meat" }, {"name":"hamS", "description":"Ham is meat from a pork.", "category": "meat" }]));
        var factory = $injector.get('IngredientFactory');
        factory.deleteIngredient('ham');
        var returnData = factory.getAllIngredients();
        expect(returnData.length == 1);
    });

    it("should update the Ingredients", function(){
        $localStorage.setItem('ingredients', JSON.stringify([{"name":"ham", "description":"Ham is meat from a pork.", "category": "meat" }, {"name":"hamS", "description":"Ham is meat from a pork.", "category": "meat" }]));
        var factory = $injector.get('IngredientFactory');
        var data = JSON.parse(localStorage.getItem("ingredients"));
        data.push({"name":"ham4", "description":"asHam is meat from a pork.", "category": "meatt" });
        factory.updateIngredient(data);
        var returnData = factory.getAllIngredients();
        expect(returnData).toEqual(data);
    });

    it("should save the Ingredients", function(){
        $localStorage.setItem('ingredients', JSON.stringify([{"name":"ham", "description":"Ham is meat from a pork.", "category": "meat" }, {"name":"hamS", "description":"Ham is meat from a pork.", "category": "meat" }]));
        var factory = $injector.get('IngredientFactory');
        factory.saveIngredient({"name":"ham4", "description":"asHam is meat from a pork.", "category": "meatt" });
        var returnData = factory.getAllIngredients();
        expect(returnData[2]).toEqual({"name":"ham4", "description":"asHam is meat from a pork.", "category": "meatt"});
    });



});