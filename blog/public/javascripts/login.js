$(function () {
    $(".login").click(function () {
        var username = $(".username").val();
        var password = $(".password").val();
        $.ajax({
            url: "/user/login",
            type: "post",
            data: {
                username: username,
                password: password,
                action: "login"
            },
            success: function (data) {
                if (data.loginerId) {
                    window.location.href = "/?userid=" + data.loginerId + "&username=" + data.loginerName;
                } else {
                    if (data == 'password wrong') {
                        alert("密码错误，请重新输入");
                        return;
                    }
                    else if (data == 'failed') {
                        alert("用户不存在");
                        return;
                    }
                }
                // if(data == 'success'){
                //     window.location.href = "/";
                // }

            },
            error: function (err) {
                console.log(err);
            }
        });
    });
    $(".register").click(function () {
        window.location.href = '/register';
    })
})