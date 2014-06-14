var client, hellos = []

function hello(data) {
  hellos.forEach( function (hello) { hello(data); } )
}