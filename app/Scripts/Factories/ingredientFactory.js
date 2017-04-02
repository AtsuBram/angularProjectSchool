app.factory('IngredientFactory', function(){
    //Get data from local storage if empty fills it and than returns it
    function getAllIngredients(){
        var localIngredients = JSON.parse(localStorage.getItem("ingredients"));
        //Check if local ingredients existed
        if(localIngredients == undefined || localIngredients.length <= 0){
            localIngredients = [
                {name:"ham", description:"Ham is meat from a pork.", category: "meat" },
                {name:"Goudse cheese", description:"Cheese is made from milk from gouda.", category: "cheese" },
                {name:"Sesame white bread", description:"Normal white bread with sesame seads", category: "bread" },
                {name:"White bread", description:"Normal white made sandwitch bread.", category: "bread" },
                {name: "Pineapple pieces", description: "To add a troppicale flavor", category: "flavoring"}
            ];
            localStorage.setItem("ingredients", JSON.stringify(localIngredients));
        }
        return localIngredients;
    }

    //Delete an ingredient from the localstorage
    function deleteIngredient(ingredientName){
        var deleteIndex = -1;
        var localIngredients = JSON.parse(localStorage.getItem("ingredients"));
        localIngredients.forEach(function(e, i) {
            if(e.name == ingredientName) {
                deleteIndex = i;
            }
        });
        localIngredients.splice(deleteIndex, 1);
        localStorage.setItem("ingredients", JSON.stringify(localIngredients));
    }

    //Saves ingredient tot the local storage
    function saveIngredient(newIngredient){
        var localIngredients = JSON.parse(localStorage.getItem("ingredients"));
        localIngredients.push({
            "name": newIngredient.name,
            "description": newIngredient.description,
            "category": newIngredient.category
        });
        localStorage.setItem("ingredients", JSON.stringify(localIngredients));
    }

    function updateIngredientList(ingredients){
        localStorage.setItem("ingredients", JSON.stringify(ingredients));
    }
    return {
        getAllIngredients: getAllIngredients,
        deleteIngredient: deleteIngredient,
        saveIngredient: saveIngredient,
        updateIngredient: updateIngredientList
    };
});