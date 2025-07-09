// 主要功能：将课程的排课信息格式化为二维数组（16周*91节），用于后续排课冲突判断和合并
const { mergeArrays } = require('../base/tool')

// 格式化单个排课信息为二维数组
function processArrange(arrangeInfo) {
  const result = Array.from({ length: 16 }, () => Array(91).fill(0)) // 16周*91节初始化为0
  const { weekDay, weekState, startUnit, endUnit } = arrangeInfo
  const weekBits = weekState.slice(1, 17) // 取前16位，表示每周是否有课

  for (let week = 0; week < 16; week++) {
    if (weekBits[week] === '1') {
      const dayIndex = weekDay - 1 // 星期几
      for (let unit = startUnit; unit <= endUnit; unit++) {
        const unitIndex = unit - 1 // 第几节课
        const position = dayIndex * 13 + unitIndex // 计算在一周中的位置
        if (position < 91) {
          // 确保位置在数组范围内
          result[week][position] = 1 // 标记有课
        }
      }
    }
  }
  return result
}

module.exports = function getformatDatas(groupedLessons) {
  return groupedLessons.map((group) => ({
    ...group,
    formatDatas: group.lessons.map((lesson) => {
      // 合并一个代码下某一门课的多个时间节点为同一数组
      let mergedResult = Array.from({ length: 16 }, () => Array(91).fill(0))
      lesson.arrangeInfo.forEach((arrange) => {
        const singleArr = processArrange(arrange) // 单个排课信息转为二维数组
        mergedResult = mergeArrays(mergedResult, singleArr) // 合并到总数组
      })
      return mergedResult
    }),
  }))
}
