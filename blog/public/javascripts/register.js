

$(function () {
    $(".login").click(function () {
        window.location.href = '/login';
    });
    $(".btn").click(function(){
        var username = $(".username").val();
        var password = $(".password").val();
        if(username == "" || password == ""){
            alert("请填写用户名以及密码");
            return;
        }
        else{
            var pattern = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？%+\\s+]");
            if(pattern.test(username)){
                $(".error").removeClass("hide").addClass("show");
                return;
            }else{
                $.ajax({
                    type:'post',
                    url:'/user/register',
                    data:{
                        username:username,
                        password:password,
                        action:"register"
                    },
                    success:function(data){
                        console.log(data);
                        if(data == "success"){
                            alert("注册成功！即将跳转!");
                            var timer = setTimeout(function(){
                                window.location.href = '\login';
                            },500);
                        }
                       else if(data == "failed"){
                           alert("用户名已经存在");
                       }
                    },
                    error:function(err){
                        console.log(err);
                    }
                })
            }
        }
    });

})