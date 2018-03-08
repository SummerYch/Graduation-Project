$(function () {
    clickEvent();
    var userId = getUrlParameter("userid");
    var usernameA = getUrlParameter("username");
    var username = decodeURI(usernameA);
    var himid = getUrlParameter("himid");
    //获取himid名
    $.ajax({
        url:'/user/gethimname',
        type:'post',
        data:{
            action:'gethimname',
            himid:himid
        },
        success:function (data) {
            console.log(data);
            for(var i=0;i<data.length;i++){
                $(".content .article ul").append("<li>\n" +
                    "                        <div class=\"title\" value='"+data[i].id+"'>"+data[i].article_title+"</div>\n" +
                    "                        <div class=\"time\">"+data[i].uploadtime+"</div>\n" +
                    "                    </li>");
            }

        },
        error:function (err) {
            console.log(err);
        }
    });
    //点击文章跳转
    $(".content .article ul").on("click","li",function () {
        var articleid = $(this).children(".title").attr("value");
        window.open("/articlepage?userid="+userId+"&username="+username+"&articleid="+articleid);
    })
})
function clickEvent() {
    $(".tabs div").each(function () {
        $(this).click(function () {
            var className = $(this).attr("class");
            $(this).siblings().removeClass("clicked");
            $(this).addClass("clicked");
            var box = $(this).parent().next().children("." + className);
            box.removeClass("hide").addClass("show");
            box.siblings().removeClass("show").addClass("hide");
        })
    })
}