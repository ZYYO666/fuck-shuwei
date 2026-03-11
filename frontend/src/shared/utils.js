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

