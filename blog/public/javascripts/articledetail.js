$(function () {
    clickEvent();
    var userId = getUrlParameter("userid");
    var usernameA = getUrlParameter("username");
    var username = decodeURI(usernameA);
    var himid = getUrlParameter("himid");
    var himname = decodeURI(getUrlParameter("himname"));
    $(".article-title").html(himname+"的博客");
    //获取himid文章
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
    });
    //获取资源
    $.ajax({
        url:'/source/gethimsource',
        type:'post',
        data:{
            action:'gethimsource',
            userid:himid
        },
        success:function (data) {
            console.log(data);
            for(var i=0;i<data.length;i++){
                var sourcename = data[i].sourcename.split("-")[1];
                $(".source ul").append("<li>\n" +
                    "                        <p class=\"name\" value='"+data[i].id+"'>"+sourcename+"</p>\n" +
                    "                        <p class=\"time\">"+data[i].uploadtime+"</p>\n" +
                    "                    </li>");
            }
        },
        error:function () {
            console.log("error");
        }
    });
    //点击资源跳转下载页
    $(".source ul").on("click","li",function () {
        var sourceid = $(this).children(".name").attr("value");
        window.open('/downloadsource?userid='+userId+'&username='+username+'&sourceid='+sourceid);
    });
});
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