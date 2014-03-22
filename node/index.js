var server = require('./server')
var screenshot = require('./screenshot')
var receive = screenshot.receive

server()
screenshot.on('screenshot', function (screenshot) {
  server.broadcastScreenshot(screenshot)
  setImmediate(receive)
})
receive()
