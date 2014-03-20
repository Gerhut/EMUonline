require 'socket'

local tcp = assert(socket.tcp())

module = {}

function module.bind(port)
  assert(tcp:bind("127.0.0.1", port))
  assert(tcp:settimeout(0))
  assert(tcp:listen(1))
end

function module.work(port)
  pcall(function ()
    local client = tcp:accept()
    if client then
      client:send(gui.gdscreenshot())
      client:shutdown()
    end
  end)
end

return module
