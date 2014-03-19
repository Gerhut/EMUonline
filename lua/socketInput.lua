require 'socket'

local udp = assert(socket.udp())
local allow = {}
local buttons = joypad.get(0)

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

function module.buttons()
  pcall(function ()
    local data, msg = udp:receive()
    if not data then
      if msg ~= 'timeout' then
        print("Error:" .. msg)
      end
      return
    end
    _, _, key, status = string.find(data, "^joypad (%a+) ([01])$")
    if not allow[key] or not status then
      return
    end
    status = (status == '1')
    buttons[key] = status
    return
  end)
  return buttons
end

return module
