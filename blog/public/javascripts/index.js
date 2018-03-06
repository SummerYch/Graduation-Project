$(function () {
    // 轮播图部分
    var carousel = $(".carousel").unslider({
        dots: true
    });
    var data = carousel.data('unslider');
    $('.unslider-arrow04').click(function () {
        var fn = this.className.split(' ')[1];
        data[fn]();
    });
    // 获取 url中参数
    var userId = getUrlParameter("userid");
    var username = getUrlParameter("username");
    if (userId) {
        console.log(userId);
        console.log(username);
        $(".lo-re").removeClass("show").addClass("hide");
        $(".user").removeClass("hide").addClass("show");
        $(".user").children("span").html(username);
    }
    $(".personal-center").click(function () {
        window.location.href = '/personalCenter?userid=' + userId + '&username=' + username;
    });
    $.ajax({
        url: '/article/indexgetarticle',
        type: 'post',
        data: {
            action:'indexgetarticle'
        },
        success: function (data) {
            console.log(data);
            for(var i=0;i<data.length;i++){
                $(".recommend ul").append(" <li class=\"art-li\">"
                +"<div class=\"title\" value=\""+data[i].id+"\">"+data[i].article_title+"</div>"
                +"<div class=\"info\">"
                    +"<span class=\"sp author\" value=\"\">"+data[i].username+"</span>"
                    +"<span class=\"sp time\">"+data[i].uploadtime+"</span>"
                +"</div>"
            +"</li>");
            }
            
        },
        error: function (err) {
            console.log(err);
        }
    });
    $(".list").on("click",".art-li",function(){
        var articleid = $(this).children(".title").attr("value");
        window.open('/articlepage?userid='+userId+'&username='+username+'&articleid='+articleid);
    });
})

