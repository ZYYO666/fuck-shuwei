import { defineStore } from 'pinia'
import axios from 'axios'
import { safeJsonParse, toTimeLabel } from '@/shared/utils'
import { useLogsStore } from '@/stores/logs'
import { usePersistedStore } from '@/stores/persisted'
import { useCourseStore } from '@/stores/course'
import { useScheduleStore } from '@/stores/schedule'

export const useWsStore = defineStore('ws', {
  state: () => ({
    ws: null,
    wsStatus: 'idle',
    processing: false,
    lastMessageAt: 0,
  }),
  getters: {
    wsUrl() {
      const v = import.meta.env.VITE_WS_URL
      if (typeof v === 'string' && v.trim()) return v.trim()
      return `ws://${window.location.hostname}:8080`
    },
    backendBaseUrl() {
      const v = import.meta.env.VITE_BACKEND_URL
      if (typeof v === 'string' && v.trim()) return v.trim()
      return `http://${window.location.hostname}:3000`
    },
    wsStatusLabel() {
      if (this.wsStatus === 'open') return '已连接'
      if (this.wsStatus === 'connecting') return '连接中...'
      if (this.wsStatus === 'error') return '连接出错'
      return '未连接'
    },
    lastMessageAtLabel() {
      return this.lastMessageAt ? toTimeLabel(this.lastMessageAt) : '-'
    },
  },
  actions: {
    ensureWs() {
      const logs = useLogsStore()
      if (this.ws && (this.ws.readyState === WebSocket.OPEN || this.ws.readyState === WebSocket.CONNECTING)) {
        return
      }
      this.wsStatus = 'connecting'
      try {
        const ws = new WebSocket(this.wsUrl)
        this.ws = ws
        ws.addEventListener('open', () => {
          this.wsStatus = 'open'
          logs.pushLog('good', 'WebSocket 已连接')
        })
        ws.addEventListener('close', () => {
          this.wsStatus = 'idle'
          logs.pushLog('error', 'WebSocket 已断开')
        })
        ws.addEventListener('error', () => {
          this.wsStatus = 'error'
          logs.pushLog('error', 'WebSocket 连接失败')
        })
        ws.addEventListener('message', (ev) => {
          this.lastMessageAt = Date.now()
          this.handleWsMessage(ev.data)
        })
      } catch (e) {
        this.wsStatus = 'error'
        logs.pushLog('error', `WebSocket 初始化失败：${e?.message || String(e)}`)
      }
    },
    sendWs(payload) {
      const logs = useLogsStore()
      this.ensureWs()
      if (!this.ws || this.ws.readyState !== WebSocket.OPEN) {
        logs.pushLog('error', 'WebSocket 未连接，无法发送')
        return
      }
      this.ws.send(JSON.stringify(payload))
    },
    handleWsMessage(raw) {
      const logs = useLogsStore()
      const persisted = usePersistedStore()
      const course = useCourseStore()
      const schedule = useScheduleStore()

      let msg = null
      try {
        msg = JSON.parse(raw)
      } catch {
        logs.pushLog('log', String(raw))
        return
      }

      const type = msg?.type
      const data = msg?.data

      if (type === 'log' || type === 'good' || type === 'error') {
        logs.pushLog(type, data)
        return
      }

      if (type === 'cache') {
        const key = data?.key
        const value = data?.value
        persisted.applyCache(key, value)
        logs.pushLog('cache', `${key} 已更新`)
        return
      }

      if (type === 'table') {
        if (schedule.tryApplySchedulePlans(data)) return
        course.applyCourseTable(data)
        return
      }

      if (type === 'fuckStarted' || type === 'rowStarted' || type === 'profilesStarted' || type === 'yixuanDataStarted') {
        this.processing = true
        logs.pushLog('log', '任务开始执行')
        return
      }

      if (type === 'fuckEnded') {
        this.processing = false
        logs.pushLog('good', '选课流程结束')
        if (persisted.courseLoop && course.hasPendingCourse()) {
          const payload = course.buildStartPayload()
          window.setTimeout(() => {
            logs.pushLog('log', '循环模式：再次执行选课')
            this.sendWs(payload)
          }, 650)
        }
        return
      }

      if (type === 'scheduleEnded') {
        this.processing = false
        logs.pushLog('good', '排课流程结束')
        return
      }

      if (type === 'profilesEnded') {
        this.processing = false
        logs.pushLog('good', '轮次获取结束')
        return
      }

      if (type === 'yixuanDataEnded') {
        this.processing = false
        logs.pushLog('good', '已选课程获取结束')
        return
      }

      logs.pushLog('log', safeJsonParse(JSON.stringify(msg), String(msg)))
    },
    async healthCheck() {
      const logs = useLogsStore()
      try {
        const res = await axios.get(this.backendBaseUrl, { timeout: 2000 })
        if (res.status >= 200 && res.status < 500) {
          logs.pushLog('good', `后端探活成功：${res.status}`)
        } else {
          logs.pushLog('error', `后端探活异常：${res.status}`)
        }
      } catch (e) {
        logs.pushLog('error', `后端探活失败：${e?.message || String(e)}`)
      }
    },
  },
})
