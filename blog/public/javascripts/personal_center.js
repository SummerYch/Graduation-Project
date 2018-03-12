$(function () {
    // 获取 url中参数
    var userId = getUrlParameter("userid");
    var usernameA = getUrlParameter("username");
    var username = decodeURI(usernameA);
    $(".user").children("span").html(username);
    $(".nickname").html(username);
    // 文章列表
    $(".title ul li").click(function () {
        $(this).attr("class", "active");
        $(this).siblings().attr("class", "active-o");
        var num = $(this).attr("value");
        var con = $(".content").children(".con" + num);
        con.removeClass("hide").addClass("show");
        con.siblings().removeClass("show").addClass("hide");
    });
    // 点击a标签编辑信息
    $(".edit-a").click(function () {
        $(".mask").slideDown();
    });
    $(".x").click(function () {
        $(".mask").slideUp();
    });
    // 保存信息
    $("#submit").click(function () {
        if ($(".oc-source").val() == "" || $(".na-source").val() == "" || $(".co-source").val() == "" || $(".bi-source").val() == "" || $("#self-intro").val() == "") {
            alert("请填写相关信息");
            return;
        }
        var occupation = $(".oc-source").val();
        var name = $(".na-source").val();
        var country = $(".co-source").val();
        var sex = $('input[name="sex"]:checked').val();
        var birthday = $(".bi-source").val();
        var self_intro = $("#self-intro").val();
        var data = {
            userid: userId,
            occupation: occupation,
            name: name,
            country: country,
            sex: sex,
            birthday: birthday,
            self_intro: self_intro,
            action: "user_info"
        };
        $.ajax({
            url: "/user/user_info",
            type: "post",
            data: data,
            success: function (data) {
                console.log(data);
                if (data == "success") {
                    alert("修改信息成功");
                    $(".mask").slideUp();
                }
                else if (data == "failed") {
                    alert("修改信息失败");
                }
            },
            error: function (err) {
                console.log(err);
            }
        })
    });
    //info下的span显示信息
    $.ajax({
        url: "/user/getUserInfo",
        type: "post",
        data: {
            userid: userId,
            action: "getUserInfo"
        },
        success: function (data) {
            $(".occupation").html(data.occupation);
            $(".name").html(data.name);
            $(".country").html(data.country);
            $(".sex").html(data.sex);
            $(".birthday").html(data.birthday);
            $(".self-intro").html(data.self_intro);
        },
        error: function (err) {
            console.log(err);
        }
    });
    //我的关注按钮点击切换
    $(".btn:eq(0)").click(function () {
        $(this).addClass("active-btn");
        $(".i-concern").removeClass("hide").addClass("show");
        $(".concern-i").removeClass("show").addClass("hide");
        $(this).siblings().removeClass("active-btn");
    });
    $(".btn:eq(1)").click(function () {
        $(this).addClass("active-btn");
        $(".concern-i").removeClass("hide").addClass("show");
        $(".i-concern").removeClass("show").addClass("hide");
        $(this).siblings().removeClass("active-btn");
    });
    //我的关注
    $.ajax({
        url: 'user/getconcern',
        type: 'post',
        data: {
            action: 'getconcern',
            userid: userId
        },
        success: function (data) {
            for (var i = 0; i < data.length; i++) {
                $(".i-concern").append(" <li class=\"clearfix\">\n" +
                    "                            <div class=\"avatar\">\n" +
                    "                                <img src=\"images/1.jpg\" alt=\"\">\n" +
                    "                            </div>\n" +
                    "                            <div class=\"name\" value='" + data[i].id + "'>" + data[i].username + "</div>\n" +
                    "                        </li>");
            }
        },
        error: function (err) {
            console.log("error");
        }
    });
    //点击关注跳转到相应主页
    $(".i-concern").on("click", "li", function () {
        var himid = $(this).children(".name").attr("value");
        window.open('/articleDetail?userid=' + userId + '&username=' + username + '&himid=' + himid);
    });
    //我收藏的文章
    $.ajax({
        url: '/article/geticollect',
        type: 'post',
        data: {
            action: 'geticollect',
            userid: userId
        },
        success: function (data) {
            console.log(data);
            for(var i=0;i<data.length;i++){
                $(".con4 ul").append("<li>\n" +
                    "                            <div class=\"title\" value=\""+data[i].id+"\">"+data[i].article_title+"</div>\n" +
                    "                            <div class=\"info\">\n" +
                    "                                <span class=\"sp author\">"+data[i].username+"</span>\n" +
                    "                                <span class=\"sp time\">"+data[i].uploadtime+"</span>\n" +
                    "                            </div>\n" +
                    "                        </li>");
            }
        },
        error: function () {
            console.log("error");
        }
    });
    //我收藏的文章点击跳转
    $(".con4 ul").on("click","li",function(){
        var articleid = $(this).children(".title").attr("value");
        window.open('/articlepage?userid='+userId+'&username='+username+'&articleid='+articleid);
    });
})
