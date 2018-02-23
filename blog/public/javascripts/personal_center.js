$(function(){
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
        };
        $.ajax({
            url:"/user/user_info",
            type:"post",
            data:data,
            success:function(data){
                console.log(data);
                if(data == "success"){
                    alert("修改信息成功");
                    $(".mask").slideUp();
                }
                else if(data == "failed"){
                    alert("修改信息失败");
                }
                
            },
            error:function(err){
                console.log(err);
            }
        })
    });
    //info下的span显示信息
    $.ajax({
        url:"/user/getUserInfo",
        type:"post",
        data:{
            userid:userId,
            action:"getUserInfo"
        },
        success:function(data){
            console.log(data);
            $(".occupation").html(data.occupation);
            $(".name").html(data.name);
            $(".country").html(data.country);
            $(".sex").html(data.sex);
            $(".birthday").html(data.birthday);
            $(".self-intro").html(data.self_intro);
        },
        error:function(err){
            console.log(err);
        }
    })
})
