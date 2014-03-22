var client, hellos = []

document.addEventListener('DOMContentLoaded', function () {
  var name = 'debug'
  hellos.forEach( function (hello) { hello(name); } )
}, false)