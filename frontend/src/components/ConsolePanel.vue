<template>
  <div class="h-full p-4 flex flex-col gap-4">
    <div class="flex items-center justify-between gap-3">
      <div class="text-sm font-semibold tracking-wide">日志</div>
    </div>

    <div class="flex-1 min-h-0 overflow-hidden rounded-2xl bg-white/60">
      <n-scrollbar class="h-full">
        <div class="p-3 space-y-2">
          <div
            v-for="item in logs.logs"
            :key="item.id"
            class="rounded-xl border border-black/10 bg-white/70 px-3 py-2"
          >
            <div class="flex items-start gap-3">
              <div class="mt-1.5 h-2 w-2 rounded-full" :class="levelDotClass(item.level)" />
              <div class="min-w-0 flex-1">
                <div class="text-sm text-slate-950 font-medium whitespace-pre-wrap break-words leading-relaxed">
                  {{ item.message }}
                </div>
                <div class="mt-1 flex items-center gap-2 text-[11px] text-slate-500 tabular-nums">
                  <span>{{ item.timeLabel }}</span>
                  <span class="text-slate-300">·</span>
                  <span>{{ levelLabel(item.level) }}</span>
                </div>
              </div>
            </div>
          </div>

          <div v-if="logs.logs.length === 0" class="p-8 text-center text-xs text-slate-500">
            暂无日志
          </div>
        </div>
      </n-scrollbar>
    </div>
  </div>
</template>

<script setup>
import { NScrollbar } from 'naive-ui'
import { useLogsStore } from '@/stores/logs'

const logs = useLogsStore()

function levelLabel(v) {
  if (v === 'good') return '成功'
  if (v === 'error') return '错误'
  if (v === 'cache') return '缓存'
  return '日志'
}

function levelDotClass(v) {
  if (v === 'good') return 'bg-emerald-400'
  if (v === 'error') return 'bg-rose-400'
  if (v === 'cache') return 'bg-sky-400'
  return 'bg-slate-400'
}
</script>
