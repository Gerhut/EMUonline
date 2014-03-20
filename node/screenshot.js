var net = require('net')
var events = require('events')
var pngjs = require('pngjs')
var Buffer = require('buffer').Buffer

var StreamToBuffer = require('./StreamToBuffer')

var socket = new net.Socket()
var buffers, length

function receive() {
  socket.connect(exports.port, '127.0.0.1')
  StreamToBuffer(socket, dataReceived)
}

function dataReceived(err, buffer) {
  if (err)
    exports.emit('error', err)
  else
    data2png(buffer)
}

function data2png(buffer) {
  var png = new pngjs.PNG({
    width: exports.width,
    height: exports.height,
    checkCRC: false
  })
  var pixels = exports.width * exports.height
  png.data = Buffer.concat([
      buffer.slice(12),
      new Buffer(1)
    ], pixels * 4)

  for (var i = 0; i < pixels; i++) {
    png.data[i * 4 + 3] = 0xFF
  }

  StreamToBuffer(png.pack(), pngReceived)
}

function pngReceived(err, buffer) {
  if (err)
    return exports.emit('error', err)
  exports.emit('screenshot', buffer)
  receive()
}

exports = module.exports = new events.EventEmitter()

exports.start = receive

if (require.main === module) {
  module.exports.port = 682
  module.exports.width = 240
  module.exports.height = 160
  exports.on('screenshot', function (screenshot) {
    require('fs').writeFileSync('screenshot.png', screenshot)
    process.exit(0)
  })
  exports.start()
}