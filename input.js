(function () {
  var data = { 'name': 'debug' }
  var inputRecord = document.getElementsByTagName('input-record')[0]
  var keyNames = {
    up: '上',
    down: '下',
    left: '左',
    right: '右',
    start: '开始',
    select: '选择',
    A: 'Ａ',
    B: 'Ｂ',
    L: 'Ｌ',
    R: 'Ｒ',
  }

  function setStream(stream) {
    function writeDown (key) {
      data.key = key
      data.status = 1
      stream.write(data)
    }

    function writeUp (key) {
      data.key = key
      data.status = 0
      stream.write(data)
    }

    stream.on('data', function (data) {
      var name = keyNames[data.key]
      if (!name) return;
      inputRecord.innerHTML = data.name + (data.status ? '按下[' : '抬起[') + name + ']\n' + inputRecord.innerHTML
    })

    Array.prototype.forEach.call(document.getElementsByTagName('button'), function (button) {
      button.addEventListener('mousedown', function () {
        writeDown(button.dataset.key)
      }, false)
      button.addEventListener('mouseup', function () {
        writeUp(button.dataset.key)
      }, false)
      button.addEventListener('mouseout', function (event) {
        event.which && writeUp(button.dataset.key)
      }, false)
    });
  }

  hellos.push(function (name) {
    data.name = name

    client.on('stream', function (stream, meta){
      if (meta === 'joypad') {
        setStream(stream)
      }
    });
  })
})()