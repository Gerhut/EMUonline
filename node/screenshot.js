var net = require('net')
var events = require('events')
var jpeg = require('jpeg-js')
var Buffer = require('buffer').Buffer

var StreamToBuffer = require('./StreamToBuffer')

var socket = new net.Socket()
var buffers, length

function receive() {
  socket.connect(exports.port, '127.0.0.1')
  StreamToBuffer(socket, dataReceived)
  socket.end()
}

function dataReceived(err, buffer) {
  if (err)
    exports.emit('error', err)
  else
    data2jpeg(buffer)
}

function data2jpeg(buffer) {
  var pixels = Buffer.concat([
    buffer.slice(12),
    new Buffer(1)
  ])
  var pic = {
    data: pixels,
    width: exports.width,
    height: exports.height
  }
  pic = jpeg.encode(pic, 20)
  exports.emit('screenshot', pic.data)
  setImmediate(receive)
}

exports = module.exports = new events.EventEmitter()

exports.start = receive

if (require.main === module) {
  module.exports.port = 682
  module.exports.width = 240
  module.exports.height = 160
  exports.on('screenshot', function (screenshot) {
    require('fs').writeFileSync('screenshot.jpeg', screenshot)
    process.exit(0)
  })
  exports.start()
}