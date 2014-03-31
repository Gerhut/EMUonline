var client, hellos = []

function hello(name) {
  document.getElementById('fool').setAttribute('id', '')
  document.getElementsByTagName('h1')[0].innerText = '愚人节快乐～'
  hellos.forEach( function (hello) { hello(name); } )
}