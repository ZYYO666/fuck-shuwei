<template>
  <n-config-provider :theme-overrides="themeOverrides">
    <n-message-provider>
      <AppShell />
    </n-message-provider>
  </n-config-provider>
</template>

<script setup>
import { NConfigProvider, NMessageProvider } from 'naive-ui'
import AppShell from '@/layout/AppShell.vue'
import { bootstrapApp } from '@/app/bootstrap'
import { themeOverrides } from '@/shared/themeOverrides'

bootstrapApp()
</script>
