<template>
  <div class="space-y-5">
    <div class="flex flex-wrap items-start justify-between gap-3">
      <div>
        <div class="text-xl font-semibold tracking-wide">缓存配置</div>
        <div class="mt-1 text-sm text-slate-600">本地缓存提升体验，也便于排课复用</div>
      </div>
      <div class="flex items-center gap-2">
        <n-button secondary @click="store.clearCache()">清空缓存</n-button>
      </div>
    </div>

    <n-tabs type="segment" animated>
      <n-tab-pane name="cookie" tab="Cookie">
        <n-card>
          <div class="space-y-3">
            <n-input v-model:value="store.cache.cookie" type="textarea" :rows="4" placeholder="空表示下次会重新登录" />
            <div class="text-xs text-slate-500">仅保存在本地浏览器，不会上传</div>
          </div>
        </n-card>
      </n-tab-pane>

      <n-tab-pane name="profiles" tab="轮次">
        <n-card>
          <n-data-table :columns="profileCols" :data="store.cache.electionProfiles" :bordered="false" :single-line="false" />
        </n-card>
      </n-tab-pane>

      <n-tab-pane name="raw" tab="原始数据">
        <n-card>
          <n-input :value="rawCacheJson" type="textarea" :rows="18" readonly />
        </n-card>
      </n-tab-pane>
    </n-tabs>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { NButton, NCard, NDataTable, NInput, NTabPane, NTabs } from 'naive-ui'
import { usePersistedStore } from '@/stores/persisted'

const store = usePersistedStore()

const rawCacheJson = computed(() => {
  try {
    return JSON.stringify(store.cache || {}, null, 2)
  } catch {
    return ''
  }
})

const profileCols = [
  { title: 'title', key: 'title' },
  { title: 'id', key: 'id', width: 120 },
  { title: 'round', key: 'round', width: 90 },
  { title: 'openTime', key: 'openTime', width: 160 },
]

</script>
