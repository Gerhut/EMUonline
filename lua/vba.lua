local socketInput = require('socketInput')
local socketScreenshot = require('socketScreenshot')

socketInput.allow(
  'up', 'down', 'left', 'right',
  'select', 'start',
  'A', 'B', 'R', 'L')
socketInput.bind(682)

vba.registerbefore(function ()
  socketInput.work()
  socketScreenshot.work()
end)
