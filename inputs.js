(function (undefined) {
  var data = { 'name': 'debug' }
  var inputRecord = document.getElementById('input-record')
  var keyNames = {
    up: '上',
    down: '下',
    left: '左',
    right: '右',
    start: '开始',
    A: 'Ａ',
    B: 'Ｂ'
  }
  var downKey;
  var availableKeyCount = 7;

  var keys = Object.keys || function (obj) {
    var keys = []
    for (var key in obj)
      keys.push(key)
    return keys
  }

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

    var isTouch = ('ontouchstart' in document)
    Array.prototype.forEach.call(document.getElementsByTagName('button'), function (button) {
      if (typeof button.dataset.key === 'undefined') return;
      if (! (button.dataset.key in data.keys)) {
        button.disabled = true;
        button.innerHTML = '<span class="glyphicon glyphicon-remove"></span>';
        button.classList.add('btn-danger')
        return
      }
      button.classList.add('btn-primary')
      button.addEventListener(isTouch ? 'touchstart' : 'mousedown', function () {
        writeDown(button.dataset.key)
      }, false)
      button.addEventListener(isTouch ? 'touchend' : 'mouseup', writeUp, false)
      if (isTouch) {
        button.addEventListener('touchend', writeUp, false)
        button.addEventListener('touchleave', writeUp, false)
        button.addEventListener('touchcancel', writeUp, false)
      } else {
        button.addEventListener('mouseout', function (event) {
          event.which && writeUp()
        }, false)
      }
    });
  }

  hellos.push(function (d) {
    var allKeys = keys(keyNames)
    var id = d.uid

    data.name = d.uname
    data.keys = {}

    for ( var i = 0; i < availableKeyCount; i++ ) {
      var keyId = id % allKeys.length
      id = Math.floor(id / allKeys.length)
      data.keys[allKeys[keyId]] = true
      allKeys.splice(keyId, 1)
    }

    client.on('stream', function (stream, meta){
      if (meta === 'joypad') {
        setStream(stream)
      }
    });
  })
})()