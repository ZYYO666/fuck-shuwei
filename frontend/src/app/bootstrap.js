import { usePersistedStore } from '@/stores/persisted'
import { useWsStore } from '@/stores/ws'

export function bootstrapApp() {
  const persisted = usePersistedStore()
  const ws = useWsStore()

  persisted.hydrate()
  persisted.startAutoSave()
  ws.ensureWs()
}
