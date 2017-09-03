function loadData() {
  const imageText = getQueryParamByName('text');
  const imageBgId = getQueryParamByName('backgroundId') || 1;

  $('.js-container').css(
    'background-image',
    'url(images/' + imageBgId + '.jpg)'
  );
  $('.js-text').text(imageText);
}

function getQueryParamByName(name) {
  let queryParameters = {};
  location.queryString = {};
  location.search.substr(1).split('&').forEach(function(pair) {
    if (pair === '') return;
    var parts = pair.split('=');
    queryParameters[parts[0]] =
      parts[1] && decodeURIComponent(parts[1].replace(/\+/g, ' '));
  });
  return queryParameters[name];
}

loadData();
