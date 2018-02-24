$(function () {
    clickEvents();
     //写博客
     $(".article-submit").click(function () {
        var articleTitle = $("#article-title").val();
        var article = $("#article").val();
        console.log(article);
        $.ajax({
            
        });
    })
});
// li点击事件，包括相关盒子的显示隐藏，相关盒子内标题p的样式更改
function clickEvents() {
    $(".left ul li").each(function () {
        $(this).click(function () {
            var num = $(this).attr("value");
            $(this).addClass("active");
            $(this).siblings().removeClass("active");
            var box = $(".box"+num);
            box.removeClass("hide").addClass("show");
            box.siblings().removeClass("show").addClass("hide");
        })
    });
    $(".manage p").each(function () {
        $(this).click(function () {
            var className = $(this).attr("value");
            $(this).addClass("word-active");
            $(this).siblings().removeClass("word-active");
            var box = $(this).parent().parent().children(".box").children("."+className);
            box.removeClass("hide").addClass("show");
            box.siblings().removeClass("show").addClass("hide");
        })
    })
}