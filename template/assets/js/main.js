$(function () {
  $('a.scroll').click(function (e) {
    e.preventDefault();

    var section = $(this).attr('href')
      , $scrollto = $(section + '-section');

    $('html,body').animate({
      scrollTop: $scrollto.offset().top - 90
    });
  });

  setTimeout(function () {
    $('.box-wrap')
      .antiscroll({ autoHide: false })
      .data('antiscroll');
  }, 500);
});
