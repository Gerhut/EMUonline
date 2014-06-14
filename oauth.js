(function () {
  var clientId = 'HcA7pk8sqoQklZswvTwXz9YS';
  var oAuthUrl = [
    'https://openapi.baidu.com/oauth/2.0/authorize?response_type=token',
    'client_id=' + clientId,
    'redirect_uri=' + location.protocol + '//' + location.host
  ].join('&');
  if (location.hash.indexOf('access_token=') === -1) {
    return location.href = oAuthUrl;
  }

  var accessToken = location.hash.substr(
    location.hash.indexOf('access_token='));
  accessToken = accessToken.substr(0, accessToken.indexOf('&'));
  
  var restUrl = 'https://openapi.baidu.com/rest/2.0/passport/users/getLoggedInUser?' + accessToken + '&callback=callback'
  var script = document.createElement('script')
  script.src = restUrl
  document.head.appendChild(script)

  window.callback = function (data) {
    delete window.callback;
    if ('uname' in data && 'uid' in data)
     hello(data);
    else
     location.replace(location.protocol + '//' + location.host);
  };
})();