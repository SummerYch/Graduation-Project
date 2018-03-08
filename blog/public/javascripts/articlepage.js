$(function () {
    mouseEvent();
    var userid = getUrlParameter("userid");
    var usernameA = getUrlParameter("username");
    var username = decodeURI(usernameA);
    var articleid = getUrlParameter("articleid");
    //请求文章内容
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
    //发表评论
    $(".issue").click(function () {
        var comment = $("#comment").val();
        var timeA = new Date();
        var time = timeA.toLocaleString();
        if (comment == "") {
            alert("请填写评论");
        }
        else {
            $.ajax({
                url:'/comment/article',
                type:'post',
                data:{
                    action:'articlecomment',
                    userid:userid,//评论者id
                    username:username,
                    articleid:articleid,
                    comment:comment,
                    time:time
                },
                success:function(data){
                    if(data == "success"){
                        alert("发布评论成功");
                    }
                },
                error:function(err){

                }
            });
        }
    });
    //获取文章评论

    $.ajax({
        url:'/comment/getcomment',
        type:'post',
        data:{
            action:'getcomment',
            articleid:articleid
        },
        success:function (data) {
            for(var i=0;i<data.length;i++){
                var x = ":";
                $(".com-list ul").append(" <li class=\"clearfix\">\n" +
                    "                                <div class=\"replyC clearfix\">\n" +
                    "                                    <div class=\"replyA\">\n" +
                    "                                        <span class=\"name\" value='"+data[i].commenterid+"'>"+data[i].commentername+x+"</span>\n" +
                    "                                        <span class=\"con\">"+data[i].comment_content+"</span>\n" +
                    "                                    </div>\n" +
                    "                                    <div class=\"replyB\"><i class=\"fa fa-commenting-o\"></i> 回复</div>\n" +
                    "                                </div>\n" +
                    "                                <div class=\"time\">时间："+data[i].comment_time+"</div>\n" +
                    "                            </li>");
            }

        },
        error:function(err){
            console.log(err);
        }
    });
    //回复别人的评论
    $(".com-list ul").on("click",".replyB",function(){
        var repliedname = $(this).parent().children(".replyA").children(".name").html();
        $("#comment").html("回复 "+repliedname);
       $("#comment").focus();
    });
    //获取写文章的用户
    $.ajax({
        url:'/article/getuser',
        type:'post',
        data:{
            action:'getuser',
            articleid:articleid
        },
        success:function(data){
            $(".name").html(data[0].username);
            $(".name").attr("value",data[0].userid);
            //判断是否被关注
            ifAttentioned(data[0].userid);
        },
        error:function(err){
            console.log(err);
        }
    });
    //添加取消关注
    $(".attention").on("click",function () {
       var val = $(this).attr("value");
       var followedid = $(this).parent().children(".name").attr("value");
       if(val == 0){//添加关注
           $.ajax({
               url:'/user/addattention',
               type:'post',
               data:{
                   action:'addattention',
                   userid:userid,
                   followedid:followedid
               },
               success:function(data){
                    if(data == "add"){
                        alert("关注成功");
                        $(".attention").addClass("attentioned");
                        $(".attention").html("已关注");
                        $(".attention").attr("value","1");
                    }
               },
               error:function(err){
                   console.log(err);
               }
           })
       }else{
           $.ajax({
               url:'/user/cancelattention',
               type:'post',
               data:{
                   action:'cancelattention',
                   userid:userid,
                   followedid:followedid
               },
               success:function(data){
                   if(data == "cancel"){
                       alert("取消成功");
                       $(".attention").removeClass("attentioned");
                       $(".attention").html("加关注");
                       $(".attention").attr("value","0");
                   }
               },
               error:function(err){
                   console.log(err);
               }
           })
       }
    });
    //收藏文章，取消收藏文章
    $(".collect").click(function () {
        $.ajax({
            url:'/article/addcollect',
            type:'post',
            data:{
                action:'addcollect',
                userid:userid,
                username:username,
                articleid:articleid
            },
            success:function (data) {
                console.log(data);
                if(data == 'success'){
                    $(".collect").addClass("clicked");
                    $(".collect").children("i").attr("class", "fa fa-bookmark");
                }
            },
            error:function (err) {
                console.log(err);
            }
        });
    })

});
function ifAttentioned(id) {
    var followedid = id;
    var followingid = getUrlParameter("userid");
    $.ajax({
        url:'/user/ifattention',
        type:'post',
        data:{
            action:'ifattention',
            followedid:followedid,
            userid:followingid
        },
        success:function(data){
            if(data.length == 0){
                $(".attention").attr("value","0");

            }else{
                $(".attention").attr("value","1");
                $(".attention").addClass("attentioned");
                $(".attention").html("已关注");
            }
        },
        error:function(err){
            console.log(err);
        }
    })
}
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