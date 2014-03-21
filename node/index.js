var BinaryServer = require('binaryjs').BinaryServer
var chat = require('./chat')
var input = require('./input')
var screenshot = require('./screenshot')

input.port = screenshot.port = 682
screenshot.width = 240
screenshot.height = 160

var server = new BinaryServer({port: 3000})

server.on('connection', function (client) {
  console.log(Object.keys(server.clients).length + ' online.')
  client.on('close', function () {
    console.log(Object.keys(server.clients).length + ' online.')
  })
  
  chat(client, function (err) {
    if (err) {
      return client.close()
    }
    initScreenshotStream(client)
    initJoypadStream(client)
  })
})

function initScreenshotStream(client) {
  client.streams.screenshot = client.createStream('screenshot')
}

function initJoypadStream(client) {
  client.createStream('joypad').on('data', function (data) {
    if ('key' in data && 'status' in data)
      input.joypad(data.key, data.status)
  })
}

screenshot.on('screenshot', function (data) {
  var stream
  for (var id in server.clients) {
    stream = server.clients[id].streams.screenshot
    stream && stream.writable && stream.write(data)
  }
})
screenshot.start()