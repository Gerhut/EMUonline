(function () {
  Array.prototype.forEach.call(document.getElementsByTagName('button'), function (button) {
    button.addEventListener('mousedown', function () {
      client.send({
        'name': 'debug',
        'key': button.innerText,
        'status': 1
      }, 'joypad')
    }, false)
    button.addEventListener('mouseout', function (event) {
      if (event.which) {
        client.send({
          'name': 'debug',
          'key': button.innerText,
          'status': 0
        }, 'joypad')
      }
    }, false)
    button.addEventListener('mouseup', function () {
      client.send({
        'name': 'debug',
        'key': button.innerText,
        'status': 0
      }, 'joypad')
    }, false)
  });
})()