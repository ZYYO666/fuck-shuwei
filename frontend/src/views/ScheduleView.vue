<template>
  <div class="h-full flex flex-col gap-6">
    <div class="flex flex-wrap items-start justify-between gap-3">
      <div>
        <div class="text-xl font-semibold tracking-wide">智能排课</div>
        <div class="mt-1 text-sm text-slate-600">输入目标课程与已选课程，按偏好生成更舒服的课表</div>
      </div>
      <div class="flex items-center gap-2">
        <n-button type="primary" :loading="ws.processing" @click="startSchedule">
          {{ ws.processing ? '计算中' : '开始排课' }}
        </n-button>
      </div>
    </div>

    <n-scrollbar class="flex-1 min-h-0">
      <div class="pb-8">
        <n-card>
          <div class="flex flex-col gap-3 rounded-2xl border border-black/10 bg-white/60 px-5 py-4 mb-5">
            <div class="flex flex-wrap items-center gap-3">
              <n-select
                v-model:value="persisted.form.scheduleCount"
                size="small"
                class="w-[240px]"
                :options="profileOptions"
                placeholder="轮次（1-5）"
                :disabled="ws.processing"
              />
              <n-button
                size="small"
                secondary
                :disabled="ws.processing"
                @click="fetchProfilesSchedule()"
              >
                刷新轮次
              </n-button>
            </div>
            <div class="text-[11px] text-slate-600 leading-tight">
              兼容模式：这里的“轮次”代表教务选课页面从上到下第 N 个选课轮次
            </div>
          </div>
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <div class="rounded-2xl border border-black/10 bg-white/60 p-5">
              <div class="flex items-start justify-between gap-3">
                <div class="min-w-0">
                  <div class="text-sm font-semibold text-slate-900">目标课程</div>
                  <div class="mt-1 text-xs text-slate-600">共 {{ persisted.scheduleInput.lessonCodes.length }} 条</div>
                </div>
                <n-button size="small" secondary @click="lessonCodeConfigOpen = true">配置</n-button>
              </div>
              <div class="mt-4 text-xs text-slate-600 leading-relaxed line-clamp-2">{{ lessonCodePreview }}</div>
            </div>

            <div class="rounded-2xl border border-black/10 bg-white/60 p-5">
              <div class="flex items-start justify-between gap-3">
                <div class="min-w-0">
                  <div class="text-sm font-semibold text-slate-900">已选课程</div>
                  <div class="mt-1 text-xs text-slate-600">共 {{ persisted.cache.yixuanData.length }} 条</div>
                </div>
                <div class="flex items-center gap-2">
                  <n-button size="small" secondary :disabled="ws.processing" @click="fetchYixuanDataSchedule()">
                    拉取已选
                  </n-button>
                  <n-button size="small" secondary @click="yixuanConfigOpen = true">配置</n-button>
                </div>
              </div>
              <div class="mt-4 text-xs text-slate-600 leading-relaxed line-clamp-2">{{ yixuanPreview }}</div>
            </div>

            <div class="lg:col-span-2 rounded-2xl border border-black/10 bg-white/60 p-5">
              <div class="text-sm font-semibold text-slate-900">偏好（越靠前影响越大）</div>
              <div class="mt-4 w-full flex flex-wrap gap-3">
                <div class="flex items-center justify-between rounded-2xl border border-black/10 bg-white/60 px-4 py-3 min-w-[210px] flex-1">
                  <div class="text-[13px] text-slate-800">避免早八</div>
                  <n-switch v-model:value="persisted.schedulePrefs.zaoba" />
                </div>
                <div class="flex items-center justify-between rounded-2xl border border-black/10 bg-white/60 px-4 py-3 min-w-[210px] flex-1">
                  <div class="text-[13px] text-slate-800">尽量不排周五</div>
                  <n-switch v-model:value="persisted.schedulePrefs.zhouwu" />
                </div>
                <div class="flex items-center justify-between rounded-2xl border border-black/10 bg-white/60 px-4 py-3 min-w-[210px] flex-1">
                  <div class="text-[13px] text-slate-800">尽量不排周一</div>
                  <n-switch v-model:value="persisted.schedulePrefs.zhouyi" />
                </div>
                <div class="flex items-center justify-between rounded-2xl border border-black/10 bg-white/60 px-4 py-3 min-w-[210px] flex-1">
                  <div class="text-[13px] text-slate-800">尽量不排周六</div>
                  <n-switch v-model:value="persisted.schedulePrefs.zhoulio" />
                </div>
                <div class="flex items-center justify-between rounded-2xl border border-black/10 bg-white/60 px-4 py-3 min-w-[210px] flex-1">
                  <div class="text-[13px] text-slate-800">尽量不排周日</div>
                  <n-switch v-model:value="persisted.schedulePrefs.zhouri" />
                </div>
              </div>
            </div>
          </div>
        </n-card>
      </div>
    </n-scrollbar>

    <n-modal v-model:show="lessonCodeConfigOpen">
      <n-card size="large" :bordered="false" :style="{ width: '720px', maxWidth: '94vw' }">
        <div class="flex items-start justify-between gap-3">
          <div>
            <div class="text-base font-semibold">配置目标课程</div>
            <div class="mt-1 text-xs text-slate-600">必须是课程代码</div>
          </div>
          <n-button secondary size="small" @click="lessonCodeConfigOpen = false">关闭</n-button>
        </div>

        <div class="mt-4 overflow-hidden rounded-2xl bg-white/60">
          <n-scrollbar class="h-[420px]">
            <div class="p-2 space-y-2">
              <div
                v-for="(code, idx) in persisted.scheduleInput.lessonCodes"
                :key="`${idx}-${code}`"
                class="rounded-xl border border-black/10 bg-white/70 px-2 py-2"
              >
                <div class="flex flex-wrap items-center gap-2">
                  <div class="min-w-[180px] flex-1">
                    <n-input v-model:value="persisted.scheduleInput.lessonCodes[idx]" size="small" placeholder="例如 001.1.1" />
                  </div>
                  <div class="flex items-center gap-1 shrink-0">
                    <n-button size="tiny" secondary :disabled="idx === 0" @click="moveLessonCodeUp(idx)">上移</n-button>
                    <n-button
                      size="tiny"
                      secondary
                      :disabled="idx >= persisted.scheduleInput.lessonCodes.length - 1"
                      @click="moveLessonCodeDown(idx)"
                    >
                      下移
                    </n-button>
                    <n-button size="tiny" type="error" secondary @click="deleteLessonCode(idx)">删除</n-button>
                  </div>
                </div>
              </div>

              <div v-if="persisted.scheduleInput.lessonCodes.length === 0" class="py-10 text-center text-sm text-slate-500">
                还没有添加目标课程
              </div>

              <button
                type="button"
                class="w-full rounded-xl border border-dashed border-black/15 bg-white/40 px-3 py-2 text-sm text-slate-600 hover:bg-white/60"
                @click="addLessonCode()"
              >
                点击添加
              </button>
            </div>
          </n-scrollbar>
        </div>
      </n-card>
    </n-modal>

    <n-modal v-model:show="yixuanConfigOpen">
      <n-card size="large" :bordered="false" :style="{ width: '720px', maxWidth: '94vw' }">
          <div class="flex items-start justify-between gap-3">
            <div>
              <div class="text-base font-semibold">配置已选课程</div>
              <div class="mt-1 text-xs text-slate-600">必须是课程序号</div>
            </div>
            <div class="flex items-center gap-2">
            <n-button secondary size="small" :disabled="ws.processing" @click="fetchYixuanDataSchedule()">
              拉取已选
            </n-button>
            <n-button secondary size="small" @click="yixuanConfigOpen = false">关闭</n-button>
            </div>
          </div>

        <div class="mt-4 overflow-hidden rounded-2xl bg-white/60">
          <n-scrollbar class="h-[420px]">
            <div class="p-2 space-y-2">
              <div
                v-for="(no, idx) in persisted.cache.yixuanData"
                :key="`${idx}-${no}`"
                class="rounded-xl border border-black/10 bg-white/70 px-2 py-2"
              >
                <div class="flex flex-wrap items-center gap-2">
                  <div class="min-w-[180px] flex-1">
                    <n-input v-model:value="persisted.cache.yixuanData[idx]" size="small" placeholder="课程序号（如 001.1.1）" />
                  </div>
                  <div class="flex items-center gap-1 shrink-0">
                    <n-button size="tiny" secondary :disabled="idx === 0" @click="moveYixuanUp(idx)">上移</n-button>
                    <n-button
                      size="tiny"
                      secondary
                      :disabled="idx >= persisted.cache.yixuanData.length - 1"
                      @click="moveYixuanDown(idx)"
                    >
                      下移
                    </n-button>
                    <n-button size="tiny" type="error" secondary @click="deleteYixuan(idx)">删除</n-button>
                  </div>
                </div>
              </div>

              <div v-if="persisted.cache.yixuanData.length === 0" class="py-10 text-center text-sm text-slate-500">
                还没有添加已选课程
              </div>

              <button
                type="button"
                class="w-full rounded-xl border border-dashed border-black/15 bg-white/40 px-3 py-2 text-sm text-slate-600 hover:bg-white/60"
                @click="addYixuan()"
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
            <div class="text-base font-semibold">排课结果</div>
            <div class="mt-1 text-xs text-slate-600">
              共 {{ schedule.scheduleTable.length }} 个方案
              <span v-if="activeRow" class="mx-2 text-slate-300">·</span>
              <span v-if="activeRow">当前方案 {{ activeRow._idx + 1 }}</span>
            </div>
          </div>
          <n-button secondary size="small" @click="resultsModalOpen = false">关闭</n-button>
        </div>

        <div class="mt-4 flex-1 min-h-0 flex flex-col lg:flex-row gap-4">
          <div class="lg:w-[420px] lg:shrink-0 flex flex-col min-h-0">
            <div class="flex items-center justify-between gap-2">
              <div class="text-xs text-slate-600">选择方案</div>
              <n-input v-model:value="planQuery" size="small" placeholder="搜索摘要" clearable class="w-[180px]" />
            </div>

            <div class="mt-2 flex-1 min-h-0 overflow-hidden rounded-2xl bg-white/60">
              <n-scrollbar class="h-full">
                <div class="p-2 space-y-2">
                  <button
                    v-for="row in filteredScheduleTable"
                    :key="row._idx"
                    type="button"
                    class="w-full text-left rounded-2xl bg-white/70 px-3 py-3"
                    :class="activePlanIdx === row._idx ? 'ring-2 ring-violet-400/35' : 'hover:bg-white/80'"
                    @click="selectPlan(row)"
                  >
                    <div class="flex items-start justify-between gap-3">
                      <div class="min-w-0">
                        <div class="text-sm font-semibold text-slate-950">
                          方案 {{ row._idx + 1 }}
                          <span class="ml-2 text-xs text-slate-500 tabular-nums">权重 {{ row.weight ?? '-' }}</span>
                        </div>
                        <div class="mt-1 text-xs text-slate-600 leading-relaxed line-clamp-2">
                          {{ row.summary || '-' }}
                        </div>
                      </div>
                      <div class="shrink-0 text-[11px] text-slate-600 tabular-nums space-y-0.5 text-right">
                        <div>早八 {{ row.zaobaCount ?? 0 }}</div>
                        <div>周五 {{ row.zhouwuCount ?? 0 }}</div>
                        <div>周一 {{ row.zhouyiCount ?? 0 }}</div>
                      </div>
                    </div>
                  </button>

                  <div v-if="filteredScheduleTable.length === 0" class="p-8 text-center text-xs text-slate-500">
                    没有匹配的方案
                  </div>
                </div>
              </n-scrollbar>
            </div>
          </div>

          <div class="flex-1 min-h-0 min-w-0 flex flex-col">
            <div class="flex flex-wrap items-center justify-between gap-2">
              <div class="text-xs text-slate-600">
                <span v-if="activeRow" class="tabular-nums">早八 {{ activeRow.zaobaCount ?? 0 }} · 周五 {{ activeRow.zhouwuCount ?? 0 }} · 周日 {{ activeRow.zhouriCount ?? 0 }}</span>
                <span v-else>请选择方案查看课表</span>
              </div>
              <div class="flex flex-wrap items-center gap-2">
                <div class="flex items-center gap-2 rounded-2xl bg-white/60 px-3 py-2">
                  <div class="text-xs text-slate-700">包含已选</div>
                  <n-switch v-model:value="includeYixuan" size="small" />
                </div>
              </div>
            </div>

            <div class="mt-3 flex-1 min-h-0 overflow-hidden rounded-2xl bg-white/60">
              <n-scrollbar class="h-full" x-scrollable>
                <div class="p-4 inline-block min-w-[980px]">
                  <div
                    v-if="activePlan"
                    class="grid gap-3"
                    :style="{ gridTemplateColumns: '70px repeat(7, minmax(120px, 1fr))' }"
                  >
                    <div />
                    <div v-for="d in days" :key="d" class="text-center text-xs font-semibold text-slate-700">
                      {{ d }}
                    </div>

                    <div class="space-y-2">
                      <div
                        v-for="p in periods"
                        :key="p"
                        class="h-[44px] rounded-xl bg-black/5 flex items-center justify-center text-[11px] text-slate-600 tabular-nums"
                      >
                        {{ p }}
                      </div>
                    </div>

                    <div v-for="dayIndex in 7" :key="dayIndex" class="grid grid-rows-13 gap-2 relative">
                      <div v-for="p in periods" :key="p" class="h-[44px] rounded-xl bg-black/5" />

                      <div v-for="b in blocksByDay[dayIndex]" :key="b.id" class="absolute left-0 right-0 px-2" :style="blockStyle(b)">
                        <button
                          type="button"
                          class="group relative h-full w-full overflow-hidden rounded-2xl border text-left transition hover:-translate-y-[1px] hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400/40"
                          :style="blockCardStyle(b)"
                          @click="openCourseDetail(b)"
                        >
                          <div class="relative h-full px-2.5 py-2 flex flex-col">
                            <div class="flex items-start justify-between gap-2">
                              <div class="min-w-0 flex items-start gap-2">
                                <div class="mt-1 h-2 w-2 shrink-0 rounded-full" :style="{ background: b.color.border }" />
                                <div class="min-w-0">
                                  <div class="text-[11px] font-semibold text-slate-900 leading-snug line-clamp-2">
                                    {{ b.title }}
                                  </div>
                                  <div class="mt-0.5 text-[10px] text-slate-700 leading-snug line-clamp-2">
                                    {{ b.subtitle }}
                                  </div>
                                </div>
                              </div>

                              <div v-if="b.source" class="shrink-0 rounded-full bg-white/60 px-2 py-0.5 text-[10px] text-slate-700">
                                {{ b.source }}
                              </div>
                            </div>

                            <div class="mt-auto flex items-center justify-between gap-2 pt-2 text-[10px] text-slate-600 tabular-nums">
                              <div class="min-w-0 truncate">{{ b.rangeLabel }}</div>
                              <div v-if="b.duration > 1" class="shrink-0 text-slate-500">×{{ b.duration }}</div>
                            </div>
                          </div>
                        </button>
                      </div>
                    </div>
                  </div>

                  <div v-else class="py-20 text-center text-sm text-slate-500">
                    请选择一个方案查看课表
                  </div>
                </div>
              </n-scrollbar>
            </div>

            <div v-if="activePlan" class="mt-3 overflow-hidden rounded-2xl bg-white/40">
              <n-scrollbar x-scrollable>
                <div class="p-2 flex items-center gap-2">
                  <n-tag v-for="c in courseLegend" :key="c.key" :bordered="false" type="info">
                    {{ c.label }}
                  </n-tag>
                </div>
              </n-scrollbar>
            </div>
          </div>
        </div>
      </n-card>
    </n-modal>

    <n-modal v-model:show="courseDetailOpen">
      <n-card size="large" :bordered="false" :style="{ width: '560px', maxWidth: '94vw' }">
        <div v-if="activeBlock" class="space-y-4">
          <div class="flex items-start justify-between gap-3">
            <div class="min-w-0">
              <div class="text-base font-semibold leading-snug">{{ activeBlock.title }}</div>
              <div class="mt-1 text-xs text-slate-600 leading-relaxed">
                {{ activeBlock.subtitle || '-' }}
              </div>
            </div>
            <n-button secondary size="small" @click="courseDetailOpen = false">关闭</n-button>
          </div>

          <div class="grid grid-cols-2 gap-3">
            <div class="rounded-2xl bg-black/5 px-3 py-2">
              <div class="text-[11px] text-slate-600">方案</div>
              <div class="mt-0.5 text-sm font-semibold tabular-nums">
                {{ activeRow ? `方案 ${activeRow._idx + 1}` : '-' }}
              </div>
            </div>
            <div class="rounded-2xl bg-black/5 px-3 py-2">
              <div class="text-[11px] text-slate-600">周次</div>
              <div class="mt-0.5 text-sm font-semibold tabular-nums">{{ activeBlock.weekLabel || '总体' }}</div>
            </div>
            <div class="rounded-2xl bg-black/5 px-3 py-2">
              <div class="text-[11px] text-slate-600">星期</div>
              <div class="mt-0.5 text-sm font-semibold">{{ activeBlock.dayLabel }}</div>
            </div>
            <div class="rounded-2xl bg-black/5 px-3 py-2">
              <div class="text-[11px] text-slate-600">节次</div>
              <div class="mt-0.5 text-sm font-semibold tabular-nums">{{ activeBlock.start }}-{{ activeBlock.end }}</div>
            </div>
          </div>

          <div class="rounded-2xl bg-black/5 px-3 py-3 space-y-2">
            <div class="flex items-center justify-between gap-3 text-xs text-slate-600">
              <div>更多信息</div>
              <div v-if="activeBlock.source" class="rounded-full bg-white/60 px-2 py-0.5 text-[11px] text-slate-700">
                {{ activeBlock.source }}
              </div>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-slate-800">
              <div class="flex items-center justify-between gap-2">
                <div class="text-xs text-slate-600">教师</div>
                <div class="text-right">{{ activeBlock.teachers || '-' }}</div>
              </div>
              <div class="flex items-center justify-between gap-2">
                <div class="text-xs text-slate-600">教学班</div>
                <div class="text-right">{{ activeBlock.teachClassName || '-' }}</div>
              </div>
              <div class="flex items-center justify-between gap-2">
                <div class="text-xs text-slate-600">课程序号</div>
                <div class="text-right">{{ activeBlock.no || '-' }}</div>
              </div>
              <div class="flex items-center justify-between gap-2">
                <div class="text-xs text-slate-600">时长</div>
                <div class="text-right tabular-nums">{{ activeBlock.duration }} 节</div>
              </div>
            </div>
          </div>
        </div>
      </n-card>
    </n-modal>
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import {
  NButton,
  NCard,
  NInput,
  NModal,
  NScrollbar,
  NSelect,
  NSwitch,
  NTag,
} from 'naive-ui'
import { usePersistedStore } from '@/stores/persisted'
import { useScheduleStore } from '@/stores/schedule'
import { useWsStore } from '@/stores/ws'

