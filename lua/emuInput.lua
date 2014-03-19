require 'socket'

local udp = assert(socket.udp())
local allow = {}
local buttons = {}

module = {}

function module.allow( ... )
  for _, v in ipairs({...}) do
    allow[v] = true
  end
end

function module.bind(port)
  assert(udp:setsockname('127.0.0.1', port))
  assert(udp:settimeout(0))
end

function module.work()
  pcall(function ()
    local data, msg = udp:receive()
    if not data then
      print("Error:" .. msg)
      return
    end
    print(data)
    _, _, key, status = string.find(data, "^joypad (%a+) ([01])$")
    print(key, status)
    if not allow[key] or not status then
      return
    end
    status = (status == '1' and 1 or nil)
    buttons[key] = status
    return
  end)
end

gui.register(function ()
  joypad.set(0, buttons)
end)

return module
