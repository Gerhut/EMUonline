var BinaryServer = require('binaryjs').BinaryServer
var user = require('./user')
var chat = require('./chat')
var input = require('./input')

input.port = 682

function server() {
  new BinaryServer({port: 3000}).on('connection', function (client) {
    user(client, function (err) {
      if (err) {
        console.log(err)
        return client.close()
      }
      initChatStream(client)
      initScreenStream(client)
      initJoypadStream(client)
    })
  })
  console.log('Server started.')
}

function initChatStream(client) {
  chat(client)
}

function initScreenStream(client) {
  client.streams.screen = client.createStream('screen')
}

function initJoypadStream(client) {
  client.streams.joypad = client.createStream('joypad').on('data', function (data) {
    if (!('name' in data))
      return
    if (data.status === 1) { // key down
      if (!('key' in data)) // no specific key
        return
      if ('key' in client.userdata) // already a key down
        return
      client.userdata.key = data.key
      input.joypad(data.key, 1)
      user.broadcast('joypad', {
        name: data.name,
        key: data.key,
        status: 1
      })
    } else if (data.status === 0) { // key up
      if (!('key' in client.userdata)) // no key down
        return
      var key = client.userdata.key
      delete client.userdata.key
      input.joypad(key, 0)
      user.broadcast('joypad', {
        name: data.name,
        key: key,
        status: 0
      })
    }
  })
}

function broadcastScreen(screen) {
  user.broadcast('screen', screen)
}

module.exports = server
module.exports.broadcastScreen = broadcastScreen
