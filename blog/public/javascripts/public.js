$(function () {
    var userId = getUrlParameter("userid");
    var usernameA = getUrlParameter("username");
    var username = decodeURI(usernameA);
    if(userId != ""){
        $(".lo-re").removeClass("show").addClass("hide");
        $(".user").removeClass("hide").addClass("show");
    }
    $(".user").children("span").html(username);
    $('.user').mouseenter(function () {
        $('.operating').fadeIn();
    });
    $('.user').mouseleave(function () {
        $('.operating').fadeOut();
    });
    $(".writeblog").click(function () {
        window.location.href = '/articleManagement?userid=' + userId + '&username=' + username;
    });
    $(".personal-center").click(function () {
        window.location.href = '/personalCenter?userid=' + userId + '&username=' + username;
    });
    $(".myblog").click(function () {
       window.location.href = '/articleDetail?userid='+userId+'&username='+username;
    });
    $(".logo").click(function () {
        window.location.href = '/?userid=' + userId + '&username=' + username;
    });
    $(".d-source").click(function () {
        window.location.href = '/sourceBaseCamp?userid='+userId+'&username='+username;
    });
})


function getUrlParameter(value) {
    var arr = window.location.search.split("?")[1];
    if(arr){
        var paraArr = arr.split("&");
        for (var i = 0; i < paraArr.length; i++) {
            if (value == paraArr[i].split("=")[0]) {
                return paraArr[i].split("=")[1];
            }
        }
    }
    else{
        return "";
    }
}