const persisted = usePersistedStore()
const ws = useWsStore()
const schedule = useScheduleStore()

const resultsModalOpen = ref(false)
const includeYixuan = ref(true)
const activePlanIdx = ref(null)
const schedulingStarted = ref(false)
const planQuery = ref('')
const courseDetailOpen = ref(false)
const activeBlock = ref(null)
const lessonCodeConfigOpen = ref(false)
const yixuanConfigOpen = ref(false)

const lessonCodePreview = computed(() => {
  const list = Array.isArray(persisted.scheduleInput.lessonCodes) ? persisted.scheduleInput.lessonCodes : []
  const items = list
    .map((v) => String(v || '').trim())
    .filter(Boolean)
    .slice(0, 10)
  return items.length > 0 ? items.join('、') : '未配置'
})

const yixuanPreview = computed(() => {
  const list = Array.isArray(persisted.cache.yixuanData) ? persisted.cache.yixuanData : []
  const items = list
    .map((v) => String(v || '').trim())
    .filter(Boolean)
    .slice(0, 10)
  return items.length > 0 ? items.join('、') : '未配置'
})

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

const filteredScheduleTable = computed(() => {
  const q = planQuery.value.trim().toLowerCase()
  const list = Array.isArray(schedule.scheduleTable) ? schedule.scheduleTable : []
  if (!q) return list
  return list.filter((r) => String(r?.summary || '').toLowerCase().includes(q))
})

