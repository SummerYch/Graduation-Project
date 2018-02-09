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
                alert("请输入正确的用户名");
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
                    },
                    error:function(){

                    }
                })
            }
        }
    });

})