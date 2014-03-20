var Buffer = require('buffer').Buffer

module.exports = function (source, callback) {
  var buffers = []
  var totalLength = 0

  function onData(chunk) {
    buffers.push(chunk)
    totalLength += chunk.length
  }

  function onError(err) {
    callback(err, totalLength === 0 ? null
      : Buffer.concat(buffers, totalLength))
  }

  function onEnd() {
    source.removeListener('data', onData)
          .removeListener('error', onError)
          .removeListener('end', onEnd)
    callback(null, Buffer.concat(buffers, totalLength))
  }

  source.on('data', onData)
        .on('error', onError)
        .on('end', onEnd)
}
