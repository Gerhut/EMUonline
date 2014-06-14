var cluster = require('cluster')
var server = require('./server')

cluster.setupMaster({
  exec: 'worker.js'
})
cluster.fork().on('message', function (data) {
  server.broadcastScreen(new Buffer(data))
})
server()
