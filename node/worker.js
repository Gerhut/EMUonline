var screen = require('./screen')

screen.on('screen', function (data) {
  process.send(data)
  setImmediate(screen.receive)
})
screen.receive()
