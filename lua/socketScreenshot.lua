require 'socket'

local tcp = assert(socket.tcp())

module = {}

function module.bind(port)
  assert(server:bind("127.0.0.1", port))
  assert(server:settimeout(0))
  assert(server:listen(1))
end

function module.work(port)
  pcall(function ()
    local client = server:accept()
    if client then
      client:send(gui.gdscreenshot())
      client:close()
    end
  end)
end

return module
