(function () {
  var name = window.prompt('name?')
  var onlineUsers = {}
  var ul = document.getElementsByTagName('ul')[0]
  var pre = document.getElementsByTagName('pre')[0]
  var stream

  client = BinaryClient('ws://link.gerhut.me:3000')
  client.on('open', function () {
    this.send(name, 'user').on('data', function (data) {
      if ('forEach' in data) {
        data.forEach(function (name) {
          onlineUsers[name] = true
        })
      } else if (data.isOnline === true) {
        onlineUsers[data.name] = true
        pre.innerHTML = data.name + ' is online.\n' + pre.innerHTML
      } else if (data.isOnline === false) {
        delete onlineUsers[data.name]
        pre.innerHTML = data.name + ' is offline.\n' + pre.innerHTML
      }
      ul.innerHTML = Object.keys(onlineUsers).map(function (name) {
        return '<li>' + name + '</li>'
      }).join('')
    })
  })
  client.on('close', function () {
    alert('Disconnected:(. Please refresh.')
  })
}) ()