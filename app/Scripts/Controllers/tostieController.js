app.controller('TostieController', function($scope, TostieFactory, IngredientFactory, sauceFactory){
    $scope.tostieSeason = [{name: 'spring', selected: false},{ name: 'summer', selected: false},{ name: 'autumn', selected: false },{name: 'winter', selected: false}];
    $scope.updateTostieElement = {id:"", name:"", description:"", category:""};
    $scope.ingredients = IngredientFactory.getAllIngredients();
    $scope.sauce = sauceFactory.getAllSauce();
    $scope.tosties = TostieFactory.getAllTosties();

    //saves a new tostie
    $scope.saveNewTostie = function(){
        console.log(getSelectedItems($scope.sauce));
       /* TostieFactory.saveNewTostie($scope.newTostie);
        $("#add-tostie").modal('hide');
        $scope.newTostie = {};
        $scope.tosties = TostieFactory.getAllTosties();*/
    };

    //Delete an tostie
    $scope.deleteTostie = function(tostieName){
        TostieFactory.deleteTostie(tostieName);
        $scope.tosties = TostieFactory.getAllTosties();
    };

    //Set updateTostieElement
    $scope.updateTostieInit = function(tostie){
        $scope.updateTostieElement = tostie;

        //Get the index of the element in the array
        var updateIndex = -1;
        $scope.tosties.forEach(function(e, i) {
            if(e.name === tostie.name) {
                updateIndex = i;
            }
        });
        $scope.tosties = TostieFactory.getAllTosties();
        $("#update-tostie").modal('show');
    };

    //update tostie
    $scope.updateTostie = function(){
        var tostie = {};
        tostie.name = $scope.updateTostieElement.name;
        tostie.ingredients = $scope.updateTostieElement.ingredients;
        tostie.sauce = $scope.updateTostieElement.sauce;
        tostie.season = $scope.updateTostieElement.season;

        $scope.tosties = TostieFactory.getAllTosties();
        $("#update-tostie").modal('hide');
    };

    function getSelectedItems(item){
        var items = [];
        item.forEach(function(e, i){
            if(e.selected != undefined) {
                if (e.selected == true) {
                    items.push(e.name);
                }
            }
        });
        return items;
    }

});