function fetchProfilesSchedule() {
  ws.sendWs(schedule.buildFetchProfilesPayload())
}

function fetchYixuanDataSchedule() {
  ws.sendWs(schedule.buildFetchYixuanDataPayload())
}

function addLessonCode() {
  const list = Array.isArray(persisted.scheduleInput.lessonCodes) ? persisted.scheduleInput.lessonCodes : []
  const last = list.length ? String(list[list.length - 1] || '').trim() : ''
  if (list.length > 0 && last === '') return
  list.push('')
  persisted.scheduleInput.lessonCodes = list
}

function moveLessonCodeUp(idx) {
  const list = Array.isArray(persisted.scheduleInput.lessonCodes) ? [...persisted.scheduleInput.lessonCodes] : []
  if (idx <= 0 || idx >= list.length) return
  const [item] = list.splice(idx, 1)
  list.splice(idx - 1, 0, item)
  persisted.scheduleInput.lessonCodes = list
}

function moveLessonCodeDown(idx) {
  const list = Array.isArray(persisted.scheduleInput.lessonCodes) ? [...persisted.scheduleInput.lessonCodes] : []
  if (idx < 0 || idx >= list.length - 1) return
  const [item] = list.splice(idx, 1)
  list.splice(idx + 1, 0, item)
  persisted.scheduleInput.lessonCodes = list
}

