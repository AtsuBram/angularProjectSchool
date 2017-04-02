app.controller('TostieController', function($scope, TostieFactory, IngredientFactory, sauceFactory, ReviewFactory){
    $scope.tostieSeason = [{name: 'spring', selected: false},{ name: 'summer', selected: false},{ name: 'autumn', selected: false },{name: 'winter', selected: false}];
    $scope.updateTostieElement = {id:"", name:"", description:"", category:""};
    $scope.ingredients = IngredientFactory.getAllIngredients();
    $scope.sauce = sauceFactory.getAllSauce();
    $scope.tosties = TostieFactory.getAllTosties();
    $scope.tostiePreview = "test";
    //saves a new tostie
    $scope.saveNewTostie = function(){
        $scope.newTostie.sauce = getSelectedItems($scope.sauce);
        $scope.newTostie.ingredients = getSelectedItems($scope.ingredients);
        $scope.newTostie.season = getSelectedItems($scope.tostieSeason);
       TostieFactory.saveTostie($scope.newTostie);
        $("#add-tostie").modal('hide');
        $scope.newTostie = {};
        $scope.tosties = TostieFactory.getAllTosties();
    };

    //Show tostieView
    $scope.tostieOverview = function (tosty) {
        $scope.tostiePreview = tosty;
        $scope.tostiePreview.reviews = ReviewFactory.getAllReviewsForTostie(tosty.name);
        console.log($scope.tostiePreview);
        $('#preview-tostie').modal('show');
    };

    //saveReviewForTostie
    $scope.saveTostieReview = function(name){
        var review = {
            "plaatser": $scope.newReview.name,
            "bericht": $scope.newReview.bericht,
            "sterren": $scope.newReview.sterren,
            "tostie": name
        };
        $scope.tostiePreview.reviews = ReviewFactory.saveReview(review);
        $scope.newReview = {};
    };

    //Delete an tostie
    $scope.deleteTostie = function(tostieName){
        TostieFactory.deleteTostie(tostieName);
        $scope.tosties = TostieFactory.getAllTosties();
    };

    //Set updateTostieElement
    $scope.updateTostieInit = function(tostie){
        setSelectedFalse($scope.ingredients);
        setSelectedFalse($scope.sauce);
        setSelectedFalse($scope.tostieSeason);
        $scope.updateTostieElement = tostie;

        //Get the index of the element in the array
        var updateIndex = -1;
        $scope.tosties.forEach(function(e, i) {
            if(e.name === tostie.name) {
                updateIndex = i;
            }
        });
        if(tostie.ingredients != null) {
            tostie.ingredients.forEach(function (e, i) {
                $scope.ingredients.forEach(function (j, k) {
                    if (tostie.ingredients[i] == j.name) {
                        j.selected = true;
                    }
                });
            });
        }
        if(tostie.season != null) {
            tostie.season.forEach(function (e, i) {
                $scope.tostieSeason.forEach(function (j, k) {
                    if (tostie.season[i] === j.name) {
                        j.selected = true;
                    }
                });
            });
        }
        if(tostie.sauce != null) {
            tostie.sauce.forEach(function (e, i) {
                $scope.sauce.forEach(function (j, k) {
                    if (tostie.sauce[i] === j.name) {
                        j.selected = true;
                    }
                });
            });
        }
        $("#update-tostie").modal('show');
    };

    //update tostie
    $scope.updateTostie = function(){
        $scope.updateTostieElement.sauce = getSelectedItems($scope.sauce);
        $scope.updateTostieElement.ingredients  = getSelectedItems($scope.ingredients);
        $scope.updateTostieElement.season = getSelectedItems($scope.tostieSeason);
        TostieFactory.updateTostie($scope.tosties);
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

    function setSelectedFalse(array){
        array.forEach(function(item, index){
            item.select = false;
        });
    }

});