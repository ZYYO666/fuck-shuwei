import { defineStore } from 'pinia'
import { markRaw, toRaw } from 'vue'
import {
  loadPersistedState,
  normalizeCacheFromStorage,
  normalizeFormFromStorage,
  savePersistedState,
} from '@/shared/persist'
import { safeJsonParse } from '@/shared/utils'

function rawLessonCache(value) {
  return markRaw(value && typeof value === 'object' ? value : {})
}

export const usePersistedStore = defineStore('persisted', {
  state: () => ({
    _hydrating: false,
    _autoSaveStarted: false,
    _persistTimer: null,
    courseLoop: false,
    form: normalizeFormFromStorage({}),
    cache: normalizeCacheFromStorage({}),
    scheduleInput: {
      lessonCodes: [],
    },
    schedulePrefs: {
      zaoba: true,
      zhouwu: false,
      zhouyi: false,
      zhoulio: false,
      zhouri: false,
    },
  }),
  getters: {
    lessonCacheSize() {
      try {
        return JSON.stringify(this.cache.lessonJSONsCache || {}).length
      } catch {
        return 0
      }
    },
  },
  actions: {
    hydrate() {
      this._hydrating = true
      const raw = loadPersistedState()
      this.form = normalizeFormFromStorage(raw.form)
      this.cache = normalizeCacheFromStorage(raw.cache)
      this.cache.lessonJSONsCache = rawLessonCache(this.cache.lessonJSONsCache)
      this.courseLoop = Boolean(raw.courseLoop)
      this.scheduleInput = {
        lessonCodes: Array.isArray(raw.scheduleInput?.lessonCodes)
          ? raw.scheduleInput.lessonCodes.map((s) => String(s))
          : [],
      }
      if (
        (!Array.isArray(this.cache.yixuanData) || this.cache.yixuanData.length === 0) &&
        Array.isArray(raw.scheduleInput?.yixuanData) &&
        raw.scheduleInput.yixuanData.length > 0
      ) {
        this.cache.yixuanData = raw.scheduleInput.yixuanData.map((s) => String(s)).filter(Boolean)
      }
      this.schedulePrefs = {
        zaoba: raw.schedulePrefs?.zaoba !== false,
        zhouwu: Boolean(raw.schedulePrefs?.zhouwu),
        zhouyi: Boolean(raw.schedulePrefs?.zhouyi),
        zhoulio: Boolean(raw.schedulePrefs?.zhoulio),
        zhouri: Boolean(raw.schedulePrefs?.zhouri),
      }
      this._hydrating = false
    },
    persist() {
      savePersistedState({
        form: this.form,
        cache: {
          ...this.cache,
          lessonJSONsCache: toRaw(this.cache.lessonJSONsCache || {}),
        },
        courseLoop: this.courseLoop,
        scheduleInput: {
          lessonCodes: this.scheduleInput.lessonCodes,
        },
        schedulePrefs: this.schedulePrefs,
      })
    },
    startAutoSave() {
      if (this._autoSaveStarted) return
      this._autoSaveStarted = true

      this.$subscribe(
        (mutation, state) => {
          if (state._hydrating) return
          const eventsRaw = mutation && mutation.events ? mutation.events : null
          const events = Array.isArray(eventsRaw) ? eventsRaw : eventsRaw ? [eventsRaw] : []
          const shouldPersist = events.length
            ? events.some((e) => {
                const key = e?.key === null || e?.key === undefined ? '' : String(e.key)
                return (
                  key === 'form' ||
                  key.startsWith('form.') ||
                  key === 'cache' ||
                  key.startsWith('cache.') ||
                  key === 'courseLoop' ||
                  key.startsWith('courseLoop.') ||
                  key === 'scheduleInput' ||
                  key.startsWith('scheduleInput.') ||
                  key === 'schedulePrefs' ||
                  key.startsWith('schedulePrefs.')
                )
              })
            : false

          if (!shouldPersist) return
          if (state._persistTimer) {
            window.clearTimeout(state._persistTimer)
          }
          state._persistTimer = window.setTimeout(() => {
            this.persist()
          }, 250)
        },
        { detached: true },
      )
    },
    resetForm() {
      this.form = normalizeFormFromStorage({})
      this.persist()
    },
    clearCache() {
      this.cache.cookie = ''
      this.cache.electionProfiles = []
      this.cache.yixuanData = []
      this.persist()
    },
    clearLessonCache() {
      this.cache.lessonJSONsCache = rawLessonCache({})
      this.persist()
    },
    applyCache(key, value) {
      if (key === 'cookie') {
        this.cache.cookie = typeof value === 'string' ? value : String(value || '')
        return
      }
      if (key === 'electionProfiles') {
        const parsed = typeof value === 'string' ? safeJsonParse(value, []) : value
        this.cache.electionProfiles = Array.isArray(parsed) ? parsed : []
        return
      }
      if (key === 'lessonJSONsCache') {
        const parsed = typeof value === 'string' ? safeJsonParse(value, {}) : value
        this.cache.lessonJSONsCache = rawLessonCache(parsed)
        return
      }
      if (key === 'yixuanData') {
        const parsed = typeof value === 'string' ? safeJsonParse(value, []) : value
        this.cache.yixuanData = Array.isArray(parsed) ? parsed : []
        return
      }
    },
    buildCommonBaseConfig() {
      const electionProfiles = Array.isArray(this.cache.electionProfiles) ? this.cache.electionProfiles : []
      const lessonJSONsCache = this.cache.lessonJSONsCache && typeof this.cache.lessonJSONsCache === 'object' ? toRaw(this.cache.lessonJSONsCache) : {}
      return {
        url: this.form.url,
        username: this.form.username,
        password: this.form.password,
        delay: Number(this.form.delay || 0),
        cookie: this.cache.cookie || '',
        electionProfiles,
        lessonJSONsCache,
      }
    },
    buildCourseBaseConfig() {
      return {
        ...this.buildCommonBaseConfig(),
        count: this.form.courseCount || '1',
      }
    },
    buildScheduleBaseConfig() {
      return {
        ...this.buildCommonBaseConfig(),
        count: this.form.scheduleCount || '1',
      }
    },
  },
})