function deleteLessonCode(idx) {
  const list = Array.isArray(persisted.scheduleInput.lessonCodes) ? [...persisted.scheduleInput.lessonCodes] : []
  if (idx < 0 || idx >= list.length) return
  list.splice(idx, 1)
  persisted.scheduleInput.lessonCodes = list
}

function addYixuan() {
  if (!Array.isArray(persisted.cache.yixuanData)) persisted.cache.yixuanData = []
  const list = persisted.cache.yixuanData
  const last = list.length ? String(list[list.length - 1] || '').trim() : ''
  if (list.length > 0 && last === '') return
  list.push('')
}

function moveYixuanUp(idx) {
  const list = Array.isArray(persisted.cache.yixuanData) ? [...persisted.cache.yixuanData] : []
  if (idx <= 0 || idx >= list.length) return
  const [item] = list.splice(idx, 1)
  list.splice(idx - 1, 0, item)
  persisted.cache.yixuanData = list
}

function moveYixuanDown(idx) {
  const list = Array.isArray(persisted.cache.yixuanData) ? [...persisted.cache.yixuanData] : []
  if (idx < 0 || idx >= list.length - 1) return
  const [item] = list.splice(idx, 1)
  list.splice(idx + 1, 0, item)
  persisted.cache.yixuanData = list
}

