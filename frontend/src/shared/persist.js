import { safeJsonParse } from './utils'

const STORAGE_KEY = 'modern-fe:state'

export function normalizeCacheFromStorage(raw) {
  const cache = raw && typeof raw === 'object' ? raw : {}
  const electionProfiles = Array.isArray(cache.electionProfiles) ? cache.electionProfiles : []
  const lessonJSONsCache = cache.lessonJSONsCache && typeof cache.lessonJSONsCache === 'object' ? cache.lessonJSONsCache : {}
  const yixuanData = Array.isArray(cache.yixuanData) ? cache.yixuanData : []
  return {
    cookie: typeof cache.cookie === 'string' ? cache.cookie : '',
    electionProfiles,
    lessonJSONsCache,
    yixuanData,
  }
}

export function normalizeFormFromStorage(raw) {
  const v = raw && typeof raw === 'object' ? raw : {}
  const legacyCount = typeof v.count === 'string' ? v.count : null
  return {
    url: typeof v.url === 'string' ? v.url : '',
    username: typeof v.username === 'string' ? v.username : '',
    password: typeof v.password === 'string' ? v.password : '',
    delay: Number.isFinite(Number(v.delay)) ? Number(v.delay) : 500,
    courseCount: typeof v.courseCount === 'string' ? v.courseCount : legacyCount || '1',
    scheduleCount: typeof v.scheduleCount === 'string' ? v.scheduleCount : '1',
    selectionModel: typeof v.selectionModel === 'string' ? v.selectionModel : '2',
    lessonsText: Array.isArray(v.lessonsText) ? v.lessonsText.map((x) => String(x)) : [],
  }
}

export function loadPersistedState() {
  return safeJsonParse(localStorage.getItem(STORAGE_KEY) || '', {})
}

export function savePersistedState(state) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
}

