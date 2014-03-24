var client, hellos = []

function hello(name) {
  showPopPublish(config)
  hellos.forEach( function (hello) { hello(name); } )
}