var screenshot = require('./screenshot')

screenshot.on('screenshot', function (data) {
  process.send(data)
  setImmediate(screenshot.receive)
})
screenshot.receive()
