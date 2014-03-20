var BinaryServer = require('binaryjs').BinaryServer
var input = require('./input')
var screenshot = require('./screenshot')

input.port = screenshot.port = 682
screenshot.width = 240
screenshot.height = 160

var server = new BinaryServer({port: 3000})

server.on('connection', function (client) {
  console.log('client connected.')
  console.log(server._server.clients.length + ' online.')
  client.on('close', function () {
    console.log('client disconnected.')
    console.log(server._server.clients.length + ' online.')
  })

  client.on('stream', function (stream, meta) {
    stream.on('data', function (data) {
      input.joypad(data.key, data.status)
    })
  })
})


screenshot.on('screenshot', function (data) {
  for (var id in server.clients) {
    server.clients[id].send(data, 'screenshot')
  }
})
screenshot.start()