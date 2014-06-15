var options = require('./user.json')
var userClient = {}

function user(client, callback) {
  var timeout = setTimeout(function () {
    callback(new Error('Timeout.'))
  }, 5000);

  // Wait for chat stream
  client.once('stream', function (stream, meta) {
    if (meta !== 'user')
      return callback(new Error('Invalid Stream'))

    // Wait for name
    stream.once('data', function (data) {
      clearTimeout(timeout)
      login(data.toString(), this)
    })
  })
  
  function login(name, stream) {
    client.userdata = {name: name}
    client.streams.user = stream
    if (name in userClient) { // user is already login, disconnect previous one.
      userClient[name].on('close', applyUser).close()
    } else {
      applyUser()
    }
  }
  
  function applyUser() {
    var name = client.userdata.name
    var onlineNum = Object.keys(userClient).length

    if (onlineNum >= options.onlineLimit && !(options.admins[name])) {
      return callback(new Error('Online Limit.'))
    }

    userClient[name] = client
    broadcast('user', {
      name: name,
      isOnline: true
    })
    client.on('close', function () {
      delete userClient[name]
      broadcast('user', {
        name: name,
        isOnline: false
      })
    console.log(name, 'is offline', Date())
    })
    client.streams.user.write(Object.keys(userClient))
    callback()
    console.log(name, 'is online', Date())
  }
}

function broadcast(id, data) {
  for (var user in userClient) {
    var stream = userClient[user].streams[id]
    stream && stream.writable && stream.write(data)
  }
}

module.exports = user
module.exports.broadcast = broadcast
