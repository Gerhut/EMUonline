local socketInput = require('socketInput')
local socketScreenshot = require('socketScreenshot')
local port = 682

socketInput.allow(
  'up', 'down', 'left', 'right',
  'select', 'start',
  'A', 'B', 'R', 'L')
socketInput.bind(port)
socketScreenshot.bind(port)

vba.registerbefore(socketInput.work)
vba.registerafter(socketScreenshot.work)
