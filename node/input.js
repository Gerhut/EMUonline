var dgram = require('dgram')
var socket = dgram.createSocket('udp4')

function sendInput(key, status, port, callback) {
  var message = new Buffer(['joypad', key, status].join(' '))
  socket.send(message, 0, message.length, port, '127.0.0.1', callback)
}

if (require.main === module) {
  sendInput(process.argv[2] || 'A', process.argv[3] || 1, 682, function () {
    console.log('key sent')
    process.exit(0)
  })
}