local emuInput = require('emuInput')

emuInput.allow(
  'up', 'down', 'left', 'right',
  'select', 'start',
  'A', 'B', 'R', 'L')
emuInput.bind(682)

gui.register(function ()
  emuInput.work()
end)