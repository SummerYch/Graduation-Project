$(function () {
    clickEvents();
    //写博客,提交
    var userid = getUrlParameter("userid");
    var username = getUrlParameter("username");
    $(".article-submit").click(function () {
        var articleTitle = $("#article-title").val();
        var article = $("#article").val();
        var uploadtimeA = new Date();
        var uploadtime = uploadtimeA.toLocaleString();
        if (articleTitle == "" || article == "") {
            alert("请填写相关内容");
            return;
        }
        if($("#article-title").attr("articleid")){
            var articleid = $("#article-title").attr("articleid");
            $.ajax({
                url: "/article/write",
                type: "post",
                data: {
                    action: "writeblog",
                    location: "editstatus",
                    articleid:articleid,
                    articletitle:articleTitle,
                    articlecontent:article,
                    uploadtime:uploadtime
                },
                success: function (data) {
                    if (data == "success") {
                       alert("编辑成功");
                       window.location.reload();
                    }
                },
                error: function (err) {
                    console.log("err:");
                    console.log(err);
                }
            });
        }
        else{
            $.ajax({
                url: "/article/write",
                type: "post",
                data: {
                    action: "writeblog",
                    location: "submit",
                    articleTitle: articleTitle,
                    article: article,
                    userid: userid,
                    uploadtime: uploadtime
                },
                success: function (data) {
                    if (data == "success") {
                        alert("文章提交成功，请等待审核");
                        $("#article-title").val("");
                        $("#article").val("");
                    }
                },
                error: function (err) {
                    console.log("err:");
                    console.log(err);
                }
            });
        }
    });
    //写博客,放入回收站
    $(".in-draft").click(function () {
        var articleTitle = $("#article-title").val();
        var article = $("#article").val();
        var userid = getUrlParameter("userid");
        var uploadtimeA = new Date();
        var uploadtime = uploadtimeA.toLocaleString();
        if (articleTitle == "" || article == "") {
            alert("请填写相关内容");
            return;
        }
        $.ajax({
            url: "/article/write",
            type: "post",
            data: {
                action: "writeblog",
                location: "in-draft",
                articleTitle: articleTitle,
                article: article,
                userid: userid,
                uploadtime: uploadtime
            },
            success: function (data) {
                if (data == "success") {
                    alert("放入草稿箱成功");
                    $("#article-title").val("");
                    $("#article").val("");
                }
            },
            error: function (err) {
                console.log("err:");
                console.log(err);
            }
        });
    });
    //“全部列表”获取文章
    $.ajax({
        url: "/article/get",
        type: "post",
        data: {
            action: "getArticle",
            location: "list-all"
        },
        success: function (data) {
            var length = data.length;
            $(".all-article").html(length);
            for (var i = 0; i < data.length; i++) {
                if (data[i].status == 1) {
                    $("#allarticletable").append(" <tr>"
                        + "<td class=\"title\" value=\"" + data[i].id + "\">" + data[i].article_title + "</td>"
                        + "<td class=\"center\">已发表</td>"
                        + "<td class=\"center\">"
                        + "<button class=\"edit\">编辑</button>"
                        + "<button class=\"delete\">删除</button>"
                        + "</td>"
                        + "</tr>");
                } else if (data[i].status == 2) {
                    $("#allarticletable").append(" <tr>"
                        + "<td class=\"title\" value=\"" + data[i].id + "\">" + data[i].article_title + "</td>"
                        + "<td class=\"center\">草稿箱</td>"
                        + "<td class=\"center\">"
                        + "<button class=\"edit\">编辑</button>"
                        + "<button class=\"delete\">删除</button>"
                        + "</td>"
                        + "</tr>");
                }
            }
        },
        error: function (err) {
            console.log("err:");
            console.log(err);
        }
    });
    //“已发表”获取文章
    $.ajax({
        url: "/article/get",
        type: "post",
        data: {
            action: "getArticle",
            location: "list-posted"
        },
        success: function (data) {
            var length = data.length;
            $(".posted").html(length);
            for (var i = 0; i < data.length; i++) {
                $("#postedarticletable").append(" <tr>"
                    + "<td class=\"title\" value=\"" + data[i].id + "\">" + data[i].article_title + "</td>"
                    + "<td class=\"center\">"
                    + "<button class=\"edit\">编辑</button>"
                    + "<button class=\"delete\">删除</button>"
                    + "</td>"
                    + "</tr>");
            }
        },
        error: function (err) {
            console.log("err:");
            console.log(err);
        }
    });
    //“草稿箱”获取文章
    $.ajax({
        url: "/article/get",
        type: "post",
        data: {
            action: "getArticle",
            location: "list-drafts"
        },
        success: function (data) {
            var length = data.length;
            $(".drafts").html(length);
            for (var i = 0; i < data.length; i++) {
                $("#draftsarticletable").append(" <tr>"
                    + "<td class=\"title\" value=\"" + data[i].id + "\">" + data[i].article_title + "</td>"
                    + "<td class=\"center\">"
                    + "<button class=\"edit\">编辑</button>"
                    + "<button class=\"delete\">删除</button>"
                    + "</td>"
                    + "</tr>");
            }
        },
        error: function (err) {
            console.log("err:");
            console.log(err);
        }
    });
    //“回收站”获取文章
    $.ajax({
        url: "/article/get",
        type: "post",
        data: {
            action: "getArticle",
            location: "list-recycle"
        },
        success: function (data) {
            var length = data.length;
            $(".recyble-bin").html(length);
            for (var i = 0; i < data.length; i++) {
                $("#recyclearticletable").append(" <tr>"
                    + "<td class=\"title\" value=\"" + data[i].id + "\" original_status=\"" + data[i].original_status + "\">" + data[i].article_title + "</td>"
                    + "<td class=\"center\">"
                    + "<button class=\"restore\">恢复</button>"
                    + "<button class=\"delete deepdel\">彻底删除</button>"
                    + "</td>"
                    + "</tr>");
            }
        },
        error: function (err) {
            console.log("err:");
            console.log(err);
        }
    });
    //点击标题显示文章内容
    $(".article-table").on("click", ".title", function () {
        window.location.href = "/articleDetail?userid=" + userid + "&username=" + username + "&articleid=" + $(this).attr("value");
    });
    //文章列表 操作
    $(".article-table").on("click", ".delete", function () {
        if (confirm("确认要删除该文章吗?")) {
            var articleid = $(this).parent().parent().children(".title").attr("value");
            $.ajax({
                url: '/article/inrecycle',
                type: 'post',
                data: {
                    action: 'inrecycle',
                    articleid: articleid
                },
                success: function (data) {
                    if (data.result == 'success') {
                        alert("文章已放入回收站");
                        window.location.reload();
                    }
                },
                error: function (err) {
                    console.log(err);
                }
            });
        }
    });
    //点击编辑
    $(".article-table").on("click", ".edit", function () {
        var num = $(".left ul li:eq(0)").attr("value");
        $(".left ul li:eq(0)").addClass("active");
        $(".left ul li:eq(0)").siblings().removeClass("active");
        var box = $(".box" + num);
        box.removeClass("hide").addClass("show");
        box.siblings().removeClass("show").addClass("hide");

        var articleid = $(this).parent().parent().children(".title").attr("value");
        $.ajax({
            url: '/article/getdetail',
            type: 'post',
            data: {
                action: 'getdetail',
                articleid: articleid
            },
            success: function (data) {
                var articlecontent = data[0].article_content;
                var articletitle = data[0].article_title;
                var articleid = data[0].id;
                $("#article-title").attr("articleid", articleid);
                $("#article-title").val(articletitle);
                $("#article").html(articlecontent);
            },
            error: function (err) {
                console.log(err);
            }
        });
    });
    //回收站恢复
    $(".re-article-table").on("click", ".restore", function () {
        var original_status = $(this).parent().parent().children(".title").attr("original_status");
        var articleid = $(this).parent().parent().children(".title").attr("value");
        console.log(original_status);
        $.ajax({
            url: '/article/restore',
            type: 'post',
            data: {
                action: 'restore',
                articleid: articleid,
                original_status: original_status
            },
            success: function (data) {
                alert("恢复成功");
                window.location.reload();
            },
            error: function (err) {
                console.log(err);
            }
        });
    });
    //回收站彻底删除
    $(".re-article-table").on("click", ".deepdel", function () {
        if (confirm('是否确认彻底删除？删除后不可恢复')) {
            var articleid = $(this).parent().parent().children(".title").attr("value");
            $.ajax({
                url: '/article/deepdelete',
                type: 'post',
                data: {
                    action: 'deepdel',
                    articleid: articleid
                },
                success: function (data) {
                    if (data == 'success') {
                        alert("删除成功");
                        window.location.reload();
                    }
                },
                error: function (err) {
                    console.log(err);
                }
            });
        }
    });
    //资源管理
    $(".publish-source").on("click", function () {
        window.location.href = '/uploadsource?userid='+userid+'&username='+username;
    });
});
// li点击事件，包括相关盒子的显示隐藏，相关盒子内标题p的样式更改
function clickEvents() {
    $(".left ul li").each(function () {
        $(this).on("click", function () {
            var num = $(this).attr("value");
            $(this).addClass("active");
            $(this).siblings().removeClass("active");
            var box = $(".box" + num);
            box.removeClass("hide").addClass("show");
            box.siblings().removeClass("show").addClass("hide");
        })
    });
    $(".manage p").each(function () {
        $(this).click(function () {
            var className = $(this).attr("value");
            $(this).addClass("word-active");
            $(this).siblings().removeClass("word-active");
            var box = $(this).parent().parent().children(".box").children("." + className);
            box.removeClass("hide").addClass("show");
            box.siblings().removeClass("show").addClass("hide");
        })
    });
}