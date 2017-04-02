app.controller('SauceController', function($scope, sauceFactory){
    $scope.saucePlace = ["On bread", "Outside bread before baking", "Outside bread after baking"];
    $scope.updateSauceElement = {id:"", description:"", place:""};

    $scope.sauce = sauceFactory.getAllSauce();

    //saves a new sauce
    $scope.saveSauce = function(){
        sauceFactory.saveSauce($scope.newSauce);
        $scope.newSauce = {};
        $scope.sauce = sauceFactory.getAllSauce();
        $("#add-sauce").modal('hide');
    };

    //Delete an sauce
    $scope.deleteSauce = function(sauceName){
        sauceFactory.deleteSauce(sauceName);
        $scope.sauce = sauceFactory.getAllSauce();
    };

    //Set sauceUpdateItem
    $scope.updateSauceInit = function(sauce){
        $scope.updateSauceElement = sauce;
        console.log(sauce);
        //Get the index of the element in the array
        var updateIndex = -1;
        $scope.sauce.forEach(function(e, i) {
            if(e.name === sauce.name) {
                updateIndex = i;
            }
        });
        $scope.updateSauceElement.id = updateIndex;
        $("#update-sauce").modal('show');
    };

    //update Ingredient
    $scope.updateIngredient = function(){
        var sauce = {};
        sauce.name = $scope.updateSauceElement.name;
        sauce.description = $scope.updateSauceElement.description;
        sauce.place = $scope.updateSauceElement.category;

        sauceFactory.updateSauce($scope.sauce);
        $("#update-sauce").modal('hide');
    };
});