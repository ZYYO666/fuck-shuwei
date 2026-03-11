<template>
  <div class="h-screen overflow-hidden text-slate-950">
    <div class="h-full mx-auto max-w-[1680px] p-4">
      <n-layout has-sider class="h-full glass rounded-3xl overflow-hidden border border-black/10 shadow-xl shadow-black/10">
        <n-layout-sider bordered :width="280" class="glass">
          <div class="px-4 py-4">
            <div class="flex items-center justify-between gap-3">
              <div class="flex items-center gap-3">
                <div class="h-10 w-10 rounded-2xl bg-gradient-to-br from-violet-500 via-fuchsia-500 to-cyan-400 shadow-lg shadow-fuchsia-500/20" />
                <div class="leading-tight">
                  <div class="text-sm font-semibold tracking-wide">智能选课控制台</div>
                </div>
              </div>
              <div class="h-2 w-2 rounded-full" :class="wsDotClass" />
            </div>
          </div>

          <div class="px-2 pb-4">
            <n-menu
              :options="menuOptions"
              :value="activeKey"
              @update:value="handleMenu"
            />
          </div>
        </n-layout-sider>

        <n-layout has-sider>
          <n-layout-content class="glass h-full">
            <div class="h-full p-6 overflow-hidden">
              <div class="h-full">
                <router-view />
              </div>
            </div>
          </n-layout-content>

          <n-layout-sider :width="300" class="glass hidden lg:block">
            <ConsolePanel />
          </n-layout-sider>
        </n-layout>
      </n-layout>
    </div>
  </div>
</template>

<script setup>
import { computed, h } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { NLayout, NLayoutContent, NLayoutSider, NMenu } from 'naive-ui'
import ConsolePanel from './ConsolePanel.vue'
import { useWsStore } from '@/stores/ws'

const ws = useWsStore()
const router = useRouter()
const route = useRoute()

const activeKey = computed(() => {
  const name = route.name
  return typeof name === 'string' ? name : 'course'
})

const wsDotClass = computed(() => {
  if (ws.wsStatus === 'open') return 'bg-emerald-400'
  if (ws.wsStatus === 'connecting') return 'bg-amber-400'
  if (ws.wsStatus === 'error') return 'bg-rose-400'
  return 'bg-slate-400'
})

function IconGrid() {
  return h(
    'svg',
    { width: 18, height: 18, viewBox: '0 0 24 24', fill: 'none' },
    [
      h('path', { d: 'M4 4h7v7H4V4zm9 0h7v7h-7V4zM4 13h7v7H4v-7zm9 0h7v7h-7v-7z', fill: 'currentColor', opacity: '0.85' }),
    ],
  )
}

function IconWand() {
  return h(
    'svg',
    { width: 18, height: 18, viewBox: '0 0 24 24', fill: 'none' },
    [
      h('path', { d: 'M4 20l10.5-10.5 1.5 1.5L5.5 21.5 4 20z', fill: 'currentColor', opacity: '0.9' }),
      h('path', { d: 'M15.5 8.5l2-2 3 3-2 2-3-3z', fill: 'currentColor', opacity: '0.9' }),
    ],
  )
}

function IconCalendar() {
  return h(
    'svg',
    { width: 18, height: 18, viewBox: '0 0 24 24', fill: 'none' },
    [
      h('path', { d: 'M7 2v2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-2V2h-2v2H9V2H7zm12 8H5v10h14V10z', fill: 'currentColor', opacity: '0.9' }),
    ],
  )
}

function IconDatabase() {
  return h(
    'svg',
    { width: 18, height: 18, viewBox: '0 0 24 24', fill: 'none' },
    [
      h('path', { d: 'M12 2c-4.4 0-8 1.8-8 4v12c0 2.2 3.6 4 8 4s8-1.8 8-4V6c0-2.2-3.6-4-8-4zm0 2c3.9 0 6 .9 6 2s-2.1 2-6 2-6-.9-6-2 2.1-2 6-2zm0 16c-3.9 0-6-.9-6-2v-2c1.5 1 4 1.6 6 1.6s4.5-.6 6-1.6v2c0 1.1-2.1 2-6 2zm0-6c-3.9 0-6-.9-6-2V9.9c1.5 1 4 1.6 6 1.6s4.5-.6 6-1.6V12c0 1.1-2.1 2-6 2z', fill: 'currentColor', opacity: '0.9' }),
    ],
  )
}

function IconInfo() {
  return h(
    'svg',
    { width: 18, height: 18, viewBox: '0 0 24 24', fill: 'none' },
    [
      h('path', { d: 'M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z', fill: 'currentColor', opacity: '0.9' }),
    ],
  )
}

const menuOptions = computed(() => [
  { label: '基础配置', key: 'config', icon: IconGrid },
  { label: '智能选课', key: 'course', icon: IconWand },
  { label: '智能排课', key: 'schedule', icon: IconCalendar },
  { label: '缓存配置', key: 'cache', icon: IconDatabase },
  { label: '课程缓存', key: 'lessonCache', icon: IconDatabase },
  { label: '关于系统', key: 'about', icon: IconInfo },
])

function handleMenu(key) {
  const map = {
    config: '/config',
    course: '/course',
    schedule: '/schedule',
    cache: '/cache',
    lessonCache: '/lesson-cache',
    about: '/about',
  }
  router.push(map[key] || '/course')
}
</script>
