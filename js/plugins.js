$(function () {

  var $allPluginsLinkElement = $('#all');
  var current = $('#all');
  var $pluginElement = $('.plug_list_scratch');
  var $allPlugins = $('#plugins article');
  function doSwitch ($linkElement) {
    if ($linkElement[0] == current) return;
    current = $linkElement[0];

    $('html,body').animate({
      scrollTop: 0
    });

    var $plugins;

    $('#ptags > .tag.active').removeClass('active');
    $allPlugins.removeClass('hidden');
    if ($linkElement[0] === $allPluginsLinkElement[0]) {
      $plugins = $();
    } else {
      var keywords = $linkElement.data('keywords');
      $plugins = $allPlugins.filter(function (index, element) {
        elementKeywords = $(element).data('keywords');
        if (!elementKeywords || !elementKeywords.length) return true;
        for (var i in keywords) {
          if (elementKeywords.indexOf(keywords[i]) !== -1) {
            return false;
          }
        }
        return true;
      });
    }
    $plugins.addClass('hidden');
    $linkElement.parent('.tag').addClass('active');
  }

  $('#ptags').on('click', '.tag > .which', function (event) {
    event.preventDefault();
    doSwitch($(this));
  });

  $('#ptags').on('click', '.tag > span.reset', function (event) {
    event.preventDefault();
    console.log('reset');
    doSwitch($allPluginsLinkElement);
  });

});