function deleteYixuan(idx) {
  const list = Array.isArray(persisted.cache.yixuanData) ? [...persisted.cache.yixuanData] : []
  if (idx < 0 || idx >= list.length) return
  list.splice(idx, 1)
  persisted.cache.yixuanData = list
}

const days = ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
const periods = Array.from({ length: 13 }, (_, i) => i + 1)

const activePlan = computed(() => {
  if (activePlanIdx.value === null) return null
  const p = schedule.schedulePlans?.[activePlanIdx.value]
  return p && typeof p === 'object' ? p : null
})

const activeRow = computed(() => {
  if (activePlanIdx.value === null) return null
  return schedule.scheduleTable.find((r) => r && r._idx === activePlanIdx.value) || null
})

function weekStateWeeks(weekState) {
  const s = typeof weekState === 'string' ? weekState : ''
  const out = []
  const max = Math.min(16, s.length - 1)
  for (let i = 1; i <= max; i++) {
    if (s[i] === '1') out.push(i)
  }
  return out
}

function weekStateLabel(weekState) {
  const weeks = weekStateWeeks(weekState)
  if (weeks.length === 0) return '周次未知'
  return `第 ${weeks.join('、')} 周`
}

function stringHash(input) {
  let h = 2166136261
  const s = String(input || '')
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i)
    h += (h << 1) + (h << 4) + (h << 7) + (h << 8) + (h << 24)
  }
  return Math.abs(h >>> 0)
}

