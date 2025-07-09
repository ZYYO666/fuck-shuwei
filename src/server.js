const { WebSocketServer } = require('ws')
const express = require('express')
const path = require('path')

const { startMainProcess } = require('./fuck/main.js')
const { startScheduleProcess } = require('./row/main.js')



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
        ws.send(JSON.stringify({ type, data }))
        console.log(JSON.stringify({ type, data }));

      }
    },
  }


  ws.on('message', async (data) => {
    try {
      const message = JSON.parse(data)
      console.log(message);
      
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
      } else if (message.type === 'scheduleStart') {
        clients.get(clientId).status = 'running'
        ws.send(JSON.stringify({ type: 'scheduleStarted' }))
        message.config.logger = logger
        await startScheduleProcess(message.config)
      }
    } catch (error) {
      logger.sendData('error', ['消息处理错误:', error].join(' '))
      console.log(error);

    } finally {
      const client = clients.get(clientId);
      if (client) {
        client.status = 'idle';
      } else {
        console.warn(`Client with id ${clientId} not found in clients map.`);
      }
      ws.send(JSON.stringify({ type: 'fuckEnded' }))
      ws.send(JSON.stringify({ type: 'scheduleEnded' }))
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

