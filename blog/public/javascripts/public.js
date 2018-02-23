$(function(){
    
})


function getUrlParameter(value){
    var arr = window.location.search.split("?")[1];
    var paraArr = arr.split("&");
    for(var i=0;i<paraArr.length;i++){
        if(value == paraArr[i].split("=")[0]){
            return paraArr[i].split("=")[1];
        }
    }
}