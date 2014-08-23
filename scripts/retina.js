// JavaScript Document



$(function () {
    if (window.devicePixelRatio > 1) {
        $('img').each(function() {
            $(this).attr('src', $(this).attr('src').replace(/(\.)(png|jpg|gif)/gi,'@2x$1$2'));
        });
    }
});