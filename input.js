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
        writeDown(button.dataset.key)
      }, false)
      button.addEventListener('mouseup', function () {
        writeUp(button.dataset.key)
      }, false)
      button.addEventListener('mouseout', function (event) {
        event.which && writeUp(button.dataset.key)
      }, false)
    });
  }

  hellos.push(function (name) {
    data.name = name

    client.on('stream', function (stream, meta){
      if (meta === 'joypad') {
        setStream(stream)
      }
    });
  })
})()