(function () {
  var canvas = document.getElementsByTagName('canvas')[0]
  var context = canvas.getContext('2d')

  function setScreenshot(data) {
    var img = new Image()
    img.onload = function () {
      context.drawImage(img, 0, 0)
    }
    img.src = "data:image/png;base64," + btoa(String.fromCharCode.apply(null, data))
  }

  function readScreenshot(stream) {
    var buffers = []
    var length = 0
    stream.on('data', function (buffer) {
      buffers.push(buffer)
      length += buffer.byteLength
    })
    stream.on('end', function () {
      var data = new Uint8Array(length)
      for (var offset = 0; buffers.length; offset += buffers.shift().byteLength) {
        data.set(new Uint8Array(buffers[0]), offset)
      }
      setScreenshot(data)
      stream.destroy()
    })
  }

  client.on('stream', function(stream, meta){
    if (meta === 'screenshot') {
      readScreenshot(stream)
    }
  });
})()