const { getLessonJSONs, getLessonsFromCode, getLessonsFromNo } = require('../base/tool')
const getformatDatas = require('./getFormatDatas')
const rowLesson = require('./rowLesson')
const calcWeight = require('./calcWeight')
const base = require('../base/main')

const startScheduleProcess = async (config) => {

  try {
    config.logger.sendData('log', '获取课程数据')
    try {
      config.lessonJSONs = getLessonJSONs(config.lessonDatas)
    }
    catch {
      config = { ...config, ...await base.startBaseProcess(config) }
    }
    config.logger.sendData('step', 2)

    config.logger.sendData('log', '获取目标课程')

    let userLessons = getLessonsFromCode(config.lessonJSONs, config.lessonCodes)

    config.logger.sendData('step', 3)
    config.logger.sendData('log', '格式化课程时间数据')

    userLessons = getformatDatas(userLessons)

    config.logger.sendData('step', 4)

    config.logger.sendData('log', '获取已选课程')

    let yixuanData = getLessonsFromNo(config.lessonJSONs, config.yixuanData)

    config.logger.sendData('log', '格式化已选课程')

    yixuanData = getformatDatas(yixuanData)

    config.logger.sendData('step', 5)

    config.logger.sendData('log', '算法排课中')

    const resultList = rowLesson(userLessons, yixuanData)

    config.logger.sendData('step', 6)

    config.logger.sendData('log', '计算权重')

    const weighted = calcWeight(
      resultList,
      userLessons,
      yixuanData,
      config.zaoba,
      config.zhouwu,
      config.zhouyi,
      config.zhoulio,
      config.zhouri,
    )


    config.logger.sendData('table', weighted.slice(0, 1000))

    config.logger.sendData('log', ['可行排课方案数量:', weighted.length].join(' '))

  } catch (error) {
    config.logger.sendData('error', ['程序错误:', error.message].join(' '))

  }
}

module.exports = { startScheduleProcess }