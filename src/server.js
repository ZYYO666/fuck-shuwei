const { WebSocketServer } = require('ws')
const express = require('express')
const path = require('path')

const { startMainProcess } = require('./main.js')


const app = express()
app.use(express.static(path.join(__dirname, '../public')))

app.listen(3000, () => { })




const wss = new WebSocketServer({ port: 8080 })

const clients = new Map()



wss.on('connection', (ws) => {
  const clientId = Date.now() + Math.random().toString(36).substr(2, 9)

  const logger = {
    zyyo: (...args) => {
      if (ws.readyState === ws.OPEN) {
        ws.send(JSON.stringify({ type: 'log', data: args.join(' ') }))
      }
    },
    zyyoerror: (...args) => {
      if (ws.readyState === ws.OPEN) {
        ws.send(JSON.stringify({ type: 'error', data: args.join(' ') }))
      }
    },
    zyyogood: (...args) => {
      if (ws.readyState === ws.OPEN) {
        ws.send(JSON.stringify({ type: 'good', data: args.join(' ') }))
      }
    },
    zyyotable: (obj) => {
      if (ws.readyState === ws.OPEN) {
        ws.send(JSON.stringify({ type: 'table', data: obj }))
      }
    },
    zyyostep: (num) => {
      if (ws.readyState === ws.OPEN) {
        ws.send(JSON.stringify({ type: 'step', data: num }))
      }
    },
    cookie: (cookie) => {
      if (ws.readyState === ws.OPEN) {
        ws.send(JSON.stringify({ type: 'cookie', data: cookie }))
      }
    },
    profileId: (profileId) => {
      if (ws.readyState === ws.OPEN) {
        ws.send(JSON.stringify({ type: 'profileId', data: profileId }))
      }
    },
    lessonDatas: (lessonDatas) => {
      if (ws.readyState === ws.OPEN) {
        ws.send(JSON.stringify({ type: 'lessonDatas', data: lessonDatas }))
      }
    },
  }

  clients.set(clientId, {
    ws,
    status: 'idle',
  })

  ws.on('message', async (data) => {
    try {
      const message = JSON.parse(data)

      if (message.type === 'start') {
        logger.zyyogood('收到启动请求')
        if (clients.get(clientId).status === 'running') {
          logger.zyyogood('已经有运行的实例了, 请稍后再试')

        } else {

          clients.get(clientId).status = 'running'

          ws.send(JSON.stringify({ type: 'processStart' }))

          message.config.logger = logger

          try {
            await startMainProcess(message.config)
          } finally {
            clients.get(clientId).status = 'idle'
            ws.send(JSON.stringify({ type: 'processEnd' }))
          }
        }
      }
    } catch (error) {
      logger.zyyoerror('消息处理错误:', error.message)
      ws.send(
        JSON.stringify({
          type: 'error',
          data: `处理消息失败: ${error.message}`,
        }),
      )
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








const statusMap = {
  idle: "空闲",
  running: "运行中"
};

function formatClients(clientsMap) {
  return Array.from(clientsMap.entries()).map(([key, client]) => {
    return {
      "客户端ID": key,
      "连接状态": statusMap[client.status] || client.status
    };
  });
}

function updateTable() {
  console.clear();


  const formattedClients = formatClients(clients);


  console.log(`WebSocket连接: ws://localhost:8080`)
  console.log(`静态文件服务器已启动: http://localhost:${3000}`)
  console.table(formattedClients);
}

setInterval(() => {
  updateTable();
}, 1000);


updateTable();

