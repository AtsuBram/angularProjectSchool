app.factory('ReviewFactory', function(){

    //{"plaatser":"Normal", "bericht": "bericht", "Sterren": 1, "tostie": "Tropical"]}

    //Get data from local storage if empty fills it and than returns it
    function getAllReviewsForTostie(tostieName){
        var localReview = JSON.parse(localStorage.getItem("reviews"));
        var returnReviews = {};
        //Check if local ingredients existed
        if(localReview != null) {
            localReview.forEach(function (e, i) {
                if (e.tostie == tostieName) {
                    returnReviews.push = localReview[i];
                }
            });
        }
        return returnReviews;
    }

    //Saves ingredient tot the local storage
    function saveReview(newReview){
        var localReview = JSON.parse(localStorage.getItem("reviews"));
        if(localReview == null){
            localReview = [];
        }
        localReview.push({
            "plaatser": newReview.plaatser,
            "bericht": newReview.bericht,
            "sterren": newReview.sterren,
            "tostie": newReview.tostie
        });
        localStorage.setItem("reviews", JSON.stringify(localReview));
        return getAllReviewsForTostie(newReview.tostie)
    }

    return {
        getAllReviewsForTostie: getAllReviewsForTostie,
        saveReview: saveReview
    };
});