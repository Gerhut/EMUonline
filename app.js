var client, hellos = []

document.addEventListener('DOMContentLoaded', function () {
  var name = prompt('起名')
  hellos.forEach( function (hello) { hello(name); } )
}, false)