(function () {
  var pre = document.getElementsByTagName('pre')[0]
  var form = document.getElementsByTagName('form')[0]
  var input = document.getElementsByTagName('input')[0]
  
  function setStream(stream) {
    stream.on('data', function (data) {
      if (data.admin) {
        pre.innerHTML = data.data + '\n' + pre.innerHTML
      } else if (data.name) {
        pre.innerHTML = '[' + data.name + '] ' + data.data + '\n' + pre.innerHTML
      }
    })

    form.onsubmit = function () {
      stream.write(input.value)
      input.value = ''
      return false;
    }
  }

  client.on('stream', function (stream, meta) {
    if (meta === 'chat') {
      setStream(stream)
    }
  })
}) ()