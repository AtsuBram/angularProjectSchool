app.filter('replaceTest', function(){
    return function(input){
        var data = input.split(" ");
        var returnData = "";
        for(var i = 0; i<data.length; i++){
            returnData +=  data[i].charAt(0).toUpperCase() + data[i].slice(1);
            returnData  += " ";
        }
        return returnData;
    }
});