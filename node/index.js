var BinaryServer = require('binaryjs').BinaryServer
var input = require('./input')
var screenshot = require('./screenshot')

input.port = screenshot.port = 682
screenshot.width = 240
screenshot.height = 160

var server = new BinaryServer({port: 80})

server.on('connection', function (client) {
  console.log('client connected.')
  client.on('close', function () {
    console.log('client disconnected.')
  })
})

screenshot.on('screenshot', function (data) {
  for (var id in server.clients) {
    server.clients[id].send(data, 'screenshot')
  }
})
screenshot.start()