function colorFromKey(key) {
  const hue = stringHash(key) % 360
  return {
    hue,
    bg: `hsla(${hue}, 90%, 60%, 0.16)`,
    border: `hsla(${hue}, 90%, 65%, 0.35)`,
    glow: `hsla(${hue}, 90%, 70%, 0.12)`,
  }
}

const flatLessons = computed(() => {
  const p = activePlan.value
  if (!p) return []
  const resultLesson = Array.isArray(p.resultLesson) ? p.resultLesson : []
  const yixuanLesson = includeYixuan.value && Array.isArray(p.yixuanLesson) ? p.yixuanLesson : []
  const out = []

  for (const g of yixuanLesson) {
    const lesson = Array.isArray(g?.lessons) ? g.lessons[0] : null
    if (!lesson) continue
    const arrangeInfo = Array.isArray(lesson.arrangeInfo) ? lesson.arrangeInfo : []
    out.push({
      key: [lesson.name, lesson.no, lesson.teachers, lesson.teachClassName].filter(Boolean).join('|'),
      name: lesson.name ? String(lesson.name) : '',
      no: lesson.no ? String(lesson.no) : '',
      teachers: lesson.teachers ? String(lesson.teachers) : '',
      teachClassName: lesson.teachClassName ? String(lesson.teachClassName) : '',
      source: '已选',
      arrangeInfo,
    })
  }

  for (const g of resultLesson) {
    const lesson = Array.isArray(g?.lessons) ? g.lessons[0] : null
    if (!lesson) continue
    const arrangeInfo = Array.isArray(lesson.arrangeInfo) ? lesson.arrangeInfo : []
    out.push({
      key: [lesson.name, lesson.no, lesson.teachers, lesson.teachClassName].filter(Boolean).join('|'),
      name: lesson.name ? String(lesson.name) : '',
      no: lesson.no ? String(lesson.no) : '',
      teachers: lesson.teachers ? String(lesson.teachers) : '',
      teachClassName: lesson.teachClassName ? String(lesson.teachClassName) : '',
      source: '方案',
      arrangeInfo,
    })
  }
  return out
})

