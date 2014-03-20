var net = require('net')
var events = require('events')
var buffer = require('buffer')
var png = require('png')

var socket = new net.Socket()
var buffers, length

function receive() {
  socket.connect(exports.port, '127.0.0.1')
  buffers = []
  length = 0
}

function gd2png(buffer, callback) {
  var pngObj = new png.Png(
    buffer,
    exports.width,
    exports.height,
    'rgba')
  pngObj.encode(function(pngData) {
    callback(null, pngData)
    receive()
  })
}

socket.on('data', function (data) {
  buffers.push(data)
  length += data.length
})

socket.on('close', function () {
  gd2png(buffer.Buffer.concat(buffers, length), function(err, buffer) {
    exports.emit('screenshot', buffer)
  })
})

exports = module.exports = new events.EventEmitter()

exports.start = receive

if (require.main === module) {
  module.exports.port = 682
  module.exports.width = 240
  module.exports.height = 160
  exports.on('screenshot', function (screenshot) {
    console.log(screenshot.length)
    process.exit(0)
  })
  exports.start()
}