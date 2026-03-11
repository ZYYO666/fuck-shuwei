<template>
  <div class="h-full flex flex-col gap-5">
    <div class="flex flex-wrap items-start justify-between gap-3">
      <div>
        <div class="text-xl font-semibold tracking-wide">智能选课</div>
        <div class="mt-1 text-sm text-slate-600">更像一个控制台：配置、执行、观察结果</div>
      </div>
      <div class="flex items-center gap-2">
        <n-button secondary :disabled="course.courseTable.length === 0" @click="resultsModalOpen = true">结果</n-button>
        <n-button type="primary" :loading="ws.processing" @click="start">
          {{ ws.processing ? '执行中' : '开始选课' }}
        </n-button>
      </div>
    </div>

    <n-modal v-model:show="lessonsConfigOpen">
      <n-card size="large" :bordered="false" :style="{ width: '720px', maxWidth: '94vw' }">
        <div class="flex items-start justify-between gap-3">
          <div>
            <div class="text-base font-semibold">配置课程列表</div>
            <div class="mt-1 text-xs text-slate-600">必须是课程序号，从上到下优先级递减</div>
          </div>
          <n-button secondary size="small" @click="lessonsConfigOpen = false">关闭</n-button>
        </div>

        <div class="mt-4 overflow-hidden rounded-2xl bg-white/60">
          <n-scrollbar class="h-[420px]">
            <div class="p-2 space-y-2">
              <div
                v-for="(_, idx) in persisted.form.lessonsText"
                :key="idx"
                class="rounded-xl border border-black/10 bg-white/70 px-2 py-2"
              >
                <div class="flex flex-wrap items-center gap-2">
                  <div class="min-w-[180px] flex-1">
                    <n-input v-model:value="persisted.form.lessonsText[idx]" size="small" placeholder="课程序号（如 001.1.1）" />
                  </div>
                  <div class="flex items-center gap-1 shrink-0">
                    <n-button size="tiny" secondary :disabled="idx === 0" @click="moveLessonUp(idx)">上移</n-button>
                    <n-button
                      size="tiny"
                      secondary
                      :disabled="idx >= persisted.form.lessonsText.length - 1"
                      @click="moveLessonDown(idx)"
                    >
                      下移
                    </n-button>
                    <n-button size="tiny" type="error" secondary @click="deleteLesson(idx)">删除</n-button>
                  </div>
                </div>
              </div>

              <div v-if="persisted.form.lessonsText.length === 0" class="py-10 text-center text-sm text-slate-500">
                还没有添加课程
              </div>

              <button
                type="button"
                class="w-full rounded-xl border border-dashed border-black/15 bg-white/40 px-3 py-2 text-sm text-slate-600 hover:bg-white/60"
                @click="addLesson()"
              >
                点击添加
              </button>
            </div>
          </n-scrollbar>
        </div>
      </n-card>
    </n-modal>

    <n-modal v-model:show="resultsModalOpen" :mask-closable="false" :style="{ padding: '0px' }">
      <n-card
        size="large"
        :bordered="false"
        :style="{ width: '100vw', height: '100vh', borderRadius: '0px' }"
        :content-style="{ height: '100%', display: 'flex', flexDirection: 'column' }"
      >
        <div class="flex items-start justify-between gap-3">
          <div>
            <div class="text-base font-semibold">实时结果</div>
            <div class="mt-1 text-xs text-slate-600">共 {{ course.courseTable.length }} 条</div>
          </div>
          <n-button secondary size="small" @click="resultsModalOpen = false">关闭</n-button>
        </div>

        <div class="mt-4 flex-1 min-h-0 overflow-hidden rounded-2xl bg-white/60">
          <div v-if="course.courseTable.length === 0" class="py-10 text-center text-sm text-slate-500">
            暂无结果
          </div>
          <n-data-table
            v-else
            :columns="columns"
            :data="course.courseTable"
            :bordered="false"
            :single-line="false"
            :max-height="resultsTableMaxHeight"
          />
        </div>
      </n-card>
    </n-modal>

    <n-scrollbar class="flex-1 min-h-0">
      <div class="pb-6 space-y-4">
        <n-card>
          <div class="flex flex-wrap items-start justify-between gap-3">
            <div class="min-w-0">
              <div class="text-sm font-semibold">选课轮次（兼容模式）</div>
              <div class="mt-1 text-xs text-slate-600">轮次 N = 教务选课页面从上到下第 N 个选课轮次</div>
            </div>
            <div class="flex flex-wrap items-center gap-3">
              <n-select
                v-model:value="persisted.form.courseCount"
                size="small"
                class="w-[240px]"
                :options="profileOptions"
                placeholder="轮次（1-5）"
                :disabled="ws.processing"
              />
              <n-button size="small" secondary :disabled="ws.processing" @click="fetchProfilesCourse()">刷新轮次</n-button>
            </div>
          </div>
        </n-card>

        <n-card>
          <n-form :model="persisted.form" label-placement="top" size="large">
            <n-grid :cols="12" :x-gap="16" :y-gap="14">
              <n-form-item-gi :span="12" label="抢课模式">
                <div class="w-full space-y-3">
                  <n-radio-group v-model:value="persisted.form.selectionModel" class="flex items-center gap-4">
                    <n-radio value="2">顺序</n-radio>
                    <n-radio value="1">并发</n-radio>
                  </n-radio-group>
                  <n-alert v-if="persisted.form.selectionModel === '1'" type="warning" :bordered="false">
                    并发模式更快但更激进，容易触发系统限制或异常状态。
                  </n-alert>
                </div>
              </n-form-item-gi>

              <n-form-item-gi :span="12" label="循环执行">
                <div class="w-full flex flex-wrap items-center justify-between gap-3">
                  <div class="text-sm text-slate-700">当存在未成功课程时，自动再次执行</div>
                  <div class="flex items-center gap-3">
                    <n-tag :bordered="false" type="info">
                      课程数 {{ persisted.form.lessonsText.length }}
                    </n-tag>
                    <n-switch v-model:value="persisted.courseLoop" />
                  </div>
                </div>
              </n-form-item-gi>
            </n-grid>
          </n-form>
        </n-card>

        <n-card class="min-h-0">
          <div class="flex items-start justify-between gap-3">
            <div class="min-w-0">
              <div class="text-sm font-semibold">课程列表</div>
              <div class="mt-1 text-xs text-slate-600">共 {{ persisted.form.lessonsText.length }} 条（必须是课程序号）</div>
            </div>
            <n-button size="small" secondary @click="lessonsConfigOpen = true">配置</n-button>
          </div>

          <div class="mt-3 text-xs text-slate-600 leading-relaxed line-clamp-6">{{ lessonsPreview }}</div>
        </n-card>
      </div>
    </n-scrollbar>
  </div>
