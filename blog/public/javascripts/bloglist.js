$(function () {
    clickEvent();
})
function clickEvent() {
    $(".tabs div").each(function () {
        $(this).click(function () {
            var className = $(this).attr("class");
            $(this).siblings().removeClass("clicked");
            $(this).addClass("clicked");
            console.log(className);
            var box = $(this).parent().next().children("."+className);
            box.removeClass("hide").addClass("show");
            box.siblings().removeClass("show").addClass("hide");
        })
    })
}