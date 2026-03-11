<template>
  <div class="h-full flex flex-col gap-5">
    <div class="flex flex-wrap items-end justify-between gap-3">
      <div>
        <div class="text-xl font-semibold tracking-wide">关于系统</div>
        <div class="mt-1 text-sm text-slate-600">一个面向树维教务系统的选课 / 排课 WebUI 客户端</div>
      </div>
      <div class="flex items-center gap-2">
        <n-tag :bordered="false" type="info">Node.js 16+</n-tag>
        <n-tag :bordered="false" type="success">WebUI</n-tag>
        <n-tag :bordered="false" type="warning">缓存驱动</n-tag>
      </div>
    </div>

    <n-scrollbar class="flex-1 min-h-0">
      <div class="pb-6 space-y-5">
        <n-card>
          <div class="space-y-4 text-sm text-slate-700">
            <div>
              <div class="text-slate-900 font-semibold">项目概览</div>
              <div class="mt-2 leading-relaxed">
                基于 Node.js 构建的智能选课系统解决方案，提供 WebUI 与高效缓存机制，支持多轮次选课操作，并内置排课算法帮助生成更舒服的课表。
              </div>
            </div>

            <div>
              <div class="text-slate-900 font-semibold">作者 Zyyo（需要吹一下）</div>
              <div class="mt-2 leading-relaxed">
                Zyyo 属于那种“想做就能落地”的硬核型开发者：从抓包逆向到算法抽象再到 WebUI，全链路一把梭，把复杂流程做成了能点就跑的工具。
                你现在看到的缓存机制、轮次复用、排课权重计算这些关键能力，都是他在持续迭代里一点点打磨出来的。
              </div>
              <div class="mt-2 flex flex-wrap items-center gap-3">
                <a class="text-sky-700 hover:underline" href="https://zyyo.net" target="_blank" rel="noreferrer">https://zyyo.net</a>
                <a
                  class="text-sky-700 hover:underline"
                  href="https://github.com/ZYYO666/fuck-shuwei"
                  target="_blank"
                  rel="noreferrer"
                >
                  GitHub：ZYYO666/fuck-shuwei
                </a>
              </div>
            </div>

            <div>
              <div class="text-slate-900 font-semibold">技术栈</div>
              <div class="mt-2 leading-relaxed">前端：Vite + Vue 3 + Tailwind CSS + Naive UI + Pinia + Vue Router</div>
              <div class="mt-1 leading-relaxed">后端：Node.js + Express + WebSocket</div>
            </div>

            <div>
              <div class="text-slate-900 font-semibold">通信协议</div>
              <div class="mt-2 leading-relaxed">后端静态服务 3000，WebSocket 8080。</div>
              <div class="mt-1 leading-relaxed">前端通过 WebSocket 触发流程并消费日志、表格与缓存消息。</div>
            </div>
          </div>
        </n-card>

        <n-card title="排课原理">
          <div class="space-y-3 text-sm text-slate-700">
            <div class="leading-relaxed">
              流程：先根据课程序号 / 课程代码查询开课课程 → 格式化数据 → 枚举无冲突排课方案 → 计算权重 → 输出最优课表。
            </div>
            <div class="leading-relaxed">
              核心抽象：把一门课程的所有时间点统一为 16×91 的二维数组（16 周 × 7 天 × 13 节），将“是否冲突”变成数组合并与检测问题。
              不管课程开课多复杂（单双周、多次开课等），最终都落在同一种数据结构上，便于快速判断与组合。
            </div>
          </div>
        </n-card>

        <n-card title="快速开始">
          <div class="space-y-3 text-sm text-slate-700">
            <div class="text-slate-900 font-semibold">环境要求</div>
            <div class="leading-relaxed">Node.js 16+，Chrome 100+</div>
            <div class="pt-2 text-slate-900 font-semibold">启动</div>
            <div class="leading-relaxed">1. 安装依赖：npm install</div>
            <div class="leading-relaxed">2. 启动服务：npm run start</div>
            <div class="leading-relaxed">3. 访问：http://localhost:3000</div>
            <div class="pt-2 text-slate-900 font-semibold">打包 exe</div>
            <div class="leading-relaxed">npm run build:win</div>
          </div>
        </n-card>

        <n-card title="重要提示">
          <n-alert type="warning" :bordered="false">
            以下情况建议清除浏览器缓存：切换账号、更换选课轮次、遇到登录异常。
          </n-alert>
          <div class="mt-3 text-sm text-slate-700 leading-relaxed">
            另外：main 分支可能处于开发中不可用状态，稳定版本请以 master 分支为准。
          </div>
        </n-card>

        <n-card title="声明与免责声明">
          <div class="space-y-3 text-sm text-slate-700 leading-relaxed">
            <div>项目唯一地址：<a class="text-sky-700 hover:underline" href="https://github.com/ZYYO666/fuck-shuwei" target="_blank" rel="noreferrer">https://github.com/ZYYO666/fuck-shuwei</a></div>
            <div>
              本项目仅用于学习研究与个人效率工具演示，请在合法合规、获得授权的前提下使用。任何因不当使用导致的账号风险、数据风险、纪律风险或其他后果由使用者自行承担。
            </div>
            <div>
              若你的教务系统存在验证码、风控或登录异常等情况，请勿强行尝试高频操作，优先选择官方渠道完成选课。
            </div>
          </div>
        </n-card>
      </div>
    </n-scrollbar>
  </div>
</template>

<script setup>
import { NAlert, NCard, NScrollbar, NTag } from 'naive-ui'
</script>
