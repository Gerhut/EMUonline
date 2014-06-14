var client, hellos = []

function hello(name) {
  hellos.forEach( function (hello) { hello(name); } )
}