const blocks = computed(() => {
  const res = []
  for (const lesson of flatLessons.value) {
    for (const a of lesson.arrangeInfo) {
      const weekDay = Number(a?.weekDay || 0)
      const startUnit = Number(a?.startUnit || 0)
      const endUnit = Number(a?.endUnit || 0)
      const weekState = a?.weekState
      if (weekDay < 1 || weekDay > 7) continue
      if (startUnit < 1 || endUnit < 1 || endUnit < startUnit) continue

      const c = colorFromKey(lesson.key)
      const duration = endUnit - startUnit + 1
      res.push({
        id: `${lesson.key}-${weekDay}-${startUnit}-${endUnit}-${String(weekState || '')}`,
        weekLabel: weekStateLabel(weekState),
        weeks: weekStateWeeks(weekState),
        day: weekDay,
        start: startUnit,
        end: endUnit,
        duration,
        dayLabel: days[weekDay - 1] || `周${weekDay}`,
        title: lesson.name || lesson.no || '课程',
        subtitle: [lesson.teachers, lesson.teachClassName].filter(Boolean).join(' · ') || lesson.no,
        rangeLabel: `第 ${startUnit}-${endUnit} 节`,
        source: lesson.source,
        teachers: lesson.teachers,
        teachClassName: lesson.teachClassName,
        no: lesson.no,
        color: c,
      })
    }
  }
  return res
})

