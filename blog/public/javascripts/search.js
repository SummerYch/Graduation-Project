$(function () {
    var userId = getUrlParameter("userid");
    var username = decodeURI(getUrlParameter("username"));
    //切换
    $(".btn").on("click", function () {
        $(this).addClass("clicked").siblings().removeClass("clicked");
        var classname = $(this).attr("class");
        var boxclass = classname.split(" ")[1].split("-")[1];
        $("." + boxclass).removeClass("hide").addClass("show");
        $("." + boxclass).siblings().removeClass("show").addClass("hide");
    });
    //搜索
    //获取文章
    var keyword = decodeURI(getUrlParameter("keyword"));
    $.ajax({
        url: '/user/search',
        type: 'post',
        data: {
            action: 'search',
            location: 'article',
            keyword: keyword
        },
        success: function (data) {
            for (var i = 0; i < data.length; i++) {
                $(".articlelist").append(" <li class=\"art-li\">"
                    + "<div class=\"title\" value=\"" + data[i].id + "\">" + data[i].article_title + "</div>"
                    + "<div class=\"info\">"
                    + "<span class=\"sp author\" value=\"\">作者：" + data[i].username + "</span>"
                    + "<span class=\"sp time\">时间：" + data[i].uploadtime + "</span>"
                    + "</div>"
                    + "</li>");
            }
        },
        error: function () {
            console.log("error");
        }
    });
    //资源
    $.ajax({
        url: '/user/search',
        type: 'post',
        data: {
            action: 'search',
            location: 'source',
            keyword: keyword
        },
        success: function (data) {
            for(var i=0;i<data.length;i++){
                var sourcename = data[i].sourcename.split("-")[1];
                $(".sourcelist").append(" <li class=\"clearfix\">\n" +
                    "                       <div class=\"title\" value=\""+data[i].id+"\">"+sourcename+"</div>\n" +
                    "                        <div class=\"detail\">\n" +
                    "                            <span class=\"author\">"+data[i].username+"</span>\n" +
                    "                            <span class=\"uploadtime\">"+data[i].uploadtime+"</span>\n" +
                    "                        </div>\n" +
                    "                    </li>")
            }
        },
        error: function () {
            console.log("error");
        }
    });
    //作者
    $.ajax({
        url: '/user/search',
        type: 'post',
        data: {
            action: 'search',
            location: 'author',
            keyword: keyword
        },
        success: function (data) {
            console.log(data.length);
            for (var i = 0; i < data.length; i++) {
                $(".authorlist").append(" <li class=\"clearfix\">\n" +
                    "                            <div class=\"avatar\">\n" +
                    "                                <img src=\"images/1.jpg\" alt=\"\">\n" +
                    "                            </div>\n" +
                    "                            <div class=\"name\" value='" + data[i].id + "'>" + data[i].username + "</div>\n" +
                    "                        </li>");
            }
        },
        error: function () {
            console.log("error");
        }
    });
    //点击作者跳转到相应主页
    $(".authorlist").on("click", "li", function () {
        var himid = $(this).children(".name").attr("value");
        var himname = $(this).children(".name").html();
        window.open('/articleDetail?userid=' + userId + '&username=' + username + '&himid=' + himid+'&himname='+himname);
    });
    //点击文章跳转
    $(".articlelist").on("click","li",function(){
        var articleid = $(this).children(".title").attr("value");
        window.open('/articlepage?userid='+userId+'&username='+username+'&articleid='+articleid);
    });
    //点击资源跳转
    $(".sourcelist").on("click","li",function () {
        var sourceid = $(this).children(".title").attr("value");
        window.open('/downloadsource?userid='+userId+'&username='+username+'&sourceid='+sourceid);
    });
    $(".sea-btn").click(function () {
        var seVal = $(".search").val();
        // window.open('/search?userid='+userId+'&username='+username+'&keyword='+seVal);
        window.location.href ='/search?userid='+userId+'&username='+username+'&keyword='+seVal;
    })
});