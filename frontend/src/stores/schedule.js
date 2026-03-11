import { defineStore } from 'pinia'
import { usePersistedStore } from '@/stores/persisted'
import { useLogsStore } from '@/stores/logs'

export const useScheduleStore = defineStore('schedule', {
  state: () => ({
    scheduleTable: [],
    schedulePlans: [],
  }),
  actions: {
    tryApplySchedulePlans(data) {
      if (!Array.isArray(data) || data.length === 0) return false
      const first = data[0]
      if (!first || typeof first !== 'object' || !first.detail || typeof first.detail !== 'object') return false

      const logs = useLogsStore()
      this.schedulePlans = data
      this.scheduleTable = data.map((item, idx) => {
        const d = item.detail || {}
        const lessons = Array.isArray(item.resultLesson) ? item.resultLesson : []
        const summary = lessons
          .map((g) => {
            const l = Array.isArray(g.lessons) ? g.lessons[0] : null
            const name = l?.name ? String(l.name) : ''
            const no = l?.no ? String(l.no) : ''
            const t = l?.teachers ? String(l.teachers) : ''
            return [name, no, t].filter(Boolean).join(' / ')
          })
          .filter(Boolean)
          .slice(0, 6)
          .join(' | ')
        return {
          _idx: idx,
          weight: Number(d.weight || 0),
          zaobaCount: Number(d.zaobaCount || 0),
          zhouwuCount: Number(d.zhouwuCount || 0),
          zhouyiCount: Number(d.zhouyiCount || 0),
          zhoulioCount: Number(d.zhoulioCount || 0),
          zhouriCount: Number(d.zhouriCount || 0),
          summary: summary || '-',
        }
      })
      logs.pushLog('log', `收到排课结果：${this.scheduleTable.length} 条`)
      return true
    },
    buildFetchProfilesPayload() {
      const persisted = usePersistedStore()
      const config = persisted.buildScheduleBaseConfig()
      return { type: 'getProfiles', config }
    },
    buildFetchYixuanDataPayload() {
      const persisted = usePersistedStore()
      const config = persisted.buildScheduleBaseConfig()
      return { type: 'getYixuanData', config }
    },
    buildStartPayload() {
      const persisted = usePersistedStore()
      const base = persisted.buildScheduleBaseConfig()
      const lessonCodes = (persisted.scheduleInput.lessonCodes || []).map((s) => String(s).trim()).filter(Boolean)
      const yixuanData = (persisted.cache.yixuanData || []).map((s) => String(s).trim()).filter(Boolean)
      const config = {
        ...base,
        lessonCodes,
        yixuanData,
        zaoba: Boolean(persisted.schedulePrefs.zaoba),
        zhouwu: Boolean(persisted.schedulePrefs.zhouwu),
        zhouyi: Boolean(persisted.schedulePrefs.zhouyi),
        zhoulio: Boolean(persisted.schedulePrefs.zhoulio),
        zhouri: Boolean(persisted.schedulePrefs.zhouri),
      }
      persisted.persist()
      return { type: 'rowStart', config }
    },
  },
})

