$(function () {
    clickEvent();
    var articleid = getUrlParameter("articleid");
    //获取对应id的文章内容
    $.ajax({
        url:'/article/getdetail',
        type:'post',
        data:{
            action:'getdetail',
            articleid:articleid
        },
        success:function(data){
            console.log(data);
            $(".article-title").html(data[0].article_title);
            $(".uploadtime").html(data[0].uploadtime);
            $(".content").html(data[0].article_content);
        },
        error:function(err){
            console.log(err);
        }
    });
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