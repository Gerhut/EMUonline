var user = require('./user')

function chat(client) {
  var name = client.userdata.name
  var stream = client.createStream('chat')
  client.streams.chat = stream
  stream.on('data', function (data) {
    user.broadcast('chat', {
      name: client.userdata.name,
      data: data
    })
  })
}

module.exports = chat
