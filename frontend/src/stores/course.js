import { defineStore } from 'pinia'
import { usePersistedStore } from '@/stores/persisted'

export const useCourseStore = defineStore('course', {
  state: () => ({
    courseTable: [],
  }),
  actions: {
    clearCourseResults() {
      this.courseTable = []
    },
    applyCourseTable(data) {
      if (!Array.isArray(data)) return
      this.courseTable = data
    },
    hasPendingCourse() {
      if (!Array.isArray(this.courseTable) || this.courseTable.length === 0) return false
      return this.courseTable.some((r) => {
        const v = r?.['状态']
        if (v === 'success' || v === 'notfound') return false
        return true
      })
    },
    buildFetchProfilesPayload() {
      const persisted = usePersistedStore()
      const config = persisted.buildCourseBaseConfig()
      return { type: 'getProfiles', config }
    },
    buildStartPayload() {
      const persisted = usePersistedStore()
      const base = persisted.buildCourseBaseConfig()
      const lessons = (persisted.form.lessonsText || [])
        .map((s) => String(s).trim())
        .filter(Boolean)
        .map((value) => ({ value }))
      const config = {
        ...base,
        selectionModel: persisted.form.selectionModel || '2',
        lessons,
      }
      persisted.persist()
      return { type: 'fuckStart', config }
    },
  },
})

