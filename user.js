(function () {
  var onlineUsers = {}
  var ul = document.getElementsByTagName('ul')[0]
  var chatRecord = document.getElementById('chat-record')
  var chat = document.getElementById('chat')
  var stream

  window.hellos.push(function (name) {
    chat.placeholder = name + '说'
    client = BinaryClient('ws://localhost:3000')
    client.on('open', function () {
      this.send(name, 'user').on('data', function (data) {
        if ('forEach' in data) {
          data.forEach(function (name) {
            onlineUsers[name] = true
          })
        } else if (data.isOnline === true) {
          onlineUsers[data.name] = true
          chatRecord.innerHTML = data.name + ' 上线\n' + chatRecord.innerHTML
        } else if (data.isOnline === false) {
          delete onlineUsers[data.name]
          chatRecord.innerHTML = data.name + ' 下线\n' + chatRecord.innerHTML
        }
        ul.innerHTML = Object.keys(onlineUsers).map(function (name) {
          return '<li class="list-group-item">' + name + '</li>'
        }).join('')
      })
    })
    client.on('close', function () {
      if (confirm('掉线了！刷新页面？')) {
        location.replace(location.protocol + '//' + location.host);
      }
    })
  })
}) ()