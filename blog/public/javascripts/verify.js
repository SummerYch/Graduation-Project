$(function () {
    $(".tag .btn").each(function () {
        $(this).on("click", function () {
            var boxClass = $(this).attr("value");
            $(this).removeClass("not-clicked").addClass("clicked");
            $(this).siblings().removeClass("clicked").addClass("not-clicked");
            $("." + boxClass).css({
                display: "block"
            });
            $("." + boxClass).siblings().css({
                display: "none"
            });
        });
    });
    //文章获取内容
    $.ajax({
        url: '/article/admingetarticle',
        type: 'post',
        data: {
            action: 'admingetarticle'
        },
        success: function (data) {
            for (var i = 0; i < data.length; i++) {
                $(".article-ul").append("<li>"
                    + "<div class=\"id\">文章编号: " + data[i].id + "</div>"
                    + "<div class=\"title\">文章标题: " + data[i].article_title + "</div>"
                    + "<div class=\"article-content\">" + data[i].article_content + "</div>"
                    + "</li>")
            }

        },
        error: function (err) {
            console.log(err);
        }
    });
    $(".x").on("click", function () {
        $(".mask").css({ display: "none" });
    })
    //资源获取内容
    $.ajax({
        url: '/source/admingetsource',
        type: 'post',
        data: {
            action: 'admingetsource'
        },
        success: function (data) {
            for (var i = 0; i < data.length; i++) {
                $(".source-ul").append("<li><div class=\"id\" value=\"\">资源编号: " + data[i].id + "</div>"
                    + "<div class=\"title\">资源名称: " + data[i].sourcename + "</div>"
                    + "<div>文件路径: " + data[i].sourcepath + "</div>"
                    + "<div>"
                    // + "<button class=\"btn openpath\">打开文件路径<span class=\"path\">" + data[i].sourcepath + "</span></button>"
                    + "<button class=\"btn source-pass\">通过</button>"
                    + "<button class=\"btn source-not-pass\">不通过</button>"
                    + "</div></li>");
            }
        },
        error: function (err) {
            console.log(err);
        }
    });
    //打开文件路径
    $(".source-ul").on("click", ".openpath", function () {
        var filepath = $(this).children(".path").html();
        try {
            var obj = new ActiveXObject("wscript.shell");
            if (obj) {
                obj.Run(filepath, 1, false);
            }
        } catch (e) {
            console.log(e);
            alert("打开失败");
        }
    });
    //点击li列表查看内容
    $(".article-ul").on("click", "li", function () {
        var id = $(this).children(".id").html().split(" ")[1];
        var content = $(this).children(".article-content").html();
        $(".mask").css({ display: "block" });
        $(".content .id").html(id);
        $(".content .article").html(content);
    });
    //审核文章通过与否
    $(".pass").click(function () {
        var articleid = $(".content .id").html();
        $.ajax({
            url: '/article/pass',
            type: 'post',
            data: {
                action: 'articlepass',
                articleid: articleid
            },
            success: function (data) {
                if (data == "success") {
                    alert("操作成功");
                    window.location.reload();
                }
            },
            error: function (err) {
                console.log(err);
            }
        });

    });
    $(".notpass").click(function () {
        var articleid = $(".content .id").html();
        $.ajax({
            url: '/article/notpass',
            type: 'post',
            data: {
                action: 'articlenotpass',
                articleid: articleid
            },
            success: function (data) {
                if (data == "success") {
                    alert("操作成功");
                    window.location.reload();
                }
            },
            error: function (err) {
                console.log(err);
            }
        });

    });
    //审核资源是否通过
    $(".source-ul").on("click",".source-pass",function(){
        var sourceid = $(this).parent().parent().children(".id").html().split(" ")[1];
        $.ajax({
            url:'/source/sourcepass',
            type:'post',
            data:{
                action:'sourcepass',
                sourceid:sourceid
            },
            success:function(data){
                alert("操作成功");
            },
            error:function(err){
                console.log(err);
            }
        });
    });
    $(".source-ul").on("click",".source-not-pass",function(){
        var sourceid = $(this).parent().parent().children(".id").html().split(" ")[1];
        $.ajax({
            url:'/source/sourcenotpass',
            type:'post',
            data:{
                action:'sourcenotpass',
                sourceid:sourceid
            },
            success:function(data){
                alert("操作成功");
            },
            error:function(err){
                console.log(err);
            }
        });
    });
});