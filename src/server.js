const { WebSocketServer } = require('ws')
const express = require('express')
const path = require('path')

const { startMainProcess } = require('./fuck/main.js')
const { startScheduleProcess } = require('./row/main.js')
const { startBaseProcess } = require('./base/main.js')



const app = express()
app.use(express.static(path.join(__dirname, '../public')))
app.listen(3000, () => { })




const wss = new WebSocketServer({ port: 8080 })
const clients = new Map()


wss.on('connection', (ws) => {
  const clientId = Date.now() + Math.random().toString(36).substr(2, 9)
  clients.set(clientId, {
    ws,
    status: 'idle',
  })

  const logger = {
    sendData: (type, data) => {
      if (ws.readyState === ws.OPEN) {
        try {
          // 安全的JSON序列化，避免循环引用
          const safeData = typeof data === 'object' && data !== null ?
            JSON.parse(JSON.stringify(data, (key, value) => {
              // 过滤掉可能导致循环引用的属性
              if (key === 'parent' || key === 'children' || key === 'root' || key === '_' || key === 'cheerio') {
                return undefined;
              }
              // 如果是函数或DOM节点，转换为字符串描述
              if (typeof value === 'function') {
                return '[Function]';
              }
              if (value && typeof value === 'object' && value.nodeType) {
                return '[DOM Node]';
              }
              return value;
            })) : data;

          const message = { type, data: safeData };
          ws.send(JSON.stringify(message));
          // console.log(JSON.stringify(message));
        } catch (error) {
          // 如果仍然失败，发送错误信息
          const fallbackMessage = { type, data: `[序列化失败: ${error.message}]` };
          ws.send(JSON.stringify(fallbackMessage));
          // console.log(JSON.stringify(fallbackMessage));
        }
      }
    },
  }


  ws.on('message', async (data) => {
    let message = null;
    try {
      message = JSON.parse(data)
      logger.sendData('good', '收到启动请求')
      if (clients.get(clientId).status === 'running') {
        logger.sendData('good', '已经有运行的实例了, 请稍后再试')
        return
      }
      if (message.type === 'fuckStart') {
        clients.get(clientId).status = 'running'
        ws.send(JSON.stringify({ type: 'fuckStarted' }))
        message.config.logger = logger
        await startMainProcess(message.config)
      } else if (message.type === 'rowStart') {
        clients.get(clientId).status = 'running'
        ws.send(JSON.stringify({ type: 'rowStarted' }))
        message.config.logger = logger
        await startScheduleProcess(message.config)
      } else if (message.type === 'getProfiles') {
        // 独立的轮次数据获取功能，直接调用base/main
        clients.get(clientId).status = 'running'
        ws.send(JSON.stringify({ type: 'profilesStarted' }))
        message.config.logger = logger
        await startBaseProcess(message.config)
      }
    } catch (error) {
      logger.sendData('error', `消息处理错误: ${error.message || error.toString()}`)
      console.log(error);

    } finally {
      const client = clients.get(clientId);
      if (client) {
        client.status = 'idle';
      } else {
        console.warn(`Client with id ${clientId} not found in clients map.`);
      }
      
      // 根据消息类型发送对应的结束消息
      if (message && message.type === 'fuckStart') {
        ws.send(JSON.stringify({ type: 'fuckEnded' }))
      } else if (message && message.type === 'rowStart') {
        ws.send(JSON.stringify({ type: 'scheduleEnded' }))
      } else if (message && message.type === 'getProfiles') {
        ws.send(JSON.stringify({ type: 'profilesEnded' }))
      }
    }
  })

  ws.on('close', () => {
    clients.delete(clientId)
  })

  ws.on('error', (error) => {
    clients.delete(clientId)
  })
})

wss.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.clear();
    console.error(`已有实例在运行。`)
    process.exit(1)
  } else {
    console.error('WebSocket 启动错误:', err)
    process.exit(1)
  }

})









async function updateTable() {
  console.clear();
  console.log(`WebSocket端口: 8080`)
  console.log(`静态服务器: http://localhost:${3000}`)
  console.log(`浏览器打开上面的链接`)
  console.log(`不要关闭当前窗口`)
  const { default: open } = await import('open');
  open(`http://localhost:${3000}`);
}

updateTable();

