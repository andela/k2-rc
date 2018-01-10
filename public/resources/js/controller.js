$(function(){
    $('.category-div').mouseover(function(){
        $(this).find('.overlay').css('opacity', '0.5');
    }).mouseout(function(){
        $(this).find('.overlay').css('opacity', '0.2');
    });
});