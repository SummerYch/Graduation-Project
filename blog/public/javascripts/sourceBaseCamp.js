$(function () {
    var userid = getUrlParameter("userid");
    var username = getUrlParameter("username");
    //获取资源列表
    $.ajax({
        url: '/source/getsourcelist',
        type: 'post',
        data: {
            action: 'getsourcelist'
        },
        success: function (data) {
            // console.log(data);
            for(var i=0;i<data.length;i++){
                var sourcename = data[i].sourcename.split("-")[1];
                $(".source-list ul").append(" <li class=\"clearfix\">\n" +
                    "                       <div class=\"title\" value=\""+data[i].id+"\">"+sourcename+"</div>\n" +
                    "                        <div class=\"detail\">\n" +
                    "                            <span class=\"author\">"+data[i].username+"</span>\n" +
                    "                            <span class=\"uploadtime\">"+data[i].uploadtime+"</span>\n" +
                    "                        </div>\n" +
                    "                    </li>")
            }
        },
        error: function () {
            console.log("error");
        }
    })
    //点击资源列表，跳转到下载页
    $(".source-list ul").on("click","li",function () {
        var sourceid = $(this).children(".title").attr("value");
       window.open('/downloadsource?userid='+userid+'&username='+username+'&sourceid='+sourceid);
    });
});