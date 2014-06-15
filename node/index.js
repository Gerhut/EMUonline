var server = require('./server')
var screen = require('./screen')

server()
screen.receive().on('screen', function (screen) {
  server.broadcastScreen(screen)
})
