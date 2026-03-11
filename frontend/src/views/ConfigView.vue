<template>
  <div class="space-y-5">
    <div class="flex flex-wrap items-start justify-between gap-3">
      <div>
        <div class="text-xl font-semibold tracking-wide">基础配置</div>
        <div class="mt-1 text-sm text-slate-600">安全提示：账号密码仅保存在本地浏览器</div>
      </div>
      <div class="flex items-center gap-2">
        <n-button secondary @click="store.resetForm()">重置</n-button>
      </div>
    </div>

    <n-card>
      <n-form :model="store.form" label-placement="top" size="large">
        <n-grid :cols="12" :x-gap="16" :y-gap="14">
          <n-form-item-gi :span="12" label="教务系统地址">
            <n-input v-model:value="store.form.url" placeholder="例如 https://xxx.edu.cn" />
          </n-form-item-gi>

          <n-form-item-gi :span="6" label="学号">
            <n-input v-model:value="store.form.username" placeholder="请输入学号" />
          </n-form-item-gi>

          <n-form-item-gi :span="6" label="密码">
            <n-input v-model:value="store.form.password" type="password" placeholder="请输入密码" show-password-on="click" />
          </n-form-item-gi>

          <n-form-item-gi :span="12" label="请求延迟（ms）">
            <div class="w-full flex flex-wrap items-center gap-4">
              <n-slider v-model:value="delayValue" :min="0" :max="2000" :step="100" class="flex-1" />
              <n-tag :bordered="false" type="info">{{ delayValue }}ms</n-tag>
            </div>
          </n-form-item-gi>
        </n-grid>
      </n-form>
    </n-card>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { NButton, NCard, NForm, NGrid, NFormItemGi, NInput, NSlider, NTag } from 'naive-ui'
import { usePersistedStore } from '@/stores/persisted'

const store = usePersistedStore()

const delayValue = computed({
  get: () => Number(store.form.delay || 0),
  set: (v) => {
    store.form.delay = Number(v)
  },
})
</script>
