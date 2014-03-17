EMUonline
=========

在线多人操作支持Lua编程的模拟器。

服务器结构
----------

- 前端WebSocket请求到Nginx
- Nginx反向代理到多进程node
- node用Socket连接到Lua环境
- Lua操作模拟器

输入接口
----------

### Nginx端到node端

- `GET /joypad`

数据格式

```json
{
  "client": "{String} 客户标识",
    "name": "{String} 键名",
    "down": "{Boolean} 是否按下"
}
```

### node端到Lua端

- `joypad <name> <down>`

屏幕接口
--------

### Nginx端到node端

- `GET /screen`

### node端到Lua端

建立连接后Lua端主动向node端发送屏幕。
