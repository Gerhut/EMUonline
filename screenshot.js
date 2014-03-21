(function () {
  var canvas = document.getElementsByTagName('canvas')[0]
  var context = canvas.getContext('2d')

  function setScreenshot(data) {
    var img = new Image()
    img.onload = function () {
      context.drawImage(img, 0, 0)
    }
    img.src = "data:image/jpeg;base64," + btoa(String.fromCharCode.apply(null, data))
  }

  function onData(buffer) {
    setScreenshot(new Uint8Array(buffer))
  }

  function onClose() {
    this.removeListener('data', onData)
    this.removeListener('close', onClose)
  }

  function setStream(stream) {
    stream.on('data', onData)
    stream.on('close', onClose)
  }

  client.on('stream', function (stream, meta){
    if (meta === 'screenshot') {
      setStream(stream)
    }
  });
})()