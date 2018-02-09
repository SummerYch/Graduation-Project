$(function () {
    var carousel = $(".carousel").unslider({
        dots:true
    });
    var data = carousel.data('unslider');
    $('.unslider-arrow04').click(function() {
        var fn = this.className.split(' ')[1];
        data[fn]();
    });
    $(".personal-center").click(function(){
        window.location.href = '/personalCenter';
    });
    $('.user').mouseenter(function(){
        $('.operating').fadeIn();
    });
    $('.user').mouseleave(function(){
        $('.operating').fadeOut();
    });
})