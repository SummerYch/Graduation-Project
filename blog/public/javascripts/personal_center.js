$(function(){
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
        // $(".mask").css({
        //     display:"block"
        // });
        $(".mask").slideDown();
    });
    $(".x").click(function () {
        $(".mask").slideUp();
    });
    // 保存信息
    $("#submit").click(function () {
        if($(".oc-source").val()==null || $(".na-source").val()==null || $(".co-source").val()==null || $(".bi-source").val()==null || $("#self-intro").val()==null){
            alert("请填写相关信息");
            return;
        }
        var occupation = $(".oc-source").val();
        var name = $(".na-source").val();
        var country = $(".co-source").val();
        var sex = $('input[name="sex"]:checked').val();
        var birthday = $(".bi-source").val();
        var self_intro = $("#self-intro").val();
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