</template>

<script setup>
import { computed, h, ref, watch } from 'vue'
import { NAlert, NButton, NCard, NDataTable, NForm, NFormItemGi, NGrid, NInput, NModal, NRadio, NRadioGroup, NScrollbar, NSelect, NSwitch, NTag } from 'naive-ui'
import { useCourseStore } from '@/stores/course'
import { usePersistedStore } from '@/stores/persisted'
import { useWsStore } from '@/stores/ws'

const persisted = usePersistedStore()
const ws = useWsStore()
const course = useCourseStore()
const lessonsConfigOpen = ref(false)
const resultsModalOpen = ref(false)
const courseStarted = ref(false)

const profileOptions = computed(() => {
  const list = Array.isArray(persisted.cache.electionProfiles) ? persisted.cache.electionProfiles : []
  if (list.length > 0) {
    return list.map((p, idx) => ({
      label: p.title || `轮次 ${idx + 1}`,
      value: String(idx + 1),
    }))
  }
  return Array.from({ length: 5 }, (_, idx) => ({
    label: `轮次 ${idx + 1}`,
    value: String(idx + 1),
  }))
})

const lessonsPreview = computed(() => {
  const list = Array.isArray(persisted.form.lessonsText) ? persisted.form.lessonsText : []
  const items = list
    .map((v) => String(v || '').trim())
    .filter(Boolean)
    .slice(0, 12)
  return items.length > 0 ? items.join('、') : '未配置'
})

const resultsTableMaxHeight = computed(() => {
  const h = typeof window !== 'undefined' ? window.innerHeight : 900
  return Math.max(320, h - 180)
})

const columns = [
  { title: 'id', key: 'id', width: 120 },
  { title: '名称', key: '名称', minWidth: 220 },
  { title: '教师', key: '教师', minWidth: 140 },
  { title: '教学班', key: '教学班', minWidth: 160 },
  {
    title: '状态',
    key: '状态',
    width: 130,
    render(row) {
      const v = row['状态']
      const map = {
        success: { type: 'success', label: '成功' },
        overtime: { type: 'warning', label: '超时/过期' },
        clash: { type: 'warning', label: '冲突' },
        full: { type: 'error', label: '人数已满' },
        noopen: { type: 'default', label: '未开放' },
        selected: { type: 'info', label: '已选过' },
        loading: { type: 'info', label: '处理中' },
        notfound: { type: 'error', label: '未找到' },
        notselected: { type: 'default', label: '待处理' },
        error: { type: 'error', label: '错误' },
      }
      const item = map[v] || { type: 'default', label: String(v || '-') }
      return h(NTag, { type: item.type, bordered: false }, { default: () => item.label })
    },
  },
]

function addLesson() {
  const list = Array.isArray(persisted.form.lessonsText) ? persisted.form.lessonsText : []
  const last = list.length ? String(list[list.length - 1] || '').trim() : ''
  if (list.length > 0 && last === '') return
  list.push('')
  persisted.form.lessonsText = list
}

function moveLessonUp(idx) {
  const list = Array.isArray(persisted.form.lessonsText) ? [...persisted.form.lessonsText] : []
  if (idx <= 0 || idx >= list.length) return
  const [item] = list.splice(idx, 1)
  list.splice(idx - 1, 0, item)
  persisted.form.lessonsText = list
}

function moveLessonDown(idx) {
  const list = Array.isArray(persisted.form.lessonsText) ? [...persisted.form.lessonsText] : []
  if (idx < 0 || idx >= list.length - 1) return
  const [item] = list.splice(idx, 1)
  list.splice(idx + 1, 0, item)
  persisted.form.lessonsText = list
}

function deleteLesson(idx) {
  const list = Array.isArray(persisted.form.lessonsText) ? [...persisted.form.lessonsText] : []
  if (idx < 0 || idx >= list.length) return
  list.splice(idx, 1)
  persisted.form.lessonsText = list
}

function fetchProfilesCourse() {
  ws.sendWs(course.buildFetchProfilesPayload())
}

function start() {
  courseStarted.value = true
  ws.sendWs(course.buildStartPayload())
}

watch(
  () => ws.processing,
  (v, ov) => {
    if (!courseStarted.value) return
    if (ov && !v) {
      courseStarted.value = false
      if (course.courseTable.length > 0) resultsModalOpen.value = true
    }
  },
)
</script>
