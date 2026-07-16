<template>
  <div class="h-full flex flex-col gap-5">
    <div class="flex flex-wrap items-start justify-between gap-3">
      <div>
        <div class="text-xl font-semibold tracking-wide">课程缓存</div>
        <div class="mt-1 text-sm text-slate-600">按轮次缓存 lessonJSONs，减少请求与解析</div>
      </div>
    </div>

    <n-modal v-model:show="detailOpen" :mask-closable="true">
      <n-card size="large" :bordered="false" :style="{ width: '860px', maxWidth: '94vw' }">
        <div class="flex items-start justify-between gap-3">
          <div class="min-w-0">
            <div class="text-base font-semibold">原始数据</div>
            <div class="mt-1 text-xs text-slate-600 line-clamp-1">{{ detailTitle }}</div>
          </div>
          <n-button secondary size="small" @click="detailOpen = false">关闭</n-button>
        </div>
        <div class="mt-4 overflow-hidden rounded-2xl bg-white/60">
          <n-scrollbar class="h-[520px]">
            <div class="p-2">
              <n-input :value="detailJson" type="textarea" :rows="22" readonly />
            </div>
          </n-scrollbar>
        </div>
      </n-card>
    </n-modal>

    <n-scrollbar class="flex-1 min-h-0">
      <div class="pb-6">
        <n-card title="按轮次查看">
          <n-tabs type="segment" animated>
            <n-tab-pane name="table" tab="表格">
              <div class="flex flex-col gap-3 min-h-0">
                <div class="flex flex-wrap items-center gap-2">
                  <n-select
                    v-model:value="selectedProfileId"
                    :options="profileOptions"
                    placeholder="选择 profileId"
                    class="w-[240px]"
                  />
                  <n-input v-model:value="query" size="small" placeholder="搜索 no / code / name / teachers" class="w-[320px]" />
                </div>

                <n-data-table
                  :columns="columns"
                  :data="filteredLessons"
                  :bordered="false"
                  :single-line="false"
                  :max-height="tableMaxHeight"
                  virtual-scroll
                  :row-key="rowKey"
                />
              </div>
            </n-tab-pane>

            <n-tab-pane name="raw" tab="原始 JSON">
              <div class="space-y-3">
                <n-select v-model:value="selectedProfileId" :options="profileOptions" placeholder="选择 profileId" class="w-[240px]" />
                <n-input :value="currentJson" type="textarea" :rows="16" readonly />
              </div>
            </n-tab-pane>
          </n-tabs>
        </n-card>
      </div>
    </n-scrollbar>
  </div>
</template>

<script setup>
import { computed, h, ref, watch } from 'vue'
import { NButton, NCard, NDataTable, NInput, NModal, NScrollbar, NSelect, NTabPane, NTabs } from 'naive-ui'
import { usePersistedStore } from '@/stores/persisted'

const store = usePersistedStore()
const selectedProfileId = ref('')
const query = ref('')

const profileIds = computed(() => Object.keys(store.cache.lessonJSONsCache || {}))
const profileOptions = computed(() => profileIds.value.map((id) => ({ label: id, value: id })))

const currentRaw = computed(() => {
  if (!selectedProfileId.value) return null
  return store.cache.lessonJSONsCache?.[selectedProfileId.value] ?? null
})

const currentJson = computed(() => {
  const raw = currentRaw.value
  if (!raw) return ''
  if (typeof raw === 'string') return raw.length > 200000 ? `${raw.slice(0, 200000)}\n... 已截断` : raw
  const list = normalizeLessonJSONs(raw)
  if (list.length > 0) return `课程列表较大，已跳过自动格式化。当前轮次共 ${list.length} 条；需要查看单条原文请在表格点“详情”。`
  return '课程缓存较大，已跳过自动格式化。'
})

function normalizeLessonJSONs(raw) {
  const v = typeof raw === 'string' ? tryParseJson(raw) : raw
  if (Array.isArray(v)) return v
  if (v && typeof v === 'object') {
    if (Array.isArray(v.lessonJSONs)) return v.lessonJSONs
    if (Array.isArray(v.lessonJSONsList)) return v.lessonJSONsList
    if (Array.isArray(v.data)) return v.data
  }
  return []
}

