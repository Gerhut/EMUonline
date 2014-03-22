(function (undefined) {
  var data = { 'name': 'debug' }
  var inputRecord = document.getElementById('input-record')
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
  var downKey;

  function setStream(stream) {
    function writeDown (key) {
      downKey = key
      data.key = key
      data.status = 1
      stream.write(data)
    }

    function writeUp () {
      if (!downKey)
        return;
      downKey = undefined
      delete data.key
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
        writeUp()
      }, false)
      button.addEventListener('mouseout', function (event) {
        event.which && writeUp()
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