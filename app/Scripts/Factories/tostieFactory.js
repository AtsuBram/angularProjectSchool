app.factory('TostieFactory', function(){
    //Get data from local storage if empty fills it and than returns it
    function getAllTosties(){
        var localTosties = JSON.parse(localStorage.getItem("tosties"));
        //Check if local ingredients existed
        if(localTosties == undefined || localTosties.length <= 0){
            localTosties = [
                {"name":"Normal", "ingredients": ["Ham", "Goudse Cheese", "White bread"], "sauce": ["Ketchup"], "season": ["winter", "summer"], "reviews":[]},
                {"name":"Tropical", "ingredients": ["Ham", "Goudse Cheese", "Sesame white bread", "Pineapple pieces"], "sauce": ["Ketchup", "butter"], "season": ['summer'], "reviews":[]},
                {"name":"Oriental", "ingredients": ["Ham", "Goudse Cheese", "White bread"], "sauce": ["pesto"], "season": ["spring"], "reviews":[]}
            ];
            localStorage.setItem("tosties", JSON.stringify(localTosties));
        }
        return localTosties;
    }

    //Delete an tostie from the localstorage
    function deleteTostie(tostieName){
        var deleteIndex = -1;
        var localTosties = JSON.parse(localStorage.getItem("tosties"));
        localTosties.forEach(function(e, i) {
            if(e.name == tostieName) {
                deleteIndex = i;
            }
        });
        localTosties.splice(deleteIndex, 1);
        localStorage.setItem("tosties", JSON.stringify(localTosties));
    }

    //Saves ingredient tot the local storage
    function saveTostie(newTostie){
        var localTostie = JSON.parse(localStorage.getItem("tosties"));
        localTostie.push({
            "name": newTostie.name,
            "ingredients": newTostie.ingredients,
            "sauce": newTostie.sauce,
            "season": newTostie.season,
            "reviews":[]
        });
        localStorage.setItem("tosties", JSON.stringify(localTostie));
    }

    function updateTostie(tosties){
        localStorage.setItem("tosties", JSON.stringify(tosties));
    }
    return {
        getAllTosties: getAllTosties,
        deleteTostie: deleteTostie,
        saveTostie: saveTostie,
        updateTostie: updateTostie
    };
});