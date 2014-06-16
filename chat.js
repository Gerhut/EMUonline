(function () {
  var chatRecord = document.getElementById('chat-record')
  var form = document.getElementsByTagName('form')[0]
  var chat = document.getElementById('chat')
  
  function setStream(stream) {
    stream.on('data', function (data) {
      if (data.admin) {
        chatRecord.innerHTML = data.data + '\n' + chatRecord.innerHTML
      } else if (data.name) {
        chatRecord.innerHTML = '[' + data.name + '] ' + data.data + '\n' + chatRecord.innerHTML
      }
    })

    form.onsubmit = function () {
      if (chat.value.trim().length === 0)
        return false;
      stream.write(chat.value.trim())
      chat.value = ''
      return false;
    }
  }

  hellos.push(function () {
    client.on('stream', function (stream, meta) {
      if (meta === 'chat') {
        setStream(stream)
      }
    })
  })
}) ()
