// 主要功能：读取课程数据，生成所有可行的排课方案并按权重排序，输出前若干方案及其统计信息



const getLessonJSONs = require('./getLessonJSONs')
const getLessonsFromCode = require('./getLessonsFromCode')
const getformatDatas = require('./getFormatDatas')
const getLessonsFromNo = require('./getLessonsFromNo')
const rowLesson = require('./rowLesson')
const calcWeight = require('./calcWeight')

const base = require('../base/main')

const startScheduleProcess = async (config) => {

  try {
    config.logger.zyyo('获取课程数据')
    try {
      config.lessonJSONs = getLessonJSONs(config.lessonDatas)
    }
    catch {
      config = { ...config, ...await base.startBaseProcess(config) }
    }
    config.logger.zyyostep(2)

    config.logger.zyyo('获取目标课程')

    let userLessons = getLessonsFromCode(config.lessonJSONs, config.lessonCodes)

    config.logger.zyyostep(3)
    config.logger.zyyo('格式化课程时间数据')

    userLessons = getformatDatas(userLessons)

    config.logger.zyyostep(4)

    config.logger.zyyo('获取已选课程')

    let yixuanData = getLessonsFromNo(config.lessonJSONs, config.yixuanData)

    config.logger.zyyo('格式化已选课程')

    yixuanData = getformatDatas(yixuanData)

    config.logger.zyyostep(5)

    config.logger.zyyo('算法排课中')

    const resultList = rowLesson(userLessons, yixuanData)

    config.logger.zyyostep(6)

    config.logger.zyyo('计算权重')

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


    config.logger.zyyotable(weighted.slice(0, 1000))

    config.logger.zyyo('可行排课方案数量:', weighted.length)

  } catch (error) {
    config.logger.zyyoerror('程序错误:', error.message)

  }
}

module.exports = { startScheduleProcess }