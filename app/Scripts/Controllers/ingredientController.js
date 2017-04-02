app.controller('IngredientController', function($scope, IngredientFactory){
    $scope.ingredientCategory = ["bread", "meat", "cheese", "flavoring"];
    $scope.updateIngredientElement = {id:"", name:"", description:"", category:""};

    $scope.ingredients = $.map(IngredientFactory.getAllIngredients(), function(el) { return el });

    //saves a new ingredient
    $scope.saveNewIngredient = function(){
        IngredientFactory.saveIngredient($scope.newIngredient);
        $("#add-ingredient").modal('hide');
        $scope.newIngredient = {};
        $scope.ingredients = IngredientFactory.getAllIngredients();
    };

    //Delete an ingredient
    $scope.deleteIngredient = function(ingredientName){
        IngredientFactory.deleteIngredient(ingredientName);
        $scope.ingredients = IngredientFactory.getAllIngredients();
    };

    //Set updateIngredientItem
    $scope.updateIngredientInit = function(ingredient){
        $scope.updateIngredientElement = ingredient;

        //Get the index of the element in the array
        var updateIndex = -1;
        $scope.ingredients.forEach(function(e, i) {
            if(e.name === ingredient.name) {
                updateIndex = i;
            }
        });
        $scope.updateIngredientElement.id = updateIndex;
        $("#update-ingredient").modal('show');
    };

    //update Ingredient
    $scope.updateIngredient = function(){
        var ingredient = {};
        ingredient.name = $scope.updateIngredientElement.name;
        ingredient.description = $scope.updateIngredientElement.description;
        ingredient.category = $scope.updateIngredientElement.category;

        IngredientFactory.updateIngredient($scope.ingredients);
        $("#update-ingredient").modal('hide');
    };

});