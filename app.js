(function () {
  var client = BinaryClient('ws://link.gerhut.me')
  var canvas = document.getElementsByTagName('canvas')[0]
  var context = context.getContext('2d')

  function setScreenshot(buffer) {
    var imageData = context.createImageData(canvas.width, canvas.height)
    imageData.data.set(buffer.toUInt8Array())
    context.putImageData(imageData, 0, 0)
  }

  function readScreenshot(stream) {
    var buffers = []
    var length = 0
    stream.on('data', function (buffer) {
      buffers.push(buffer)
      length += buffer.byteLength
    }).on('end', function () {
      var buffer = new UInt8Array(length)
      for (var offset = 0; buffers.length; offset += buffers.shift().byteLength) {
        buffer.set(new UInt8Array(buffers[0]), offset)
      }
      setScreenshot(buffer)
    })
  }

  client.on('stream', function(stream, meta){
    if (meta === 'screenshot') {
      readScreenshot(stream)
    }
  });
})()