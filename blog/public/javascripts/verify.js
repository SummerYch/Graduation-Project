$(function(){
    $(".tag .btn").each(function(){
        $(this).on("click",function(){
            var boxClass = $(this).attr("value");
            $(this).removeClass("not-clicked").addClass("clicked");
            $(this).siblings().removeClass("clicked").addClass("not-clicked");
            $("."+boxClass).css({
                display:"block"
            });
            $("."+boxClass).siblings().css({
                display:"none"
            });
        });
    });
    //获取内容
    $.ajax({
        url:'/article/admingetarticle',
        type:'post',
        data:{
            action:'admingetarticle'
        },
        success:function(data){
            console.log(data);
            for(var i =0;i<data.length;i++){
                $(".article-ul").append("<li>"
                +"<div class=\"id\">文章编号: "+data[i].id+"</div>"
                +"<div class=\"title\">文章标题: "+data[i].article_title+"</div>"
                +"<div class=\"article-content\">"+data[i].article_content+"</div>"
            +"</li>")
            }
            
        },
        error:function(err){
            console.log(err);
        }
    });
    $(".x").on("click",function(){
        $(".mask").css({display:"none"});
    })
    //点击li列表查看内容
    $(".article-ul").on("click","li",function(){
        var id = $(this).children(".id").html().split(" ")[1];
        console.log(id);
        var content = $(this).children(".article-content").html();
        $(".mask").css({display:"block"});
        $(".content .id").html(id);
        $(".content .article").html(content);
    });
    //审核文章通过与否
    $(".pass").click(function(){
        var articleid = $(".content .id").html();
        $.ajax({
            url:'',
            data:{
                action:'pass'
            },
            success:function(data){

            },
            error:function(err){
                console.log(err);
            }
        })
    })
});