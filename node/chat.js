var input = require('./input')
var screenshot = require('./screenshot')

var userClient = {}

function chat(client, callback) {  
  var timeout = setTimeout(function () {
    callback(new Error('Timeout.'))
  }, 5000);

  // Wait for chat stream
  client.once('stream', function (stream, meta) {
    if (meta !== 'chat')
      return callback(new Error('Invalid Stream'))

    // Wait for name
    stream.once('data', function (name) {
      clearTimeout(timeout)
      applyChatStream(client, stream, name.toString())
      callback()
    }
  })
}

function applyChatStream(client, stream, name) {
  if (typeof client.user === 'undefined')
    client.user = {}
  client.user.name = name
  client.streams.chat = stream
  
  if (name in userClient) {
    userClient[name].close()
  }
  
  userClient[name] = client
  
  client.on('close', function () {
    if (userClient[name] === this) {
      delete userClient[name]
    }
  });
  
  stream.on('data', function (data) {
    broadcast('[' + name + '] ' + data.toString())
    for (var name in userClient) {
      userClient[name].streams.chat.write(data)
    }
  })  
}

module.exports = chat