function tryParseJson(s) {
  try {
    return JSON.parse(s)
  } catch {
    return null
  }
}

const lessons = computed(() => normalizeLessonJSONs(currentRaw.value))

const tableMaxHeight = computed(() => {
  const h = typeof window !== 'undefined' ? window.innerHeight : 900
  return Math.max(360, h - 340)
})

function arrangeSummary(lesson) {
  const a = Array.isArray(lesson?.arrangeInfo) ? lesson.arrangeInfo : []
  if (a.length === 0) return ''
  const dayLabel = (d) => {
    const map = { 1: '周一', 2: '周二', 3: '周三', 4: '周四', 5: '周五', 6: '周六', 7: '周日' }
    return map[d] || `周${d}`
  }
  return a
    .slice(0, 6)
    .map((x) => {
      const d = Number(x?.weekDay || 0)
      const start = Number(x?.startUnit || 0)
      const end = Number(x?.endUnit || 0)
      const digest = x?.weekStateDigest ? String(x.weekStateDigest) : ''
      const rooms = x?.rooms ? String(x.rooms) : ''
      const parts = [dayLabel(d)]
      if (start && end) parts.push(`${start}-${end}`)
      if (digest) parts.push(digest)
      if (rooms) parts.push(rooms)
      return parts.join(' ')
    })
    .join('；')
}

const filteredLessons = computed(() => {
  const q = query.value.trim().toLowerCase()
  const list = lessons.value
  if (!q) return list
  return list.filter((l) => {
    const s = [
      l?.no,
      l?.code,
      l?.name,
      l?.teachers,
      l?.teachClassName,
      l?.campusName,
      l?.courseTypeName,
    ]
      .filter(Boolean)
      .join(' ')
      .toLowerCase()
    return s.includes(q)
  })
})

const detailOpen = ref(false)
const detailJson = ref('')
const detailTitle = ref('')
const fallbackRowKeys = new WeakMap()
let fallbackRowKeyId = 0

function rowKey(row) {
  const key = [row?.no, row?.code, row?.name, row?.teachClassName].filter(Boolean).join('|')
  if (key) return key
  if (!row || typeof row !== 'object') return String(row || '')
  if (!fallbackRowKeys.has(row)) fallbackRowKeys.set(row, `row-${fallbackRowKeyId++}`)
  return fallbackRowKeys.get(row)
}

function openDetail(row) {
  try {
    detailTitle.value = [row?.no, row?.name, row?.teachers].filter(Boolean).join(' · ') || '原始数据'
    detailJson.value = JSON.stringify(row, null, 2)
  } catch {
    detailTitle.value = '原始数据'
    detailJson.value = ''
  }
  detailOpen.value = true
}

const columns = [
  { title: 'no', key: 'no', width: 200 },
  { title: 'name', key: 'name', minWidth: 200 },
  { title: 'code', key: 'code', width: 130 },
  { title: 'teachers', key: 'teachers', width: 120 },
  { title: 'campusName', key: 'campusName', width: 90 },
  { title: 'credits', key: 'credits', width: 80 },
  {
    title: 'week',
    key: 'week',
    width: 90,
    render(row) {
      const s = Number(row?.startWeek || 0)
      const e = Number(row?.endWeek || 0)
      if (!s || !e) return '-'
      return `${s}-${e}`
    },
  },
  { title: 'period', key: 'period', width: 80 },
  { title: 'weekHour', key: 'weekHour', width: 90 },
  {
    title: 'arrangeInfo',
    key: 'arrangeInfo',
    minWidth: 260,
    render(row) {
      return arrangeSummary(row) || '-'
    },
  },
  {
    title: '操作',
    key: '_actions',
    width: 90,
    render(row) {
      return h(
        NButton,
        { size: 'tiny', secondary: true, onClick: () => openDetail(row) },
        { default: () => '详情' },
      )
    },
  },
]

watch(
  () => profileIds.value.join(','),
  () => {
    if (selectedProfileId.value) return
    selectedProfileId.value = profileIds.value[0] || ''
  },
  { immediate: true },
)
</script>
