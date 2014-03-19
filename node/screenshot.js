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

socket.on('data', function (data) {
  buffers.push(data)
  length += data.length
})

socket.on('close', function () {
  exports.emit('screenshot', buffer.Buffer.concat(buffers, length))
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