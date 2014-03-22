var net = require('net')
var events = require('events')
var jpeg = require('jpeg-js')
var Buffer = require('buffer').Buffer
var options = require('./screenshot.json')

var StreamToBuffer = require('./StreamToBuffer')

var socket = new net.Socket()
var buffers, length

function receive() {
  socket.connect(options.port, '127.0.0.1')
  StreamToBuffer(socket, dataReceived)
  socket.end()
}

function dataReceived(err, buffer) {
  if (err)
    exports.emit('error', err)
  else
    setImmediate(data2jpeg, buffer)
}

function data2jpeg(buffer) {
  var pixels = Buffer.concat([
    buffer.slice(12),
    new Buffer(1)
  ])
  var pic = {
    data: pixels,
    width: options.width,
    height: options.height
  }
  pic = jpeg.encode(pic, options.quality)
  exports.emit('screenshot', pic.data)
}

exports = module.exports = new events.EventEmitter()

exports.receive = receive

if (require.main === module) {
  exports.on('screenshot', function (screenshot) {
    require('fs').writeFileSync('screenshot.jpeg', screenshot)
    process.exit(0)
  })
  exports.start()
}