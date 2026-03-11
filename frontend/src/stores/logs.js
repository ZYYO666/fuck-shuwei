import { defineStore } from 'pinia'
import { nowId, safeJsonParse, toTimeLabel } from '@/shared/utils'

export const useLogsStore = defineStore('logs', {
  state: () => ({
    logs: [],
  }),
  actions: {
    clearLogs() {
      this.logs = []
    },
    pushLog(level, message) {
      const t = Date.now()
      this.logs.unshift({
        id: nowId(),
        level,
        message: typeof message === 'string' ? message : safeJsonParse(JSON.stringify(message), String(message)),
        time: t,
        timeLabel: toTimeLabel(t),
      })
      if (this.logs.length > 600) this.logs.length = 600
    },
  },
})

