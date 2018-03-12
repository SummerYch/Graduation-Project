$(function () {
    var userid = getUrlParameter("userid");
    var usernameA = getUrlParameter("username");
    var username = decodeURI(usernameA);
    var sourceid = getUrlParameter("sourceid");
    //获取资源以及上传资源的用户
    $.ajax({
        url: '/source/sourcegetuser',
        type: 'post',
        data: {
            action: 'sourcegetuser',
            sourceid: sourceid
        },
        success: function (data) {
            console.log(data);
            var sourcename = data[0].sourcename.split("-")[1];
            $(".name").html(data[0].username);
            $(".name").attr("value", data[0].userid);
            $(".sourcename").html(sourcename);
            $(".sourcename").attr("value", data[0].id);
            $(".sourcename").attr("path", data[0].sourcepath);
            $(".uploadtime").html(data[0].uploadtime);
            ifAttentioned(data[0].userid);
        },
        error: function () {
            console.log("error");
        }
    });
    //添加取消关注
    $(".attention").on("click", function () {
        var val = $(this).attr("value");
        var followedid = $(this).parent().children(".name").attr("value");
        if (val == 0) {//添加关注
            $.ajax({
                url: '/user/addattention',
                type: 'post',
                data: {
                    action: 'addattention',
                    userid: userid,
                    followedid: followedid
                },
                success: function (data) {
                    if (data == "add") {
                        alert("关注成功");
                        $(".attention").addClass("attentioned");
                        $(".attention").html("已关注");
                        $(".attention").attr("value", "1");
                    }
                },
                error: function (err) {
                    console.log(err);
                }
            })
        } else {
            $.ajax({
                url: '/user/cancelattention',
                type: 'post',
                data: {
                    action: 'cancelattention',
                    userid: userid,
                    followedid: followedid
                },
                success: function (data) {
                    if (data == "cancel") {
                        alert("取消成功");
                        $(".attention").removeClass("attentioned");
                        $(".attention").html("加关注");
                        $(".attention").attr("value", "0");
                    }
                },
                error: function (err) {
                    console.log(err);
                }
            })
        }
    });
    //评论
    //发表评论
    $(".issue").click(function () {
        var comment = $("#comment").val();
        var timeA = new Date();
        var time = timeA.toLocaleString();
        if (comment === "") {
            alert("请填写评论");
        }
        else {
            $.ajax({
                url: '/comment/source',
                type: 'post',
                data: {
                    action: 'sourcecomment',
                    userid: userid,//评论者id
                    username: username,
                    sourceid: sourceid,
                    comment: comment,
                    time: time
                },
                success: function (data) {
                    if (data === "success") {
                        alert("发布评论成功");
                    }
                },
                error: function () {
                    console.log("error");
                }
            });
        }
    });
    //回复别人的评论
    $(".com-list ul").on("click", ".replyB", function () {
        var repliedname = $(this).parent().children(".replyA").children(".com-name").html();
        $("#comment").html("回复 " + repliedname);
        $("#comment").focus();
    });
    //获取文章评论
    $.ajax({
        url: '/comment/getcomment',
        type: 'post',
        data: {
            action: 'getcomment',
            belongs: 'source',
            articleid: sourceid
        },
        success: function (data) {
            for (var i = 0; i < data.length; i++) {
                var name = data[i].commentername;
                $(".commentlist").append("<li class=\"clearfix\">" +
                    "<div class=\"replyC clearfix\">" +
                    "<div class=\"replyA\">" +
                    "<span class=\"com-name\" value='" + data[i].commenterid + "'> " + name + ":</span>" +
                    "<span class=\"con\"> " + data[i].comment_content + "</span>" +
                    "</div>" +
                    "<div class=\"replyB\">" +
                    "<i class=\"fa fa-commenting-o\"></i> 回复</div>" +
                    "</div>" +
                    "<div class=\"time\">时间：" + data[i].comment_time + "</div>" +
                    "</li>");
            }

        },
        error: function (err) {
            console.log(err);
        }
    });
    //收藏文章，取消收藏文章
    $(".collect").click(function () {
        if ($(this).attr("value") == 0) {
            $.ajax({
                url: '/source/addcollect',
                type: 'post',
                data: {
                    action: 'addcollect',
                    userid: userid,
                    sourceid: sourceid
                },
                success: function (data) {
                    console.log(data);
                    if (data == 'success') {
                        alert("收藏成功");
                        $(".collect").addClass("clicked");
                        $(".collect").css({
                            color: "#de686d"
                        });
                        $(".collect").attr("value", 1);
                    }
                },
                error: function (err) {
                    console.log(err);
                }
            });
        }
        else if ($(this).attr("value") == 1) {
            $.ajax({
                url: '/source/cancelcollect',
                type: 'post',
                data: {
                    action: 'cancelcollect',
                    userid: userid,
                    sourceid: sourceid
                },
                success: function () {
                    alert("取消收藏成功");
                    $(".collect").removeClass("clicked");
                    $(".collect").css({
                        color: "#787f87"
                    });
                    $(".collect").attr("value", 0);
                },
                error: function () {
                    console.log("error");
                }
            })
        }
    })
    //获取是否已经收藏
    $.ajax({
        url: '/source/ifcollected',
        type: 'post',
        data: {
            action: 'ifcollected',
            collecterid: userid,
            sourceid: sourceid
        },
        success: function (data) {
            if (data == "") {
                $(".collect").css({color: "#788087"});
                $(".collect").attr("value", 0);
            }
            else {
                $(".collect").css({
                    color: "#de686d"
                });
                $(".collect").attr("value", 1);
            }
        },
        error: function (err) {
            console.log(err);
        }
    });
    //下载
    $(".download").click(function () {
        var sourcepath = $(this).parent().children(".sourcename").attr("path");
        window.open('/download?sourcepath='+sourcepath);
    });
});

function ifAttentioned(id) {
    var followedid = id;
    var followingid = getUrlParameter("userid");
    $.ajax({
        url: '/user/ifattention',
        type: 'post',
        data: {
            action: 'ifattention',
            followedid: followedid,
            userid: followingid
        },
        success: function (data) {
            if (data.length == 0) {
                $(".attention").attr("value", "0");

            } else {
                $(".attention").attr("value", "1");
                $(".attention").addClass("attentioned");
                $(".attention").html("已关注");
            }
        },
        error: function (err) {
            console.log(err);
        }
    })
}
