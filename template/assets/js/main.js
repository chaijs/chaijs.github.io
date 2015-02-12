$(function () {
  $('a.scroll').click(function (e) {
    e.preventDefault();

    var section = $(this).attr('href')
      , $scrollto = $(section + '-section');

    $('html,body').animate({
      scrollTop: $scrollto.offset().top - 90
    });
  });

  var OFFSET = 470;
  var MIN_HEIGHT = 256;

  var updateScrollableList = function () {
    var height = Math.max($(window).height() - OFFSET, MIN_HEIGHT);
    $('.box-wrap')
      .find('.antiscroll-inner')
        .height(height)
      .end()
      .height(height)
      .antiscroll({ autoHide: false })
      .data('antiscroll');
  };

  setTimeout(updateScrollableList, 0);
  $(window).resize(updateScrollableList);
});
