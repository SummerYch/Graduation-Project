$(function () {
    mouseEvent();
    var userid = getUrlParameter("userid");
    var username = getUrlParameter("username");
    var articleid = getUrlParameter("articleid");
    $.ajax({
        url: '/article/getdetail',
        type: 'post',
        data: {
            action: 'getdetail',
            articleid: articleid
        },
        success: function (data) {
            $(".title h1").html(data[0].article_title);
            $(".title p").html(data[0].uploadtime);
            $(".content").html(data[0].article_content);
        },
        error: function (error) {
            console.log(err);
            return;
        }
    });
    $(".issue").click(function () {
        var comment = $("#comment").val();
        if (comment == "") {
            alert("请填写评论");
        }
        else {
            alert(comment);
        }
    });
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