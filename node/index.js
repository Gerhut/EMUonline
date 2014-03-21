var BinaryServer = require('binaryjs').BinaryServer
var user = require('./user')
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
  
  user(client, function (err) {
    if (err) {
      return client.close()
    }
    initChatStream(client)
    initScreenshotStream(client)
    initJoypadStream(client)
  })
})

function initChatStream(client) {
  chat(client)
}

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