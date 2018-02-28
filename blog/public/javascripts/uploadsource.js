$(function () {
    
    var userid = getUrlParameter("userid");
    var username = getUrlParameter("username");
    $("#file").change(function () {
        var file = $("#file")[0].files[0];
        var filename = file.name;
        console.log(filename);
        $("#filename").html(filename);
    });

    $("#submit").click(function () {
        if ($("#source_name") == "" || $("#tag") == "" || $("#description") == "") {
            alert("请填写相关资料");
        } else {
            var uploadtimeA = new Date();
            var uploadtime = uploadtimeA.toLocaleString();
            var sourcename = $("#source_name").val();
            var keyword = $("#tag").val();
            var description = $("#description").val();
            var filetype = $("#file_type option:selected").val();
            var classify = $("#classify option:selected").val();
            var point = $("#fraction option:selected").val();
            var data = new FormData();
            var file = $("#file")[0].files[0];
            data.append('file', file);
            data.append('action', 'upload');
            data.append('userid',userid);
            data.append('username',username);
            data.append('uploadtime',uploadtime);
            data.append('keyword',keyword);
            data.append('description',description);
            data.append('filetype',filetype);
            data.append('classify',classify);
            data.append('point',point);
            $.ajax({
                url: '/source/upload',
                type: 'post',
                data: data,
                contentType: false,
                processData: false,
                success: function (data) {
                   if(data == 'success'){
                       alert("文件上传成功");
                   } 
                },
                error: function (err) {
                    console.log("err:" + err);
                }
            });
        }
        return false;
    });
})