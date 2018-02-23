$(function () {
    // 轮播图部分
    var carousel = $(".carousel").unslider({
        dots:true
    });
    var data = carousel.data('unslider');
    $('.unslider-arrow04').click(function() {
        var fn = this.className.split(' ')[1];
        data[fn]();
    });
    // 获取 url中参数
    var userId = getUrlParameter("userid");
    var username = getUrlParameter("username");
    if(userId){
        console.log(userId);
        console.log(username);
        $(".lo-re").removeClass("show").addClass("hide");
        $(".user").removeClass("hide").addClass("show");
        $(".user").children("span").html(username);
    }
    $(".personal-center").click(function(){
        window.location.href = '/personalCenter?userid='+userId+'&username='+username;
    });
    $('.user').mouseenter(function(){
        $('.operating').fadeIn();
    });
    $('.user').mouseleave(function(){
        $('.operating').fadeOut();
    });
})

