$(function () {

  $('body').on('click', 'a[href^="#"]', function (e) {
    e.preventDefault();

    var section = $(this).attr('href')
      , $scrollto = $(section);

    $('html,body').animate({
      scrollTop: $scrollto.offset().top
    }, function () {
      window.location.hash = section;
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
