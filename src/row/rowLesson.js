// 主要功能：递归枚举所有无冲突的排课方案，返回所有可行的选课组合
const {
  createEmptySchedule,
  isConflict,
  mergeArrays,
  removeArrays,
} = require('../base/tool')

module.exports = function fuckLesson(allLessons, yixuanData) {
  const resultList = [] // 存储所有可行方案
  let schedule = createEmptySchedule(yixuanData) // 初始化课表
  let selected = [] // 当前已选课程索引
  // 闭包递归函数
  function recurse(idx) {
    if (idx === allLessons.length) {
      resultList.push([...selected]) // 记录当前方案
      return
    }
    const lesson = allLessons[idx]
    for (let i = 0; i < lesson.formatDatas.length; i++) {
      const lessonFormat = lesson.formatDatas[i]
      if (!isConflict(schedule, lessonFormat)) {
        // 无冲突则选中
        schedule = mergeArrays(schedule, lessonFormat) // 合并课表
        selected.push(i) // 记录选择
        recurse(idx + 1) // 递归下一个课程
        selected.pop() // 回溯
        schedule = removeArrays(schedule, lessonFormat) // 撤销本次选择
      }
    }
  }

  recurse(0)

  return resultList // 返回所有可行方案
}
