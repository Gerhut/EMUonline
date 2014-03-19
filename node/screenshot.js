var net = require('net')
var events = require('events')
var buffer = require('buffer')

var socket = new net.Socket()
var buffers, length

function receive() {
  socket.connect(exports.port, '127.0.0.1')
  buffers = []
  length = 0
}

function gd2png(buffer, callback) {
  // TODO
  setTimeout(callback, 200, null, buffer)
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
  exports.on('screenshot', function (screenshot) {
    console.log(screenshot.length)
    process.exit(0)
  })
  exports.start()
}