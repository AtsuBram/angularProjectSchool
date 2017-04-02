app.filter('capitalize', function () {
    return function (input) {
        var data = input.split(" ");
        var returnData;
        for(var i = 0; i<data.lengthl; i++){
            data[i].charAt(0).toUpperCase() + data[i].slice(1);
            returnData += returnData;
        }
        return "test";
    };
});