const blocksByDay = computed(() => {
  const m = {}
  for (let i = 1; i <= 7; i++) m[i] = []
  for (const b of blocks.value) {
    m[b.day].push(b)
  }
  return m
})

const courseLegend = computed(() => {
  const unique = new Map()
  for (const l of flatLessons.value) {
    const label = [l.name, l.no].filter(Boolean).join(' · ')
    if (!label) continue
    if (!unique.has(l.key)) unique.set(l.key, { key: l.key, label })
  }
  return Array.from(unique.values()).slice(0, 40)
})

function blockStyle(b) {
  const rowH = 44
  const gap = 8
  const top = (b.start - 1) * (rowH + gap)
  const height = (b.end - b.start + 1) * rowH + (b.end - b.start) * gap
  return {
    top: `${top}px`,
    height: `${height}px`,
  }
}

function blockCardStyle(b) {
  const hue = typeof b?.color?.hue === 'number' ? b.color.hue : 210
  const border = b?.color?.border || 'rgba(15, 23, 42, 0.16)'
  const glow = b?.color?.glow || 'rgba(15, 23, 42, 0.14)'
  return {
    background: `linear-gradient(180deg, hsl(${hue}, 92%, 92%), hsl(${hue}, 92%, 86%))`,
    borderColor: border,
    boxShadow: `0 12px 30px ${glow}`,
  }
}

function openCourseDetail(b) {
  activeBlock.value = b
  courseDetailOpen.value = true
}

function ensureDefaultActivePlan() {
  if (activePlanIdx.value !== null) return
  const first = schedule.scheduleTable?.[0]
  if (first && typeof first._idx === 'number') activePlanIdx.value = first._idx
}

function selectPlan(row) {
  const idx = row?._idx
  if (typeof idx !== 'number') return
  activePlanIdx.value = idx
}

function openResultsModal() {
  resultsModalOpen.value = true
  ensureDefaultActivePlan()
}

function startSchedule() {
  schedulingStarted.value = true
  ws.sendWs(schedule.buildStartPayload())
}

watch(
  () => ws.processing,
  (v, ov) => {
    if (!schedulingStarted.value) return
    if (ov && !v) {
      schedulingStarted.value = false
      if (schedule.scheduleTable.length > 0) openResultsModal()
    }
  },
)

watch(
  () => resultsModalOpen.value,
  (v) => {
    if (v) ensureDefaultActivePlan()
    else {
      planQuery.value = ''
      courseDetailOpen.value = false
      activeBlock.value = null
    }
  },
)

watch(
  () => courseDetailOpen.value,
  (v) => {
    if (!v) activeBlock.value = null
  },
)

</script>
