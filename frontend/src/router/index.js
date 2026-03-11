import { createRouter, createWebHashHistory } from 'vue-router'
import { aboutRoute } from './routes/about'
import { cacheRoute } from './routes/cache'
import { configRoute } from './routes/config'
import { courseRoute } from './routes/course'
import { lessonCacheRoute } from './routes/lessonCache'
import { scheduleRoute } from './routes/schedule'

const routes = [
  { path: '/', redirect: '/course' },
  configRoute,
  courseRoute,
  scheduleRoute,
  cacheRoute,
  lessonCacheRoute,
  aboutRoute,
]

export default createRouter({
  history: createWebHashHistory(),
  routes,
})
