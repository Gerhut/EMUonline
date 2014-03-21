(function () {
  var data = { 'name': 'debug' }

  function setStream(stream) {
    function writeDown (key) {
      data.key = key
      data.status = 1
      stream.write(data)
    }

    function writeUp (key) {
      data.key = key
      data.status = 0
      stream.write(data)
    }

    Array.prototype.forEach.call(document.getElementsByTagName('button'), function (button) {
      button.addEventListener('mousedown', function () {
        writeDown(button.innerText)
      }, false)
      button.addEventListener('mouseup', function () {
        writeUp(button.innerText)
      }, false)
      button.addEventListener('mouseout', function (event) {
        event.which && writeUp(button.innerText)
      }, false)
    });
  }

  client.on('stream', function (stream, meta){
    if (meta === 'joypad') {
      setStream(stream)
    }
  });
})()