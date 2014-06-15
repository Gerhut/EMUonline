var net = require('net')
var events = require('events')
var jpeg = require('jpeg-js')
var Buffer = require('buffer').Buffer
var options = require('./screen.json')

var StreamToBuffer = require('./StreamToBuffer')

var socket = new net.Socket()
var buffers, length

function receive() {
  socket.connect(options.port, '127.0.0.1')
  StreamToBuffer(socket, dataReceived)
  socket.end()
  return this
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
  exports.emit('screen', pic.data)

  options.interval >= 0 && setTimeout(receive, options.interval)
}

exports = module.exports = new events.EventEmitter()

exports.receive = receive

if (require.main === module) {
  exports.on('screen', function (screen) {
    require('fs').writeFileSync('screen.jpeg', screen)
    process.exit(0)
  })
  exports.receive()
}