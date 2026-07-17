export function nowId() {
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`
}

export function toTimeLabel(ms) {
  const d = new Date(ms)
  const hh = String(d.getHours()).padStart(2, '0')
  const mm = String(d.getMinutes()).padStart(2, '0')
  const ss = String(d.getSeconds()).padStart(2, '0')
  return `${hh}:${mm}:${ss}`
}

export function safeJsonParse(str, fallback) {
  try {
    return JSON.parse(str)
  } catch {
    return fallback
  }
}

function normalizeLessonList(raw) {
  const v = typeof raw === 'string' ? safeJsonParse(raw, []) : raw
  if (Array.isArray(v)) return v
  if (v && typeof v === 'object') {
    if (Array.isArray(v.lessonJSONs)) return v.lessonJSONs
    if (Array.isArray(v.lessonJSONsList)) return v.lessonJSONsList
    if (Array.isArray(v.data)) return v.data
  }
  return []
}

function addCourseLabel(map, key, name) {
  const k = String(key || '').trim()
  const label = String(name || '').trim()
  if (!k || !label) return
  if (!map.has(k)) map.set(k, label)
}

export function buildCourseLabelIndex(lessonJSONsCache) {
  const byNo = new Map()
  const byCode = new Map()
  const cache = lessonJSONsCache && typeof lessonJSONsCache === 'object' ? lessonJSONsCache : {}

  for (const raw of Object.values(cache)) {
    for (const lesson of normalizeLessonList(raw)) {
      addCourseLabel(byNo, lesson?.no, lesson?.name)
      addCourseLabel(byCode, lesson?.code, lesson?.name)
    }
  }

  return { byNo, byCode }
}

