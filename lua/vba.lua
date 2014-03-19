local socketInput = require('socketInput')

socketInput.allow(
  'up', 'down', 'left', 'right',
  'select', 'start',
  'A', 'B', 'R', 'L')
socketInput.bind(682)

vba.registerbefore(function ()
  joypad.set(1, socketInput.buttons())
end)
