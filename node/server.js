var BinaryServer = require('binaryjs').BinaryServer
var user = require('./user')
var chat = require('./chat')
var input = require('./input')

input.port = 682

function server() {
  new BinaryServer({port: 3000}).on('connection', function (client) {
    user(client, function (err) {
      if (err) {
        return client.close()
      }
      initChatStream(client)
      initScreenshotStream(client)
      i=0;
      initJoypadStream(client)
    })
  })
  console.log('Server started.')
}

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

function broadcastScreenshot(screenshot) {
  user.broadcast('screenshot', screenshot)
}

module.exports = server
module.exports.broadcastScreenshot = broadcastScreenshot
