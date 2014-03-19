(function () {
  Array.prorotype.forEach.call(document.getElementsByTagName('button'), function (button) {
    button.addEventListener('mousedown', function () {
      client.send({
        'name': 'debug',
        'key': button.innerText,
        'status': 1
      }, 'joypad')
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