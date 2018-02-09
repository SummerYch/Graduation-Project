$(function () {
    var carousel = $(".carousel").unslider({
        dots:true
    });
    var data = carousel.data('unslider');
    $('.unslider-arrow04').click(function() {
        var fn = this.className.split(' ')[1];
        data[fn]();
    });
    
})