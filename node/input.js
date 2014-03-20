var dgram = require('dgram')
var socket = dgram.createSocket('udp4')

function joypad(key, status, callback) {
  var message = new Buffer(['joypad', key, status].join(' '))
  socket.send(message, 0, message.length, module.exports.port, '127.0.0.1', callback)
}

exports = module.exports = {
  joypad: joypad
}

if (require.main === module) {
  module.exports.port = 682
  joypad(process.argv[2] || 'A', process.argv[3] || 1, function () {
    process.exit(0)
  })
}