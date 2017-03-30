app.factory('sauceFactory', function(){

    function getAllSauce(){
        var localSauce = JSON.parse(localStorage.getItem("sauce"));
        //Check if local ingredients existed
        if(localSauce == undefined || localSauce.length < 0){
            localSauce = [
                {name:"Ketchup", description:"A sauce from tomato's", place: "Outside bread after baking"},
                {name:"pesto", description:"A sauce from basil and parmesan", place: "On bread"},
                {name:"Butter", description:"To form a brown crust", place: "Outside of bread before baking"}
            ];
            localStorage.setItem("sauce", JSON.stringify(localSauce));
        }
        return localSauce;
    }

    function deleteSauce(sauceName){
        var deleteIndex = -1;
        var localSauce = JSON.parse(localStorage.getItem("sauce"));
        localSauce.forEach(function(e, i) {
            if(e.name === sauceName) {
                deleteIndex = i;
            }
        });
        localSauce.splice(deleteIndex, 1);
        localStorage.setItem("sauce", JSON.stringify(localSauce));
    }

    function saveSauce(newSauce){
        var localSauce = JSON.parse(localStorage.getItem("sauce"));
        localSauce.push({
            name: newSauce.name,
            description: newSauce.description,
            place: newSauce.place
        });
        localStorage.setItem("sauce", JSON.stringify(localSauce));
    }

    function updateSauce(sauce){
        localStorage.setItem("sauce", JSON.stringify(sauce));
    }

    return {
        getAllSauce: getAllSauce,
        deleteSauce: deleteSauce,
        saveSauce: saveSauce,
        updateSauce: updateSauce
    };
});