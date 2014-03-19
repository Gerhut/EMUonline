var server = require('socket.io').listen(80)
var input = require('./input')
var screenshot = require('./screenshot')

input.port = screenshot.port = 682

server.sockets.on('connection', function (socket) {
  socket.on('joypad', function (data) {
    console.log(data)
    if (typeof data.key === 'string'
      && typeof data.status === 'number') {
      input.sendJoypadKey(data.key, data.status)
    }
  })
})