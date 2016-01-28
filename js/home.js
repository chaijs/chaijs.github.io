$(function () {

  var lastInstall = '#node'
    , allowToggle = true;
  $('.install').on('click', 'a.toggle', function (e) {
    e.preventDefault();
    e.stopPropagation();
    if (!allowToggle) return;
    var which = $(this).attr('href');
    allowToggle = false;
    $(lastInstall + '.install').animate({
      opacity: 0
    }, 250, function () {
      $(this).css({ display: 'none' });
      allowToggle = true;
    });

    $(which + '.install')
      .css({
          display: 'block'
        , opacity: 0
      })
      .animate({
        opacity: 1
      }, 250);
    lastInstall = which;
  });

  $('.callouts .call').mouseenter(function (e) {
    $(this).find('.bg').stop().animate({
        opacity: 0.6
    }, 250);
  });

  $('.callouts .call').mouseleave(function (e) {
    $(this).find('.bg').stop().animate({
        opacity: 0
    }, 250);
  });
});
