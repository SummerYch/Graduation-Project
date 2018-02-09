function ajaxRequest(url,transmitted_data) {
    $.ajax({
        url:url,
        type:"GET",
        data:transmitted_data,
        success:function (data) {
            return data;
        },
        error:function (error) {
            console.log("1");
            console.log(error);
        }
    })
}