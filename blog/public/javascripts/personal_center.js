$(function(){
    // 个人中心显示隐藏
    $(".personal-center").click(function(){
        window.location.href = '/personalCenter?userid='+userId+'&username='+username;
    });
    $('.user').mouseenter(function(){
        $('.operating').fadeIn();
    });
    $('.user').mouseleave(function(){
        $('.operating').fadeOut();
    });
     // 获取 url中参数
     var userId = getUrlParameter("userid");
     var username = getUrlParameter("username");
     $(".user").children("span").html(username);
     $(".nickname").html(username);
    // 文章列表
    $(".title ul li").click(function () {
        $(this).attr("class","active");
        $(this).siblings().attr("class","active-o");
        var num = $(this).children().text();
        var con = $(".content").children(".con"+num);
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
        console.log(userId);
        if($(".oc-source").val()=="" || $(".na-source").val()=="" || $(".co-source").val()=="" || $(".bi-source").val()=="" || $("#self-intro").val()==""){
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
            userid:userId,
            occupation:occupation,
            name:name,
            country:country,
            sex:sex,
            birthday:birthday,
            self_intro:self_intro,
            action:"user_info"
        }
        $.ajax({
            url:"/user/user_info",
            type:"post",
            data:data,
            success:function(data){

            },
            error:function(err){
                console.log(err);
            }
        })
        // 把数据保存在数据库中，再从数据库中获取显示到前台
        // $(".occupation").html(occupation);
        // $(".name").html(name);
        // $(".country").html(country);
        // $(".sex").html(sex);
        // $(".birthday").html(birthday);
        // $(".self-intro").html(self_intro);
        // $(".mask").css({
        //     display:"none"
        // });
    });
})
