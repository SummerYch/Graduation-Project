$(function () {
    var userId = getUrlParameter("userid");
    var username = getUrlParameter("username");
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
    $(".logo").click(function () {
        window.location.href = '/?userid=' + userId + '&username=' + username;
    })
})


function getUrlParameter(value) {
    var arr = window.location.search.split("?")[1];
    var paraArr = arr.split("&");
    for (var i = 0; i < paraArr.length; i++) {
        if (value == paraArr[i].split("=")[0]) {
            return paraArr[i].split("=")[1];
        }
    }
}