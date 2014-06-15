var screen = require('./screen')

screen.receive().on('screen', function (data) {
  process.send(data)
})
