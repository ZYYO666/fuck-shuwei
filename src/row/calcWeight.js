const { createEmptySchedule, mergeArrays } = require('../base/tool')
// 计算权重
module.exports = function calcWeight(
  solutions,
  allLessons,
  yixuanData,
  zaoba,
  zhouwu,
  zhouyi,
  zhoulio,
  zhouri,
) {

  const createEmptyFormat = () =>
    Array.from({ length: 16 }, () => Array(91).fill(0))

  const normalizeYixuanLessons = () => {
    if (!Array.isArray(yixuanData) || yixuanData.length === 0) return []
    return yixuanData.map((group) => {
      let merged = createEmptyFormat()
      const formats = Array.isArray(group.formatDatas) ? group.formatDatas : []
      for (const f of formats) {
        merged = mergeArrays(merged, f)
      }

      const lessons = Array.isArray(group.lessons) ? group.lessons : []
      const arrangeInfo = lessons.flatMap((l) =>
        Array.isArray(l?.arrangeInfo) ? l.arrangeInfo : [],
      )
      const teachers = Array.from(
        new Set(
          lessons
            .map((l) => l?.teachers)
            .filter(Boolean)
            .flatMap((t) => String(t).split(',')),
        ),
      )
        .map((t) => t.trim())
        .filter(Boolean)
        .join(',')

      const first = lessons[0] || {}

      return {
        type: 'yixuan',
        code: group.code,
        lessons: [
          {
            id: first.id,
            name: first.name,
            no: first.no,
            teachers: teachers || first.teachers,
            teachClassName: first.teachClassName,
            arrangeInfo,
          },
        ],
        formatDatas: [merged],
      }
    })
  }

  const yixuanLesson = normalizeYixuanLessons()

  const result = solutions.map((selected) => {
    let schedule = createEmptySchedule(yixuanData) // 初始化课表
    for (let i = 0; i < allLessons.length; i++) {
      const lessonFormat = allLessons[i].formatDatas[selected[i]] // 获取当前课程的排课格式

      schedule = mergeArrays(schedule, lessonFormat) // 合并到总课表
    }
    let zaobaCount = 0 // 早八
    let zhouwuCount = 0 // 周五
    let zhouyiCount = 0 // 周一
    let zhoulioCount = 0 // 周六
    let zhouriCount = 0 // 周日
    // 统计每天第一/二节课数量
    for (let w = 0; w < 16; w++) {
      for (let d = 0; d < 7; d++) {
        if (schedule[w][d * 13 + 0]) zaobaCount++
        if (schedule[w][d * 13 + 1]) zaobaCount++
      }
      // 统计周五（d=4）所有节课数量
      for (let s = 0; s < 13; s++) {
        if (schedule[w][4 * 13 + s]) zhouwuCount++
      }
      // 统计周一（d=0）所有节课数量
      for (let s = 0; s < 13; s++) {
        if (schedule[w][0 * 13 + s]) zhouyiCount++
      }
      // 统计周六（d=5）所有节课数量
      for (let s = 0; s < 13; s++) {
        if (schedule[w][5 * 13 + s]) zhoulioCount++
      }
      // 统计周日（d=6）所有节课数量
      for (let s = 0; s < 13; s++) {
        if (schedule[w][6 * 13 + s]) zhouriCount++
      }
    }
    // 综合权重
    let weight = 0
    // 按优先级依次叠加权重，优先级：zaoba > zhouwu > zhouyi > zhoulio > zhouri
    if (zaoba) {
      weight += zaobaCount * 20
    }
    if (zhouwu) {
      weight += zhouwuCount * 10
    }
    if (zhouyi) {
      weight += zhouyiCount * 10
    }
    if (zhoulio) {
      weight += zhoulioCount * 5
    }
    if (zhouri) {
      weight += zhouriCount
    }
    // 如果都没选，weight为0

    const resultLesson = allLessons.map((item, index) => ({
      ...item,
      type: 'result',
      lessons: [item.lessons[selected[index]]],
      formatDatas: [item.formatDatas[selected[index]]],
    }))
    return {
      resultLesson,
      yixuanLesson,
      detail: {
        weight,
        zaobaCount,
        zhouwuCount,
        zhouyiCount,
        zhoulioCount,
        zhouriCount,
      },
    }
  })
  result.sort((a, b) => a.detail.weight - b.detail.weight)

  return result
}
