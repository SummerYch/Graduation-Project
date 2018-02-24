$(function () {
    mouseEvent();
});
// 鼠标划入划出事件
function mouseEvent() {
    $(".c-c").each(function () {
        var iTag = $(this).children("i");
        $(this).mouseenter(function () {
            if (iTag.attr("value") == "true") {
                iTag.attr("class", "fa fa-bookmark");
            } else if (iTag.attr("value") == "false") {
                iTag.attr("class", "fa fa-commenting");
            }
            $(this).css({ color: "#de686d" });
        });
        $(this).mouseleave(function () {
            if (iTag.attr("value") == "true") {
                iTag.attr("class", "fa fa-bookmark-o");
            } else if (iTag.attr("value") == "false") {
                iTag.attr("class", "fa fa-commenting-o");
            }
            $(this).css({ color: "#788087" });
        })
    })
}