var server = require('./server')
var screen = require('./screen')
var receive = screen.receive

server()
screen.on('screen', function (screen) {
  server.broadcastScreen(screen)
  setImmediate(receive)
})
receive()
