$(function () {
    $("#file").change(function(){
        var data = new FormData($("#uploadform")[0]);
        data.append('file',$("#file")[0].files[0]);
        data.append('action','upload');
        $.ajax({
            url:'/source/upload',
            type:'post',
            data:data,
            contentType:false,
            processData:false,
            success:function(data){

            },
            error:function(err){
                console.log("err:"+err);
            }
        })
    });
    $("#submit").click(function(){
        console.log(data);
        $.ajax({
            url:'/source/upload',
            type:'post',
            data:data,
            contentType:false,
            processData:false,
            success:function(data){

            },
            error:function(err){
                console.log("err:"+err);
            }
        })
    })
    
})