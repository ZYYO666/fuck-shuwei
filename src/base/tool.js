
const { getInstance } = require('./request')
// 主要功能：提供课表相关的工具函数，包括数组合并、课表初始化、冲突检测、撤销操作、文件读取等
const fs = require('fs')

// 读取文件内容
function getFile(filePath) {
  try {
    return fs.readFileSync(filePath, 'utf8') // 以utf8编码读取文件
  } catch (err) {
    throw err // 读取失败抛出异常
  }
}

// 合并两个二维数组（课表），有课则为1
function mergeArrays(arr1, arr2) {
  if (arr1.length !== arr2.length || arr1[0]?.length !== arr2[0]?.length) {
    throw new Error('数组结构不相同')
  }
  return arr1.map(
    (row, i) => row.map((cell, j) => (cell || arr2[i][j] ? 1 : 0)), // 有课则为1
  )
}

// 创建空课表（16周*91节），如有已选课表则先填充
function createEmptySchedule(yixuanData) {
  const weeks = 16
  const slots = 91
  let schedule = []
  for (let w = 0; w < weeks; w++) {
    schedule.push(new Array(slots).fill(0)) // 每周91节初始化为0
  }
  // 如果启用已选课表，先填充
  if (yixuanData) {
    for (const item of yixuanData) {
      if (item.formatDatas) {
        for (const format of item.formatDatas) {
          schedule = mergeArrays(schedule, format) // 合并已选课表
        }
      }
    }
  }
  return schedule
}
// 检查当前排课方式是否与已有课表冲突
function isConflict(schedule, lessonFormat) {
  for (let w = 0; w < 16; w++) {
    for (let s = 0; s < 91; s++) {
      if (lessonFormat[w][s] && schedule[w][s]) {
        return true // 有冲突
      }
    }
  }
  return false // 无冲突
}

// 回溯撤销排课
function removeArrays(schedule, lessonFormat) {
  for (let w = 0; w < 16; w++) {
    for (let s = 0; s < 91; s++) {
      if (lessonFormat[w][s]) {
        schedule[w][s] = 0 // 撤销该节课
      }
    }
  }
  return schedule
  // 注意：不撤销yixuanData部分，因为它是初始已选
}
async function visit(href, cookie) {
  const axios = getInstance()
  try {
    const response = await axios.get(href, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
        Cookie: cookie,
      },
      validateStatus: (status) => true,
    })
    return response.data
  } catch (error) {
    throw error
  }
}

function zyyo_delay(zyyo_ms) {
  return new Promise((resolve) => setTimeout(resolve, zyyo_ms))
}

module.exports = {
  visit,
  zyyo_delay,
  mergeArrays, // 合并课表
  createEmptySchedule, // 创建空课表
  isConflict, // 检查冲突
  mergeArrays, // 合并课表（重复导出）
  removeArrays, // 撤销课表
  getFile, // 读取文件
}
