var dgram = require('dgram')
var socket = dgram.createSocket('udp4')
var options = require('./input.json')

function joypad(key, status, callback) {
  if (!(key in options.key.allows)) return
  var message = new Buffer(['joypad', key, status].join(' '))
  socket.send(message, 0, message.length, options.port, '127.0.0.1', callback)
}

exports = module.exports = {
  joypad: joypad
}

if (require.main === module) {
  joypad(process.argv[2] || 'A', process.argv[3] || 1, function () {
    process.exit(0)
  })
}